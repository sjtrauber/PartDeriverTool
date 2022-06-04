import React from 'react'

export default function DataFilters(props) {
    let buttonStyle = {
        marginTop: 20,
        marginBottom: 20
    }
    return (
        <div>
            <form className="DataInputForm" onSubmit={props.handleSubmit}>
                <label htmlFor="filter1">Normal Data</label>
                <input
                    type="text"
                    placeholder="Link to dataset"
                    onChange={props.handleChange}
                    name="filter1"
                    value={props.formData.filter1}
                />
                <br />
                <label htmlFor="filter2">Long Data</label>
                <input
                    type="text"
                    placeholder="Link to dataset"
                    onChange={props.handleChange}
                    name="filter2"
                    value={props.formData.filter2}
                />
                <br />
                <button style={buttonStyle}>Begin</button>
            </form>
        </div>
    )
}
