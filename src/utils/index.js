import { DateTime } from 'luxon'

import * as dom from './dom'

export function toDateString(luxonDate) {
  return luxonDate.toLocaleString(DateTime.DATE_FULL)
}

export function unifyArticle(serverModel) {
  serverModel.created = DateTime.fromISO(serverModel.created)
  serverModel.updated = DateTime.fromISO(serverModel.updated)
  return serverModel
}

export { dom }
