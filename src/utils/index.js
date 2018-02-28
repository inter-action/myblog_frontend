import { DateTime } from 'luxon'

import * as dom from './dom'
import request from './request'

export { dom, request }

export function toDateString(luxonDate) {
  return luxonDate.toFormat('DD, HH:mm')
}

export function unifyArticle(serverModel) {
  serverModel.created = DateTime.fromMillis(+serverModel.created)
  serverModel.updated = DateTime.fromMillis(+serverModel.updated)
  return serverModel
}

