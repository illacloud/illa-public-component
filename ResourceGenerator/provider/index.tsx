import { Resource, ResourceType } from "@illa-public/public-types"
import { FC, ReactNode, createContext, useCallback, useMemo } from "react"

interface IInject {
  getResourceByType: (type: ResourceType) => Resource[]
  getResourceByID: (resourceID: string | undefined) => Resource | undefined
  createOrUpdateResourceCallback: (
    resource: Resource,
    isUpdate: boolean,
  ) => void
}

export const ResourceGeneratorContext = createContext<IInject>({} as IInject)

interface ResourceGeneratorProverProps {
  allResource: Resource[]
  createOrUpdateResourceCallback: (
    resource: Resource,
    isUpdate: boolean,
  ) => void
  children: ReactNode
}

export const ResourceGeneratorProvider: FC<ResourceGeneratorProverProps> = (
  props,
) => {
  const { children, allResource, createOrUpdateResourceCallback } = props

  const getResourceByType = useCallback(
    (resourceType: ResourceType) => {
      return allResource.filter((value) => {
        return value.resourceType === resourceType
      })
    },
    [allResource],
  )

  const getResourceByID = useCallback(
    (resourceID: string | undefined) => {
      if (!resourceID) return undefined
      return allResource.find((resource) => {
        return resource.resourceID === resourceID
      })
    },
    [allResource],
  )

  const injectValue = useMemo(() => {
    return {
      getResourceByType,
      getResourceByID,
      createOrUpdateResourceCallback,
    }
  }, [getResourceByID, getResourceByType, createOrUpdateResourceCallback])

  return (
    <ResourceGeneratorContext.Provider value={injectValue}>
      {children}
    </ResourceGeneratorContext.Provider>
  )
}

ResourceGeneratorProvider.displayName = "ResourceGeneratorProvider"
