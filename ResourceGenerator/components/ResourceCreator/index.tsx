import { ResourceType } from "@illa-public/public-types"
import { FC, Suspense, useCallback, useContext } from "react"
import { ResourceGeneratorContext } from "../../provider"
import { ResourceCreatePanel } from "../ResourceCreatePanel"
import { ResourceCreatorProps } from "./interface"

export const ResourceCreator: FC<ResourceCreatorProps> = (props) => {
  const { resourceType, resourceID, onBack } = props

  const { getResourceByID } = useContext(ResourceGeneratorContext)

  const resource = getResourceByID(resourceID)
  const finalResourceType = resource ? resource.resourceType : resourceType
  const handleBack = useCallback(() => onBack("select"), [onBack])

  return (
    <Suspense>
      <ResourceCreatePanel
        resourceID={resourceID}
        resourceType={finalResourceType as ResourceType}
        handleOnClickBack={handleBack}
      />
    </Suspense>
  )
}
