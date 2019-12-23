import React from 'react'

const Marker = ({ issue }) => {

    return (
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
    )
}

export default Marker