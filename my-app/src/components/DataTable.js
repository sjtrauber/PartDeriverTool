import React from 'react'

export default function DataTable(props) {
    let word = props.filters.filter1

    return (
        <div>
            <p>{word}</p>
        </div>
    )
}
