export interface IExpressionShape {
  value: string
  hasError: boolean
}

export interface ICodeMirrorOptions {
  expressions?: IExpressionShape[]
  completionOptions: { key: string; value: any }[]
}
