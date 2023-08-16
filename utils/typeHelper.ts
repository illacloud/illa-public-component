import { getEnvVar } from "./envVarHelper"

export const isCloudVersion = getEnvVar("ILLA_INSTANCE_ID") === "CLOUD"
