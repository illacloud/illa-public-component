export const getTutorialLink = (actionType: string) => {
  switch (actionType) {
    case "clickhouse":
    case "supabasedb":
    case "mysql":
    case "tidb":
    case "mariadb":
    case "postgresql":
    case "neon":
    case "hydra": {
      return "https://demo.arcade.software/mSVde0uaTX2ZuidxhKda?embed"
    }
    case "snowflake": {
      return "https://demo.arcade.software/t4QG7G0lJwftIvhOaUPX?embed"
    }
    case "mssql":
      return "https://demo.arcade.software/3g9NYKOa1EgOOROyPRUF?embed"
    case "oracle":
    case "oracle9i":
      return "https://demo.arcade.software/0Fyk4RHtL5W0v3C6iqRy?embed"
    case "restapi":
      return "https://demo.arcade.software/sFgFwMGSSDHMObcurbs7?embed"
    case "huggingface":
      return "https://demo.arcade.software/4VgHmA9Xq2gyJuX5dFRf?embed"
    case "hfendpoint":
      return "https://demo.arcade.software/fzeFktIZafdy5WTV0ISG?embed"
    case "redis":
    case "upstash":
      return "https://demo.arcade.software/tA3f36pyL6HrsNWMo9lK?embed"
    case "mongodb":
      return "https://demo.arcade.software/QnnCZxeGMRtQSR2OTdyw?embed"
    case "elasticsearch":
      return "https://demo.arcade.software/p0GTC5LAymEaLN2bhVhw?embed"
    case "dynamodb":
      return "https://demo.arcade.software/CuKFfv4M5WkUWOU08cYR?embed"
    case "s3":
      return "https://demo.arcade.software/DVtbNdIplpSsrJ1jzdnB?embed"
    case "smtp":
      return "https://demo.arcade.software/jYki97rrYf3Z5IEpQBER?embed"
    case "googlesheets":
      return "https://demo.arcade.software/2fx0YedXANOUTNvf3Huz?embed"
    case "firebase":
      return "https://demo.arcade.software/HgBD0GUI2HkZ4GZuqDhY?embed"
    case "graphql":
      return "https://demo.arcade.software/YFfYEUKYpSAEQAfZg5Zh?embed"
    case "appwrite":
      return "https://demo.arcade.software/8UBzQhNYOSwrJowM3YhB?embed"
    case "couchdb":
      return "https://demo.arcade.software/pt7zU5WxV5FP6aSHv50s?embed"
    case "airtable":
      return "https://demo.arcade.software/PPkVQ2ns4P87dZzsm2yo?embed"
    default: {
      return "https://docs.illacloud.com/"
    }
  }
}
