// @flow
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import UnSplash from './containers/UnSplash'
import Camera from './components/Camera'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/unsplash" component={UnSplash} />
    <Route path="/camera" component={Camera} />
  </Route>
)
