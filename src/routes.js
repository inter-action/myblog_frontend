import React from 'react'
import { BrowserRouter, HashRouter, Route } from 'react-router-dom'
import { Home, Articles, Article } from './pages'
import { Header, Footer } from '@/components'

const Router = () => (
  <HashRouter>
    <div id="page-root">
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/articles" component={Articles} />
      <Route path="/articles/:slug" component={Article} />
      <Footer />
    </div>
  </HashRouter>
)

export default Router
