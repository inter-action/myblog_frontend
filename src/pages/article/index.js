import React, { Component } from 'react'
import * as ReactMarkDown from 'react-markdown'
import * as hljs from 'highlight.js'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import 'highlight.js/styles/github.css'

import request from '@/utils/request'
import './style.scss'
import { unifyArticle, toDateString } from '@/utils'


@observer
export class Article extends Component {
  @observable article

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    let { match: { params: { slug } }, history} = this.props
    if (!slug) history.push('/404')
    else {
      request.get(`/api/articles/${slug}`).then(resp => {
        unifyArticle(resp.article)
        this.article = resp
      })
    }
  }

  componentDidMount() {
    Array.from(document.querySelectorAll('pre code')).map(block => {
      hljs.highlightBlock(block)
    })
  }

  render() {
    if (!this.article) return null

    let { article, content } = this.article
    return (
      <div className="page-article">
        <div className="main-content">
          <div className="article-header">
            <div className="article-title">{article.title}</div>
            <div className="article-updatetime">
              <i>updated at</i> {toDateString(article.updated)}
            </div>
          </div>
          <ReactMarkDown
            className="article-content"
            source={content}
            escapeHtml={false}
            transformImageUri={createTransformImageUri(article)}
            renderers={createRenders(article)}
          />
        </div>
      </div>
    )
  }
}

function reWriteImageLink(article, link) {
  if (link.startsWith('./')) {
    return `/images/${article.slug}/${link.substring(2)}`
  } else return link
}

function createTransformImageUri(article) {
  return link => {
    return reWriteImageLink(article, link)
  }
}

let createRenders = article => {
  return {
    image(img) {
      return <img {...img} src={reWriteImageLink(article, img.src)} />
    }
  }
}
