const HEARTBEAT_PONG_TIMEOUT = 5 * 1000
const HEARTBEAT_PING_INTERVAL = 10 * 1000
const RECONNECT_INTERVAL = 5 * 1000
const MAX_RECONNECT_ATTEMPTS = 5

const PING_MESSAGE = JSON.stringify({
  signal: 0,
  option: 0,
  target: 0,
  payload: [],
  broadcast: null,
})

const PONG_MESSAGE = JSON.stringify({
  errorCode: 3,
  errorMessage: "",
  broadcast: null,
  data: null,
})

export default class WebSocketClient {
  private websocket!: WebSocket
  private url: string
  private reconnectAttempts: number = 0
  private heartbeatTimer: any
  private heartbeatReceived: boolean = true
  private messageQueue: string[] = []
  private isManualClose: boolean = false

  private onOpenCallback?: () => void
  private onCloseCallback?: () => void
  private onErrorCallback?: (event: Event) => void
  private onMessageCallback?: (
    message: string,
    originMessageEvent: MessageEvent,
  ) => void

  constructor(
    url: string,
    callback?: {
      onOpen?: () => void
      onClose?: () => void
      onError?: (event: Event) => void
      onMessage?: (message: string, originMessageEvent: MessageEvent) => void
    },
  ) {
    this.url = url
    const { onOpen, onClose, onError, onMessage } = callback || {}
    this.onOpenCallback = onOpen
    this.onCloseCallback = onClose
    this.onErrorCallback = onError
    this.onMessageCallback = onMessage
    this.connect()
  }

  private connect(): void {
    this.websocket = new WebSocket(this.url)

    this.websocket.onopen = () => {
      this.onOpen()
    }

    this.websocket.onclose = () => {
      this.onClose()
    }

    this.websocket.onerror = (error) => {
      this.onError(error)
    }

    this.websocket.onmessage = (messageEvent) => {
      this.onMessage(messageEvent)
    }
  }

  private onOpen(): void {
    // console.debug("WebSocket connected:", this.url)
    this.reconnectAttempts = 0
    this.startHeartbeat()
    this.processMessageQueue()
    this.onOpenCallback?.()
  }

  private onClose(): void {
    this.onCloseCallback?.()
    if (this.isManualClose) return
    if (this.reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      setTimeout(() => {
        // console.debug(
        //   "WebSocket reconnecting...,retry attempt:",
        //   this.reconnectAttempts,
        // )
        this.reconnectAttempts++
        this.connect()
      }, RECONNECT_INTERVAL)
    }
  }

  private onError(event: Event): void {
    // console.debug("WebSocket error:", event)
    this.onErrorCallback?.(event)
  }

  private onMessage(messageEvent: MessageEvent): void {
    // console.debug("WebSocket message received:", messageEvent.data)
    const messages = messageEvent.data
    if (typeof messages !== "string") {
      return
    }

    const messageList = messages.split("\n")
    messageList.forEach((message) => {
      if (message === PONG_MESSAGE) {
        // console.debug("Heartbeat received")
        this.heartbeatReceived = true
      } else {
        this.onMessageCallback?.(message, messageEvent)
      }
    })
  }

  private startHeartbeat(): void {
    setInterval(() => {
      if (this.websocket.readyState === WebSocket.OPEN) {
        this.sendMessage(PING_MESSAGE)
        this.heartbeatReceived = false

        if (this.heartbeatTimer) clearTimeout(this.heartbeatTimer)

        this.heartbeatTimer = setTimeout(() => {
          if (!this.heartbeatReceived) {
            // console.debug("Heartbeat failed, trying to reconnect...")
            this.websocket.close()
          }
        }, HEARTBEAT_PONG_TIMEOUT)
      }
    }, HEARTBEAT_PING_INTERVAL)
  }

  public sendMessage(message: string): void {
    if (this.websocket.readyState === WebSocket.OPEN) {
      // console.debug("WebSocket message sent:", message)
      this.websocket.send(message)
    } else {
      // console.debug("WebSocket message queued:", message)
      this.messageQueue.push(message)
    }
  }

  private processMessageQueue(): void {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()
      if (message) {
        this.sendMessage(message)
      }
    }
  }
  public close(): void {
    this.isManualClose = true
    this.websocket.close()
  }
}
