import React, { useState, useEffect } from 'react'
import IssueDetail from './IssueDetail'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ReactMap from './ReactMap'
import TopNav from './components/TopNav'

const App = () => {
  return (
    <div>
      <TopNav />
      <ReactMap />
    </div>
  )
}

export default App
