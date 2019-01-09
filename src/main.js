import React from 'react'
import { Qr } from './qr'
import { Register } from './reg'
import { BrowserRouter as Router, Route } from 'react-router-dom'

export const Main = () => (
  <Router>
    <React.Fragment>
      <Route path="/" exact component={Qr} />
      <Route path="/reg" component={Register} />
    </React.Fragment>
  </Router>
)
