import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {inject, observer} from 'mobx-react'

import './styles.scss'

@inject(store => ({
  counter: store.counterStore.counter,
  increase: () => store.counterStore.increase(),
}))
@observer
export class Demo extends Component {
  render() {
    let {counter, increase} = this.props

    return (
      <div className="page-demo">
        Demo Page
        <div><span>{counter}</span><button type="button" onClick={increase}>+1</button></div>
        <Link  to="/menu" >Menu Page</Link>
      </div>
    );
  }
}
