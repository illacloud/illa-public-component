import { Node } from "acorn"
import { ancestor } from "acorn-walk"
import {
  IdentifierNode,
  MemberExpressionNode,
  NodeList,
  RefactorIdentifierNode,
} from "./interface"
import {
  isArrayAccessorNode,
  isArrowFunctionExpression,
  isFunctionDeclaration,
  isFunctionExpression,
  isIdentifierNode,
  isMemberExpressionNode,
  isVariableDeclaration,
} from "./typeHelper"
import {
  constructFinalMemberExpIdentifier,
  getFunctionalParamNamesFromNode,
} from "./walkHelper"

export const ancestorWalk = (ast: Node): NodeList => {
  //List of all Identifier nodes with their property(if exists).
  const identifierList = new Array<RefactorIdentifierNode>()
  // List of all references found
  const references = new Set<string>()
  // List of variables declared within the script. All identifiers and member expressions derived from declared variables will be removed
  const variableDeclarations = new Set<string>()
  // List of functional params declared within the script. All identifiers and member expressions derived from functional params will be removed
  let functionalParams = new Set<string>()

  /*
   * We do an ancestor walk on the AST in order to extract all references. For example, for member expressions and identifiers, we need to know
   * what surrounds the identifier (its parent and ancestors), ancestor walk will give that information in the callback
   * doc: https://github.com/acornjs/acorn/tree/master/acorn-walk
   */
  ancestor(ast, {
    Identifier(node: Node, ancestors: Node[]) {
      /*
       * We are interested in identifiers. Due to the nature of AST, Identifier nodes can
       * also be nested inside MemberExpressions. For deeply nested object references, there
       * could be nesting of many MemberExpressions. To find the final reference, we will
       * try to find the top level MemberExpression that does not have a MemberExpression parent.
       * */
      let candidateTopLevelNode: IdentifierNode | MemberExpressionNode =
        node as IdentifierNode
      let depth = ancestors.length - 2 // start "depth" with first parent
      while (depth > 0) {
        const parent = ancestors[depth]
        if (
          isMemberExpressionNode(parent) &&
          /* Member expressions that are "computed" (with [ ] search)
             and the ones that have optional chaining ( a.b?.c )
             will be considered top level node.
             We will stop looking for further parents */
          /* "computed" exception - isArrayAccessorNode
             Member expressions that are array accessors with static index - [9]
             will not be considered top level.
             We will continue looking further. */
          (!parent.computed || isArrayAccessorNode(parent)) &&
          !parent.optional
        ) {
          candidateTopLevelNode = parent
          depth = depth - 1
        } else {
          // Top level found
          break
        }
      }
      //If parent is a Member expression then attach property to the Node.
      //else push Identifier Node.
      const parentNode = ancestors[ancestors.length - 2]
      if (isMemberExpressionNode(parentNode)) {
        identifierList.push({
          ...(node as IdentifierNode),
          property: parentNode.property as IdentifierNode,
        })
      } else identifierList.push(node as RefactorIdentifierNode)
      if (isIdentifierNode(candidateTopLevelNode)) {
        // If the node is an Identifier, just save that
        references.add(candidateTopLevelNode.name)
      } else {
        // For MemberExpression Nodes, we will construct a final reference string and then add
        // it to the references list
        const memberExpIdentifier = constructFinalMemberExpIdentifier(
          candidateTopLevelNode,
        )
        references.add(memberExpIdentifier)
      }
    },
    VariableDeclaration(node: Node) {
      if (isVariableDeclaration(node))
        node.declarations.forEach((declaration) => {
          variableDeclarations.add(declaration.id.name)
        })
    },
    FunctionDeclaration(node: Node) {
      // params in function declarations are also counted as references so we keep
      // track of them and remove them from the final list of references
      if (!isFunctionDeclaration(node)) return
      functionalParams = new Set([
        ...functionalParams,
        ...getFunctionalParamNamesFromNode(node),
      ])
    },
    FunctionExpression(node: Node) {
      // params in function expressions are also counted as references so we keep
      // track of them and remove them from the final list of references
      if (!isFunctionExpression(node)) return
      functionalParams = new Set([
        ...functionalParams,
        ...getFunctionalParamNamesFromNode(node),
      ])
    },
    ArrowFunctionExpression(node: Node) {
      // params in arrow function expressions are also counted as references so we keep
      // track of them and remove them from the final list of references
      if (!isArrowFunctionExpression(node)) return
      functionalParams = new Set([
        ...functionalParams,
        ...getFunctionalParamNamesFromNode(node),
      ])
    },
  })
  return {
    references,
    functionalParams,
    variableDeclarations,
    identifierList,
  }
}
