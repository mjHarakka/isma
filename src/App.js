import React, { useState, useEffect } from 'react'
import ReactMapGL, { Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from 'axios'
import Marker from './Marker'

const TOKEN = 'pk.eyJ1IjoibWpoYXJha2thIiwiYSI6ImNqbjBkdDc2NTFrMDQzdnFsbG1weHU0NzMifQ.DA8foxpDUJyS9mAZ8mWXew';

const contentBlock = {
  maxWidth: 300,
}

const imgStyle = {
  maxWidth: 300
}

const App = () => {

  const [viewport, setViewPort] = useState({
    width: "100%",
    height: 900,
    latitude: 60.192059,
    longitude: 24.945831,
    zoom: 12
  })

  const [issues, setIssues] = useState([])
  const [selectedIssue, setSelectedIssue] = useState(null)

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedIssue(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(() => {
    axios.get(`https://asiointi.hel.fi/palautews/rest/v1/requests.json`)
      .then(res => {
        const data = res.data.filter(issue => ((issue.lat !== null || issue.long !== null) && issue.status === "open"))
        setIssues(data)
      })
  })

  const setMarker = (issue) => {
    setSelectedIssue(issue)
  }

  return (
    <div style={{ margin: '0 auto' }}>

      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v8"
        onViewportChange={viewport => { setViewPort(viewport) }}
      >
        {issues.map(issue => (
          <Marker
            key={issue.service_request_id}
            issue={issue}
            setMarker={setMarker.bind(this, issue)} />
        ))}

        {selectedIssue && (
          <Popup
            latitude={selectedIssue.lat}
            longitude={selectedIssue.long}
            onClose={() => {
              setSelectedIssue(null);
            }}
          >

            <div className="ui-cards" style={contentBlock}>
              <div className="image">
                <img src={selectedIssue.media_url} style={imgStyle} />
              </div>
              <div className="content">
                <div className="meta">
                  <span className="date">{selectedIssue.requested_datetime}</span>
                </div>
                <div className="description">{
                  selectedIssue.description}
                </div>
              </div>
            </div>
          </Popup>
        )}



      </ReactMapGL>
    </div>
  )
}

export default App