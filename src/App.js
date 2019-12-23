import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from 'axios'
import Info from './Info'

const TOKEN = 'pk.eyJ1IjoibWpoYXJha2thIiwiYSI6ImNqbjBkdDc2NTFrMDQzdnFsbG1weHU0NzMifQ.DA8foxpDUJyS9mAZ8mWXew';

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
    axios.get(`https://asiointi.hel.fi/palautews/rest/v1/requests.json`)
      .then(res => {
        const data = res.data.filter(issue => ((issue.lat !== null || issue.long !== null) && issue.status === "open"))
        setIssues(data)
      })
  })

  const handleMarkerClick = (e) => {
    return (
      e => {
        e.preventDefault()
        setSelectedIssue(issue)
      }
    )
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

          <Marker key={issue.service_request_id}
            latitude={issue.lat}
            longitude={issue.long}>




            {(issue.status_notes = "") ? (

              <button className="circular ui icon button red"

                onClick={e => {
                  e.preventDefault()
                  setSelectedIssue(issue)
                }}
              >



                <i className="user icon"></i>
              </button>

            ) : (

                <button className="circular ui icon button green"

                  onClick={e => {
                    e.preventDefault()
                    setSelectedIssue(issue)
                  }}
                >



                  <i className="user icon"></i>
                </button>

              )}




          </Marker>
        ))}

        {selectedIssue && (
          <Popup
            latitude={selectedIssue.lat}
            longitude={selectedIssue.long}

          >


            <div className="ui-card">
              <div class="image">
                <img src={selectedIssue.media_url} />
              </div>
              <div class="content">
                <p>{selectedIssue.description}</p>
              </div>
            </div>
          </Popup>
        )}



      </ReactMapGL>
    </div>
  )
}

export default App