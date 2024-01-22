import { Node } from "acorn"
import { isFinite } from "lodash-es"
import { NodeTypes } from "./constants"
import {
  ArrowFunctionExpressionNode,
  AssignmentExpressionNode,
  AssignmentPatternNode,
  AwaitExpressionNode,
  BinaryExpressionNode,
  BlockStatementNode,
  CallExpressionNode,
  ConditionalExpressionNode,
  ExportDefaultDeclarationNode,
  ExpressionStatement,
  FunctionDeclarationNode,
  FunctionExpressionNode,
  IdentifierNode,
  LiteralNode,
  MemberExpressionNode,
  ObjectExpression,
  PropertyNode,
  ThisExpressionNode,
  VariableDeclarationNode,
  VariableDeclaratorNode,
} from "./interface"

/* We need these functions to typescript casts the nodes with the correct types */
export const isIdentifierNode = (node: Node): node is IdentifierNode => {
  return node.type === NodeTypes.Identifier
}

export const isMemberExpressionNode = (
  node: Node,
): node is MemberExpressionNode => {
  return node.type === NodeTypes.MemberExpression
}

export const isThisExpressionNode = (
  node: Node,
): node is ThisExpressionNode => {
  return node.type === NodeTypes.ThisExpression
}

export const isConditionalExpressionNode = (
  node: Node,
): node is ConditionalExpressionNode =>
  node.type === NodeTypes.ConditionalExpression

export const isAwaitExpressionNode = (
  node: Node,
): node is AwaitExpressionNode => node.type === NodeTypes.AwaitExpression

export const isBinaryExpressionNode = (
  node: Node,
): node is BinaryExpressionNode => {
  return node.type === NodeTypes.BinaryExpression
}

export const isVariableDeclaration = (
  node: Node,
): node is VariableDeclarationNode => {
  return node.type === NodeTypes.VariableDeclaration
}

export const isVariableDeclarator = (
  node: Node,
): node is VariableDeclaratorNode => {
  return node.type === NodeTypes.VariableDeclarator
}

export const isFunctionDeclaration = (
  node: Node,
): node is FunctionDeclarationNode => {
  return node.type === NodeTypes.FunctionDeclaration
}

export const isFunctionExpression = (
  node: Node,
): node is FunctionExpressionNode => {
  return node.type === NodeTypes.FunctionExpression
}
export const isArrowFunctionExpression = (
  node: Node,
): node is ArrowFunctionExpressionNode => {
  return node.type === NodeTypes.ArrowFunctionExpression
}

export const isAssignmentExpression = (
  node: Node,
): node is AssignmentExpressionNode => {
  return node.type === NodeTypes.AssignmentExpression
}

export const isObjectExpression = (node: Node): node is ObjectExpression => {
  return node.type === NodeTypes.ObjectExpression
}

export const isAssignmentPatternNode = (
  node: Node,
): node is AssignmentPatternNode => {
  return node.type === NodeTypes.AssignmentPattern
}

export const isLiteralNode = (node: Node): node is LiteralNode => {
  return node.type === NodeTypes.Literal
}

export const isPropertyNode = (node: Node): node is PropertyNode => {
  return node.type === NodeTypes.Property
}

export const isCallExpressionNode = (
  node: Node,
): node is CallExpressionNode => {
  return node.type === NodeTypes.CallExpression
}

export const isBlockStatementNode = (
  node: Node,
): node is BlockStatementNode => {
  return node.type === NodeTypes.BlockStatement
}

export const isExpressionStatementNode = (
  node: Node,
): node is ExpressionStatement => {
  return node.type === NodeTypes.ExpressionStatement
}

export const isExportDefaultDeclarationNode = (
  node: Node,
): node is ExportDefaultDeclarationNode => {
  return node.type === NodeTypes.ExportDefaultDeclaration
}

export const isPropertyAFunctionNode = (
  node: Node,
): node is ArrowFunctionExpressionNode | FunctionExpressionNode => {
  return (
    node.type === NodeTypes.ArrowFunctionExpression ||
    node.type === NodeTypes.FunctionExpression
  )
}

export const isArrayAccessorNode = (
  node: Node,
): node is MemberExpressionNode => {
  return (
    isMemberExpressionNode(node) &&
    node.computed &&
    isLiteralNode(node.property) &&
    isFinite(node.property.value)
  )
}
