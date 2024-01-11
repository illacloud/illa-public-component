import { isFinite, isString } from "lodash-es"
import {
  ArrowFunctionExpressionNode,
  FunctionDeclarationNode,
  FunctionExpressionNode,
  IdentifierNode,
  LiteralNode,
  MemberExpressionNode,
} from "./interface"
import {
  isAssignmentPatternNode,
  isIdentifierNode,
  isLiteralNode,
} from "./typeHelper"

export const getPropertyAccessor = (
  propertyNode: IdentifierNode | LiteralNode,
) => {
  if (isIdentifierNode(propertyNode)) {
    return `.${propertyNode.name}`
  } else if (isLiteralNode(propertyNode) && isString(propertyNode.value)) {
    // is string literal search a['b']
    return `.${propertyNode.value}`
  } else if (isLiteralNode(propertyNode) && isFinite(propertyNode.value)) {
    // is array index search - a[9]
    return `[${propertyNode.value}]`
  }
}

export const constructFinalMemberExpIdentifier = (
  node: MemberExpressionNode,
  child = "",
): string => {
  const propertyAccessor = getPropertyAccessor(node.property)
  if (isIdentifierNode(node.object)) {
    return `${node.object.name}${propertyAccessor}${child}`
  } else {
    const propertyAccessor = getPropertyAccessor(node.property)
    const nestedChild = `${propertyAccessor}${child}`
    return constructFinalMemberExpIdentifier(
      node.object as MemberExpressionNode,
      nestedChild,
    )
  }
}

export const getFunctionalParamNamesFromNode = (
  node:
    | FunctionDeclarationNode
    | FunctionExpressionNode
    | ArrowFunctionExpressionNode,
) => {
  return Array.from(getFunctionalParamsFromNode(node)).map(
    (functionalParam) => functionalParam.paramName,
  )
}

export interface functionParam {
  paramName: string
  defaultValue: unknown
}

export const getFunctionalParamsFromNode = (
  node:
    | FunctionDeclarationNode
    | FunctionExpressionNode
    | ArrowFunctionExpressionNode,
  needValue = false,
): Set<functionParam> => {
  const functionalParams = new Set<functionParam>()
  node.params.forEach((paramNode) => {
    if (isIdentifierNode(paramNode)) {
      functionalParams.add({
        paramName: paramNode.name,
        defaultValue: undefined,
      })
    } else if (isAssignmentPatternNode(paramNode)) {
      if (isIdentifierNode(paramNode.left)) {
        const paramName = paramNode.left.name
        if (!needValue) {
          functionalParams.add({ paramName, defaultValue: undefined })
        } else {
          // figure out how to get value of paramNode.right for each node type
          // currently we don't use params value, hence skipping it
          // functionalParams.add({
          //   defaultValue: paramNode.right.value,
          // });
        }
      }
    }
  })
  return functionalParams
}
