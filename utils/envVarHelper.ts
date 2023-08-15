export const getEnvVar = (name: keyof ImportMetaEnv): string => {
  if (import.meta && import.meta.env) {
    return import.meta.env[name]
  }
  return process.env[name] || ""
}
