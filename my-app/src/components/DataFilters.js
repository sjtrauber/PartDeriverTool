import React, {useEffect} from 'react'
import * as d3 from "d3";

export default function DataFilters(props) {

    let {dataLink, propsFilters, formData} = props;
    let {proteinId, color, pathway, ecNum, filterDefinition, gotermID, kogId, kogClass, iprId, filterFunction} = propsFilters;
    let listOfColors;
    let listOfPathways;
    let pathwayCheckboxElements;
    let colorCheckboxElements;

    let alreadyLoaded = false;
    useEffect(() => {
        if (alreadyLoaded) {return;}

        d3.csv(dataLink).then(async function(data) {

            let filteredData = data
            if (proteinId && proteinId.length > 0) {
                filteredData = filteredData.filter(function(d) {
                    for (let pathOpt of proteinId) {
                        if (d["proteinId"] == pathOpt) {
                            return d;
                        }
                    }
                })
            }
            if (color && color.length > 0) {
                filteredData = filteredData.filter(function(d) {
                    for (let pathOpt of color) {
                        if (d["dsmoduleColors"] == pathOpt) {
                            return d;
                        }
                    }
                })
            }
            if (pathway && pathway.length > 0) {
                filteredData = filteredData.filter(function(d) {
                    for (let pathOpt of pathway) {
                        if (d["pathway"] == pathOpt) {
                            return d;
                        }
                    }
                })
            }
            if (ecNum) {
                filteredData = filteredData.filter(d => {
                    if (d["ecNum"] !== 'NA') {
                        return d;
                    }
                })
            }
            if (filterDefinition) {
                filteredData = filteredData.filter(d => {
                    if (d["definition"] !== 'NA') {
                        return d;
                    }
                })
            }
            if (gotermID) {
                filteredData = filteredData.filter(d => {
                    if (d["gottermID"] !== 'NA') {
                        return d;
                    }
                })
            }
            if (kogId) {
                filteredData = filteredData.filter(d => {
                    if (d["kogId"] !== 'NA') {
                        return d;
                    }
                })
            }
            if (kogClass) {
                filteredData = filteredData.filter(d => {
                    if (d["kogClass"] !== 'NA') {
                        return d;
                    }
                })
            }
            if (iprId) {
                filteredData = filteredData.filter(d => {
                    if (d["iprId"] !== 'NA') {
                        return d;
                    }
                })
            }
            if (filterFunction) {
                filteredData = filteredData.filter(d => {
                    if (d["filterFunction"] !== 'NA') {
                        return d;
                    }
                })
            }

            data = filteredData

            listOfColors = Array.from(new Set (data.map(d => d.dsmoduleColors)))
            listOfPathways = Array.from(new Set (data.map(d => d.pathway)))

            pathwayCheckboxElements = listOfPathways.map(d => {
                return (
                    <div>
                        <input
                            type="checkbox"
                            onChange={props.handleChange}
                            name="pathwayCheckbox"
                            id={"check" + d}
                            value={d} />
                        <label htmlFor={"check" + d}>d</label>
                        <br />
                    </div>
                )

            })
            colorCheckboxElements = listOfColors.map(d => {
                return (
                    <div>
                        <input
                            type="checkbox"
                            onChange={props.handleChange}
                            name="colorCheckbox"
                            id={"check" + d}
                            value={d} />
                        <label htmlFor={"check" + d}>d</label>
                        <br />
                    </div>
                )

            })



        })
        alreadyLoaded = true
    }, [])



    return (
        <div>
            <form className="DataInputForm" onSubmit={props.handleSubmit}>
                <label htmlFor="ecNumCheckbox">ecNum</label>
                <input
                    type="checkbox"
                    onChange={props.handleChange}
                    name="ecNumCheckbox"
                    value={formData.ecNum}
                />
                <br />
                <label htmlFor="filterDefinitionCheckbox">Definitions</label>
                <input
                    type="checkbox"
                    onChange={props.handleChange}
                    name="filterDefinitionCheckbox"
                    value={formData.filterDefinition}
                />
                <br />
                <div id='colorChoiceDiv'>
                    {colorCheckboxElements}
                </div>
                <div id='pathwayChoiceDiv'>
                    {pathwayCheckboxElements}
                </div>

                <button>Submit Filters</button>
            </form>
        </div>
    )
}
