

import React, { Component } from 'react';

import './style.scss'

export class NotFound extends Component {
  render() {
    return (
      <div className="page-notfound">
        <div className="cover"><h1>Resource not found <small>Error 404</small></h1><p className="lead">The requested resource could not be found but may be available again in the future.</p></div>
      </div>
    )
  }
}
