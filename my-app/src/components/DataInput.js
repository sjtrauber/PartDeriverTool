import React from 'react'

export default function DataInput(props) {
    let buttonStyle = {
        marginTop: 20,
        marginBottom: 20
    }
    return (
        <div className="overlay" >
            <div className="overlayContainer">
                <h4>Provide links to your data:</h4>
                <form className="DataInputForm" onSubmit={props.handleSubmit}>
                    <label htmlFor="dataset1Link">Normal Data</label>
                    <input
                        type="text"
                        placeholder="Link to dataset"
                        onChange={props.handleChange}
                        name="dataset1Link"
                        value={props.formData.dataset1Link}
                    />
                    <br />
                    <label htmlFor="dataset2Link">Long Data</label>
                    <input
                        type="text"
                        placeholder="Link to dataset"
                        onChange={props.handleChange}
                        name="dataset2Link"
                        value={props.formData.dataset2Link}
                    />
                    <br />
                    <button style={buttonStyle}>Begin</button>
                </form>
            </div>


        </div>

    )
}
