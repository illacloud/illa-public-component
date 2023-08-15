export const getEnvVar = (name: string): string => {
  if (import.meta && import.meta.env) {
    return import.meta.env[name]
  }
  return process.env[name] || ""
}
