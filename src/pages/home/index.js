import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx';
import * as cls from 'classnames'
import { toDateString, request } from '@/utils'

import './styles.scss'

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
export class Home extends Component {
  @observable meta
  componentWillMount() {
    this.props.loadArticles()
    
    request.get("/api/meta").then(resp=>{
      this.meta = resp 
    })
  }

  render() {
    let {meta} = this
    if (!meta) return null

    let { articles } = this.props

    return (
      <div className="page-home">
        <div className="row">
          <div className="label-wrapper">
            <div className="label">关于我</div>
          </div>
          <div className="content">
            <p>
              {meta.me}
            </p>

            <p className="icons">
              <a href="https://github.com/inter-action" className="fa fa-github" aria-hidden="true"></a>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="label-wrapper">
            <Link to="/articles" className="label">
              文章
            </Link>
          </div>
          <div className="content articles">
            {articles.slice(0, 3).map((e, i) => {
              return (
                <ArticleItem key={i} title={e.title} time={toDateString(e.updated)} slug={e.slug} />
              )
            })}
          </div>
        </div>
        <div className="gallery">
          {
            meta.images.map((e, i)=>{
              return <img key={i} className={cls({'large': i == 0})} src={e} />
            })
          }
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
    )
  }
}

function ArticleItem({ title, time, slug }) {
  return (
    <Link to={`/articles/${slug}`} className="article-item">
      <div className="article-title">{title}</div>
      <div className="update-time">{time}</div>
    </Link>
  )
}
