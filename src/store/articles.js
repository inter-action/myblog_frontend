import { observable } from 'mobx'

import { unifyArticle } from '@/utils'
import request from '@/utils/request'

class ArticlesStore {
  @observable articles = []

  async load(force) {
    if (this.articles.length == 0 || force) {
      let resp = await request.get('/api/articles')
      this.articles = resp.map(unifyArticle)
      return this.articles
    }
  }
}

export const articlesStore = new ArticlesStore()
