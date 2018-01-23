import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

import headshot from './assets/headshot.png'
import brand from './assets/brand.png'

import './style.scss'

export class Header extends Component {
  render() {
    return (
      <div className="com-header">
        <div className="com-header__wrapper">
          <Link to="/" className="logo">
            <img src={headshot} />
            <img src={brand} />
          </Link>
          <div className="navi">
            <NavLink to="/" className="navi-item" exact={true}>
              首页
            </NavLink>
            <NavLink to="/articles" className="navi-item">
              文章列表
            </NavLink>
          </div>
        </div>
      </div>
    )
  }
}
