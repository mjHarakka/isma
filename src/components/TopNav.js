import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import ReactMap from '../ReactMap'

const TopNav = () => {
    return (
        <Router>
            <div class="ui inverted menu" >
                <a class="item">
                    <Link to="/">Home</Link>
                </a>
                <a class="item">
                    <Link to="/create">Create Issue</Link>
                </a>
            </div>
        </Router>
    )
}

const CreateIssue = () => {
    return (
        <div>
            Create Issue
        </div>
    )
}

export default TopNav