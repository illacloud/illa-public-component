import { Node, Options, parse } from "acorn"
import { IdentifierInfo, NodeList } from "./interface"
import { sanitizeScript } from "./utils"
import { ancestorWalk } from "./walk"

type AstOptions = Omit<Options, "ecmaVersion">

export const getAST = (code: string, options?: AstOptions) =>
  parse(code, { ...options, ecmaVersion: 11 })

export const wrapCode = (code: string) => {
  return `
      (function() {
        return ${code}
      })
    `
}

export const extractIdentifierInfoFromCode = (code: string): IdentifierInfo => {
  let ast: Node = { end: 0, start: 0, type: "" }
  try {
    const sanitizedScript = sanitizeScript(code)
    /* wrapCode - Wrapping code in a function, since all code/script get wrapped with a function during evaluation.
       Some syntax won't be valid unless they're at the RHS of a statement.
       Since we're assigning all code/script to RHS during evaluation, we do the same here.
       So that during ast parse, those errors are neglected.
    */
    /* e.g. IIFE without braces
      function() { return 123; }() -> is invalid
      let result = function() { return 123; }() -> is valid
    */
    const wrappedCode = wrapCode(sanitizedScript)
    ast = getAST(wrappedCode)
    const { functionalParams, references, variableDeclarations }: NodeList =
      ancestorWalk(ast)
    const referencesArr = Array.from(references).filter((reference) => {
      return !(
        functionalParams.has(reference) || variableDeclarations.has(reference)
      )
    })
    return {
      references: referencesArr,
      functionalParams: Array.from(functionalParams),
      variables: Array.from(variableDeclarations),
    }
  } catch (e) {
    if (e instanceof SyntaxError) {
      // Syntax error. Ignore and return empty list
      return {
        references: [],
        functionalParams: [],
        variables: [],
      }
    }
    throw e
  }
}
