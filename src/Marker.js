import React from 'react'
import { Marker as ReactMarker } from 'react-map-gl'

const Marker = (props) => {
    const issue = props.issue
    return (
        <ReactMarker
            key={props.issue.service_request_id}
            latitude={issue.lat}
            longitude={issue.long}>

            {(issue.status_notes === "") ? (
                <button className="circular ui icon button red"
                    onClick={props.setMarker}
                >
                    <i className="user icon"></i>
                </button>
            ) : (
                    <button className="circular ui icon button green"
                        onClick={props.setMarker}
                    >
                        <i className="user icon"></i>
                    </button>

                )}

        </ReactMarker>
    )
}

export default Marker