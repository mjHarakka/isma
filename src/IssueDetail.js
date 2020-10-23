import React from 'react'

const contentBlock = {
    maxWidth: 600,
    marginTop: 40
}

const imgStyle = {
    maxWidth: 600 
}

const IssueDetail = (props) => {

    if (!props.selectedIssue) {
        return (
            <div>No issue selected</div>
        )
    } else {
    return (
        <div>
            <div className="ui-cards" style={contentBlock}>
                <div className="image" >
                    <img src={props.selectedIssue.media_url} style={imgStyle}/>
                </div>
                <div className="content">
                    <div className="meta">
                        <span className="date">{props.selectedIssue.requested_datetime}</span>
                    </div>
                    <div className="description" >{
                        props.selectedIssue.description}
                    </div>
                </div>
            </div>
        </div>
    )
                    }


}

export default IssueDetail