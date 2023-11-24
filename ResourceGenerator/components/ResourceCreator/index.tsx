import { ResourceType } from "@illa-public/public-types"
import { FC, Suspense, useCallback } from "react"
import { useSelector } from "react-redux"
import { ResourceCreatePanel } from "../ResourceCreatePanel"
import { ResourceCreatorProps } from "./interface"

export const ResourceCreator: FC<ResourceCreatorProps> = (props) => {
  const { resourceType, resourceID, onBack, onFinished } = props

  const resource = useSelector((state) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  const finalResourceType = resource ? resource.resourceType : resourceType
  const handleBack = useCallback(() => onBack("select"), [onBack])

  const handleClickFinish = useCallback(
    (resourceID: string) => {
      onFinished(resourceID)
    },
    [onFinished],
  )

  return (
    <Suspense>
      <ResourceCreatePanel
        resourceID={resourceID}
        resourceType={finalResourceType as ResourceType}
        handleOnClickBack={handleBack}
        handleOnFinished={handleClickFinish}
      />
    </Suspense>
  )
}
