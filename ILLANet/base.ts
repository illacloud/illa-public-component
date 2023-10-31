import Axios from "axios"
import { HTTP_REQUEST_PUBLIC_BASE_URL } from "./constant"


const notNeedAuthAxios = Axios.create({
  baseURL: HTTP_REQUEST_PUBLIC_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Encoding": "gzip",
    "Content-Type": "application/json",
  },
})

const needAuthAxios = Axios.create({
  baseURL: HTTP_REQUEST_PUBLIC_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Encoding": "gzip",
    "Content-Type": "application/json",
  },
})

const actionRuntimeAxios = Axios.create({
  baseURL: HTTP_REQUEST_PUBLIC_BASE_URL,
  timeout: 600000,
  headers: {
    "Content-Encoding": "gzip",
    "Content-Type": "application/json",
  },
})

export { actionRuntimeAxios, notNeedAuthAxios, needAuthAxios }