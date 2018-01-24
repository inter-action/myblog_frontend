import React from 'react'
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom'
import { Home, Articles, Article, NotFound } from './pages'
import { Header, Footer } from '@/components'

const Router = () => (
  <HashRouter>
    <div id="page-root">
      <Switch>
        <Route exact path="/" component={embed(Home)} />
        <Route exact path="/articles" component={embed(Articles)} />
        <Route path="/articles/:slug" component={embed(Article)} />
        <Route component={NotFound}/>
      </Switch>
    </div>
  </HashRouter>
)

function embed(Page){
  return (args) => [
    <Header key={0} />,
    <Page {...args} key={1} />,
    <Footer key={2}/>,
  ]
}

export default Router
