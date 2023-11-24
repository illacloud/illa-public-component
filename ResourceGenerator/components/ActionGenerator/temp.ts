// const handleDirectCreateAction = useCallback(
//   async (
//     resourceID: string,
//     successCallback?: () => void,
//     loadingCallback?: (loading: boolean) => void,
//   ) => {
//     if (currentActionType === null) {
//       return
//     }
//     const displayName =
//       DisplayNameGenerator.generateDisplayName(currentActionType)
//     const initialContent = getInitialContent(currentActionType)
//     const data: Omit<ActionItem<ActionContent>, "actionID"> = {
//       actionType: currentActionType,
//       displayName,
//       resourceID,
//       content: initialContent,
//       isVirtualResource: false,
//       ...actionItemInitial,
//     }
//     data.config = {
//       public: false,
//       advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
//     }
//     if (isGuideMode) {
//       const createActionData: ActionItem<ActionContent> = {
//         ...data,
//         actionID: v4(),
//       }
//       dispatch(actionActions.addActionItemReducer(createActionData))
//       dispatch(configActions.changeSelectedAction(createActionData))
//       successCallback?.()
//       return
//     }
//     loadingCallback?.(true)
//     try {
//       const { data: responseData } = await fetchCreateAction(data)
//       message.success({
//         content: t("editor.action.action_list.message.success_created"),
//       })
//       dispatch(actionActions.addActionItemReducer(responseData))
//       dispatch(configActions.changeSelectedAction(responseData))
//       successCallback?.()
//     } catch (_e) {
//       message.error({
//         content: t("editor.action.action_list.message.failed"),
//       })
//       DisplayNameGenerator.removeDisplayName(displayName)
//     }
//     loadingCallback?.(false)
//   },
//   [currentActionType, dispatch, message, t, isGuideMode],
// )

// const handleCreateAgentAction = useCallback(
//   async (
//     item: Agent,
//     successCallback?: () => void,
//     loadingCallback?: (loading: boolean) => void,
//   ) => {
//     if (currentActionType !== "aiagent") return
//     const displayName =
//       DisplayNameGenerator.generateDisplayName(currentActionType)
//     const initalAgentContent = getInitialAgentContent(item)
//     const data: Omit<ActionItem<AiAgentActionContent>, "actionID"> = {
//       actionType: currentActionType,
//       displayName,
//       resourceID: item.aiAgentID,
//       content: {
//         ...initalAgentContent,
//         virtualResource: item,
//       },
//       isVirtualResource: true,
//       ...actionItemInitial,
//       config: {
//         public: false,
//         advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
//         icon: item.icon,
//       },
//     }
//     if (isGuideMode) {
//       const createActionData: ActionItem<ActionContent> = {
//         ...data,
//         actionID: v4(),
//       }
//       dispatch(actionActions.addActionItemReducer(createActionData))
//       dispatch(configActions.changeSelectedAction(createActionData))
//       successCallback?.()
//       return
//     }
//     loadingCallback?.(true)
//     try {
//       const { data: responseData } = await fetchCreateAction(data)
//       message.success({
//         content: t("editor.action.action_list.message.success_created"),
//       })
//       dispatch(actionActions.addActionItemReducer(responseData))
//       dispatch(configActions.changeSelectedAction(responseData))
//       successCallback?.()
//     } catch (_e) {
//       message.error({
//         content: t("editor.action.action_list.message.failed"),
//       })
//       DisplayNameGenerator.removeDisplayName(displayName)
//     }
//     loadingCallback?.(false)
//   },
//   [currentActionType, dispatch, isGuideMode, message, t],
// )
