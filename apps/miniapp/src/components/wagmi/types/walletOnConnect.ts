export type onConnect = {
  onConnect?: (connectorId: string) => void
  onConnected?: (connectorId: string) => void
  onConnectFail?: (connectorId: string, error: Error) => void
}
