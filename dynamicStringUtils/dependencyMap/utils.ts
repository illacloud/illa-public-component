import { toPath, union } from "lodash-es"
import toposort from "toposort"
import DependencyMap from "."
import { extractIdentifierInfoFromCode } from "../ast"
import { IMMEDIATE_PARENT_REGEX } from "../constants"
import { convertPathToString } from "../converter"

type SortDependencies =
  | {
      success: true
      sortedDependencies: string[]
    }
  | { success: false; cyclicNode: string; error: unknown }

export function sortDependencies(
  dependencyMap: DependencyMap,
): SortDependencies {
  const dependencyTree: Array<[string, string | undefined]> = []
  const dependencies = dependencyMap.rawDependencies
  for (const [node, deps] of dependencies.entries()) {
    if (deps.size) {
      deps.forEach((dep) => dependencyTree.push([node, dep]))
    } else {
      // Set no dependency
      dependencyTree.push([node, undefined])
    }
  }

  try {
    const sortedDependencies = toposort(dependencyTree)
      .reverse()
      .filter((edge) => !!edge)
    return { success: true, sortedDependencies }
  } catch (error) {
    // Cyclic dependency found. Extract node
    const cyclicNodes = (error as Error).message.match(
      new RegExp('Cyclic dependency, node was:"(.*)"'),
    )
    const node = cyclicNodes ? cyclicNodes[1] : ""
    return { success: false, cyclicNode: node, error }
  }
}

const makeParentsDependOnChild = (
  dependencyMap: DependencyMap,
  child: string,
) => {
  let curKey = child
  let matches: string[] | null

  while ((matches = curKey.match(IMMEDIATE_PARENT_REGEX)) !== null) {
    const immediateParent = matches[1]
    const existingImmediateParentDeps =
      dependencyMap.getDirectDependencies(immediateParent) || []
    const newDeps = union(existingImmediateParentDeps, [curKey])

    dependencyMap.addDependency(immediateParent, newDeps)
    curKey = immediateParent
  }
}

export function makeParentsDependOnChildren(dependencyMap: DependencyMap) {
  const dependencies = dependencyMap.rawDependencies
  for (const [node, deps] of dependencies.entries()) {
    makeParentsDependOnChild(dependencyMap, node)
    deps.forEach((dep) => {
      makeParentsDependOnChild(dependencyMap, dep)
    })
  }
  return dependencyMap
}

/** This function extracts validReferences and invalidReferences from a binding {{}}
 * @param script
 * @param allPaths
 * @returns validReferences - Valid references from bindings
 * invalidReferences- References which are currently invalid
 * @example - For binding {{unknownEntity.name + Api1.name}}, it returns
 * {
 * validReferences:[Api1.name],
 * invalidReferences: [unknownEntity.name]
 * }
 */
export const extractInfoFromBinding = (
  script: string,
  allKeys: Record<string, true>,
) => {
  const { references } = extractIdentifierInfoFromCode(script)
  return getPrunedReferences(references, allKeys)
}

export const getPrunedReferences = (
  references: string[],
  allKeys: Record<string, true>,
) => {
  const prunedReferences: Set<string> = new Set<string>()

  references.forEach((reference: string) => {
    // If the identifier exists directly, add it and return
    if (allKeys.hasOwnProperty(reference)) {
      prunedReferences.add(reference)
      return
    }
    const subpaths = toPath(reference)
    let current = ""
    // We want to keep going till we reach top level, but not add top level
    // Eg: Input1.text should not depend on entire Table1 unless it explicitly asked for that.
    // This is mainly to avoid a lot of unnecessary evals, if we feel this is wrong
    // we can remove the length requirement, and it will still work
    while (subpaths.length > 1) {
      current = convertPathToString(subpaths)
      // We've found the dep, add it and return
      if (allKeys.hasOwnProperty(current)) {
        prunedReferences.add(current)
        return
      }
      subpaths.pop()
    }
    // If no valid reference is derived, add reference as is
    prunedReferences.add(reference)
  })
  return Array.from(prunedReferences)
}

interface EvalError {
  message: string
  context: {
    script: string
  }
}

interface BindingsInfo {
  references: string[]
  errors: EvalError[]
}
export const extractInfoFromBindings = (
  bindings: string[],
  allKeys: Record<string, true>,
) => {
  return bindings.reduce(
    (bindingsInfo: BindingsInfo, binding) => {
      try {
        const references = extractInfoFromBinding(binding, allKeys)
        return {
          ...bindingsInfo,
          references: union(bindingsInfo.references, references),
        }
      } catch (error) {
        const newEvalError: EvalError = {
          message: (error as Error).message,
          context: {
            script: binding,
          },
        }
        return {
          ...bindingsInfo,
          errors: union(bindingsInfo.errors, [newEvalError]),
        }
      }
    },
    { references: [], errors: [] },
  )
}
