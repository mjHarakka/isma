import React, { useState, useEffect } from 'react'
import ReactMapGL, { Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from 'axios'
import Marker from './Marker'
import IssueDetail from './IssueDetail'

const TOKEN =
  'pk.eyJ1IjoibWpoYXJha2thIiwiYSI6ImNqbjBkdDc2NTFrMDQzdnFsbG1weHU0NzMifQ.DA8foxpDUJyS9mAZ8mWXew'

const ReactMap = () => {
  const [viewport, setViewPort] = useState({
    width: '100%',
    height: 1100,
    latitude: 60.192059,
    longitude: 24.945831,
    zoom: 12,
  })

  const [issues, setIssues] = useState([])
  const [selectedIssue, setSelectedIssue] = useState(null)

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedIssue(null)
      }
    }
    window.addEventListener('keydown', listener)

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [])

  useEffect(() => {
    axios
      .get(`https://asiointi.hel.fi/palautews/rest/v1/requests.json`)
      .then((res) => {
        const data = res.data.filter(
          (issue) =>
            (issue.lat !== null || issue.long !== null) &&
            issue.status === 'open'
        )
        setIssues(data)
      })
  })

  const setMarker = (issue) => {
    setSelectedIssue(issue)
  }

  return (
    <div className="ui grid">
      <div className="sixteen wide column" style={{padding: '0px'}}>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v8"
          onViewportChange={(viewport) => {
            setViewPort(viewport)
          }}
        >
          {issues.map((issue) => (
            <Marker
              key={issue.service_request_id}
              issue={issue}
              setMarker={setMarker.bind(this, issue)}
            />
          ))}
          {(selectedIssue !== null) && setMarker && <Popup
          anchor="top"
          latitude={selectedIssue.lat}
          longitude={selectedIssue.long}
          onClose={setMarker}
          closeOnClick={false}
          anchor="top" >
          <div>You are here</div>
        </Popup>}
        </ReactMapGL>
      </div>
    </div>
  )
}

export default ReactMap
