import React, { useState, useEffect } from 'react'
import ReactMap from './ReactMap'
import IssueDetail from './IssueDetail'

const App = () => {
  return (
    <div className="ui container grid">
      <div className="ui row">
        <div className="column eight wide">
          <ReactMap />
        </div>
        <div className="column eight wide">
          <IssueDetail />
        </div>
      </div>
    </div>
  )
}

export default App