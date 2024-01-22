import { Node } from "acorn"
import { NodeTypes } from "./constants"

export interface IdentifierInfo {
  references: string[]
  functionalParams: string[]
  variables: string[]
}

export interface NodeList {
  references: Set<string>
  functionalParams: Set<string>
  variableDeclarations: Set<string>
  identifierList: Array<IdentifierNode>
}

export type Expression = Node

export type Pattern = IdentifierNode | AssignmentPatternNode

export type ArgumentTypes =
  | LiteralNode
  | ArrowFunctionExpressionNode
  | ObjectExpression
  | MemberExpressionNode
  | CallExpressionNode
  | BinaryExpressionNode
  | BlockStatementNode
  | IdentifierNode

export interface Function extends Node {
  id: IdentifierNode | null
  params: Pattern[]
}

export interface IdentifierNode extends Node {
  type: NodeTypes.Identifier
  name: string
}

export interface RefactorIdentifierNode extends Node {
  type: NodeTypes.Identifier
  name: string
  property?: IdentifierNode
}

export interface CallExpressionNode extends Node {
  type: NodeTypes.CallExpression
  callee: CallExpressionNode | IdentifierNode | MemberExpressionNode
  arguments: ArgumentTypes[]
}

export interface MemberExpressionNode extends Node {
  type: NodeTypes.MemberExpression
  object: MemberExpressionNode | IdentifierNode | CallExpressionNode
  property: IdentifierNode | LiteralNode
  computed: boolean
  // doc: https://github.com/estree/estree/blob/master/es2020.md#chainexpression
  optional?: boolean
}

export interface LiteralNode extends Node {
  type: NodeTypes.Literal
  value: string | boolean | null | number | RegExp
  raw: string
}

export interface ArrowFunctionExpressionNode extends Expression, Function {
  type: NodeTypes.ArrowFunctionExpression
  async: boolean
}

export interface PropertyNode extends Node {
  type: NodeTypes.Property
  key: LiteralNode | IdentifierNode
  value: Node
  kind: "init" | "get" | "set"
}

export interface ObjectExpression extends Expression {
  type: NodeTypes.ObjectExpression
  properties: Array<PropertyNode>
}

export interface BinaryExpressionNode extends Node {
  type: NodeTypes.BinaryExpression
  left: BinaryExpressionNode | IdentifierNode
  right: BinaryExpressionNode | IdentifierNode
}

export interface BlockStatementNode extends Node {
  type: "BlockStatement"
  body: [Node]
}

export interface ThisExpressionNode extends Expression {
  type: "ThisExpression"
}

export interface ConditionalExpressionNode extends Expression {
  type: "ConditionalExpression"
  test: Expression
  alternate: Expression
  consequent: Expression
}

// https://github.com/estree/estree/blob/master/es2017.md#awaitexpression
export interface AwaitExpressionNode extends Expression {
  type: "AwaitExpression"
  argument: Expression
}

export interface VariableDeclarationNode extends Node {
  type: NodeTypes.VariableDeclaration
  declarations: VariableDeclaratorNode[]
}

export interface VariableDeclaratorNode extends Node {
  type: NodeTypes.VariableDeclarator
  id: IdentifierNode
  init: Expression | null
}

export interface FunctionDeclarationNode extends Node, Function {
  type: NodeTypes.FunctionDeclaration
}

export interface FunctionExpressionNode extends Expression, Function {
  type: NodeTypes.FunctionExpression
  async: boolean
}

export interface AssignmentExpressionNode extends Node {
  operator: string
  left: Expression
  Right: Expression
}

export interface AssignmentPatternNode extends Node {
  type: NodeTypes.AssignmentPattern
  left: Pattern
}

export interface ExpressionStatement extends Node {
  type: "ExpressionStatement"
  expression: Expression
}

export interface ExportDefaultDeclarationNode extends Node {
  declaration: Node
}
