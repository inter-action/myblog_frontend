import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import './style.scss'
import { toDateString } from '@/utils'

@inject(store => {
  let articlesStore = store.articlesStore
  return {
    loadArticles() {
      return articlesStore.load()
    },
    articles: articlesStore.articles
  }
})
@observer
export class Articles extends Component {
  render() {
    let { articles } = this.props

    return (
      <div className="page-articles">
        <div className="articles-list-wrapper">
          <div className="bar" />
          {articles.map((e, i) => {
            return <Item key={i} time={toDateString(e.updated)} title={e.title} slug={e.slug} />
          })}
        </div>
      </div>
    )
  }
}

function Item({ time, title, slug }) {
  return (
    <Link to={`/articles/${slug}`} className="row">
      <div className="time">{time}</div>
      <div className="name">{title}</div>
    </Link>
  )
}
