import { DateTime } from 'luxon'

import * as dom from './dom'
import request from './request'

export { dom, request }

export function toDateString(luxonDate) {
  return luxonDate.toLocaleString(DateTime.DATE_FULL)
}

export function unifyArticle(serverModel) {
  serverModel.created = DateTime.fromISO(serverModel.created)
  serverModel.updated = DateTime.fromISO(serverModel.updated)
  return serverModel
}

