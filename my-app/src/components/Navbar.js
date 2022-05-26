import React from 'react'

export default function Navbar() {

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container">
                <div className="site-title">
                    <a className="navbar-brand" href="/"><h1>Final Project</h1></a>
                    <p id="navSubtitle">Bar Charts Galore</p>
                </div>
                <a href="/sarah">Do Data Analysis</a>
            </div>
        </nav>
    )
}
