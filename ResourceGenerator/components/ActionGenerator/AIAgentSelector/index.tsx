import { MARKET_AGENT_SORTED_OPTIONS } from "@illa-public/market-agent"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { Agent } from "@illa-public/public-types"
import { debounce } from "lodash-es"
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import { RadioGroup, Search } from "@illa-design/react"
import AgentTypeSelect from "./components/AgentTypeSelect"
import { MarketAgentList } from "./components/MarketList"
import { TeamAgentList } from "./components/TeamAgentList"
import { ActionResourceSelectorProps } from "./interface"
import {
  bodyContainerStyle,
  containerStyle,
  headerContainerStyle,
} from "./style"

export const AIAgentSelector: FC<ActionResourceSelectorProps> = (props) => {
  const { actionType, onCreateAction, handleCreateAction } = props

  const { t } = useTranslation()
  const [agentType, setAgentType] = useState("team")
  const [loading, setLoading] = useState(false)
  const [searchKeywords, setSearchKeywords] = useState("")
  const [sortedBy, setSortedBy] = useState<MARKET_AGENT_SORTED_OPTIONS>(
    MARKET_AGENT_SORTED_OPTIONS.POPULAR,
  )

  const { track } = useContext(MixpanelTrackContext)

  const sortOptions = [
    {
      label: t("dashboard.sort-type.popular"),
      value: MARKET_AGENT_SORTED_OPTIONS.POPULAR,
    },
    {
      label: t("dashboard.sort-type.recent"),
      value: MARKET_AGENT_SORTED_OPTIONS.LATEST,
    },
    {
      label: t("dashboard.sort-type.star"),
      value: MARKET_AGENT_SORTED_OPTIONS.STARRED,
    },
  ]

  const debounceSearchKeywords = useRef(
    debounce(
      (v: string) => {
        setSearchKeywords(v)
      },
      160,
      { leading: false },
    ),
  )

  const agentOptions = useMemo(() => {
    return [
      {
        label: t("dashboard.list-type.team"),
        value: "team",
      },
      {
        label: t("dashboard.list-type.marketplace"),
        value: "community",
      },
    ]
  }, [t])

  const handleClickCreateAction = useCallback(
    (agentItem: Agent) => {
      if (loading) return
      handleCreateAction(agentItem, () => onCreateAction?.(), setLoading)
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        {
          element: "resource_list_create_action",
          parameter1: actionType,
        },
        "both",
      )
    },
    [loading, handleCreateAction, track, actionType, onCreateAction],
  )

  useEffect(() => {
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      {
        element: "resource_list_show",
        parameter1: actionType,
      },
      "both",
    )
  }, [actionType, track])

  return (
    <div css={containerStyle}>
      <div css={bodyContainerStyle}>
        <Search
          w="100%"
          pd="0px 24px"
          colorScheme="techPurple"
          onChange={debounceSearchKeywords.current}
          placeholder={t("dashboard.search")}
          allowClear
        />
        <div css={headerContainerStyle}>
          <RadioGroup
            type="button"
            w="287px"
            options={agentOptions}
            value={agentType}
            forceEqualWidth={true}
            colorScheme="grayBlue"
            onChange={setAgentType}
          />
          {agentType === "community" && (
            <AgentTypeSelect
              value={sortedBy}
              options={sortOptions}
              onChange={(value) => {
                setSortedBy(value as MARKET_AGENT_SORTED_OPTIONS)
              }}
            />
          )}
        </div>
        {agentType === "team" && (
          <TeamAgentList
            onSelect={handleClickCreateAction}
            search={searchKeywords}
            key={searchKeywords}
          />
        )}
        {agentType === "community" && (
          <MarketAgentList
            onSelect={handleClickCreateAction}
            search={searchKeywords}
            key={`${searchKeywords}-${sortedBy}`}
            sortBy={sortedBy}
          />
        )}
      </div>
    </div>
  )
}

AIAgentSelector.displayName = "AIAgentSelector"
