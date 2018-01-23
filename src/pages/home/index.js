import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { toDateString } from '@/utils'

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
  componentWillMount() {
    this.props.loadArticles()
  }

  /*
  [
  {
    "title": "you dont know js",
    "created": "2018-01-17T14:20:06Z",
    "updated": "2018-01-18T21:01:37+08:00",
    "tags": null,
    "slug": "you-dont-know-js"
  }
]
  */
  render() {
    let { articles } = this.props
    return (
      <div className="page-home">
        <div className="row">
          <div className="label-wrapper">
            <div className="label">关于我</div>
          </div>
          <div className="content">
            Hella narwhal Cosby sweater McSweeney's, salvia kitsch before they sold out High Life.
            Umami tattooed sriracha meggings pickled Marfa Blue Bottle High Life next level four
            loko PBR. Keytar pickled next level keffiyeh drinking vinegar street art. Art party
            vinyl Austin, retro whatever keytar mixtape.
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
          <img className="large" src="http://via.placeholder.com/255x255" />
          <img src="http://via.placeholder.com/125x125" alt="" />
          <img src="http://via.placeholder.com/125x125" alt="" />
          <img src="http://via.placeholder.com/125x125" alt="" />
          <img src="http://via.placeholder.com/125x125" alt="" />
          <img src="http://via.placeholder.com/125x125" alt="" />
          <img src="http://via.placeholder.com/125x125" alt="" />
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
