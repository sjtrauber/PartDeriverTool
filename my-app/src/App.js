import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import HeatMap from "./components/HeatMap";
import DataFilters from "./components/DataFilters";
import DataTable from "./components/DataTable";
import DataInput from "./components/DataInput";
import {useState} from "react";
import * as d3 from "d3";

function App() {

    const [dataUploaded, setDataUploaded] = useState(true);
    const [filtersTrigger, setFiltersTrigger] = useState(true);

    const [dataLinks, setDataLinks] = useState({
        dataset1Link: "",
        dataset2Link: ""
    });

    const [dataFilters, setDataFilters] = useState({
        filter1: "",
        filter2: ""
    })

    const [heatmapData, setHeatmapData] = useState({})

    const [tableData, setTableData] = useState({})

    function handleChangeDataInput(event) {
        const {name, value} = event.target
        setDataLinks(d => {
            return {
                ...d,
                [name]: value
            }
        })
    }

    function handleSubmitDataInput(event) {
        event.preventDefault()
        setDataUploaded(false)
    }

    function handleChangeDataFilters(event) {
        const {name, value} = event.target
        setDataFilters(d => {
            return {
                ...d,
                [name]: value
            }
        })
    }

    async function handleSubmitDataFilters(event) {
        event.preventDefault()
        // setTableData(d3.json(dataLinks.dataset1Link))
        // let data = d3.json(dataLinks.dataset2Link).then(d => d)
        // setHeatmapData(data)
        // setFiltersTrigger(!filtersTrigger)

        // need to use the change of set filters trigger to allow the
        // change of state to rerender heatmap and table?
        // not sure if we can do that otherwise we can make another state that is equivalent to old state
        // and reset that state here or just let it update automatically?


    }
    //console.log("Data in app:")
    //console.log(heatmapData)


    return (
    <div className="App">
        {/* <Navbar /> */}
        {dataUploaded && <DataInput
            handleSubmit={handleSubmitDataInput}
            handleChange={handleChangeDataInput}
            formData={dataLinks}

        />}
        {!dataUploaded && <HeatMap
            //data={heatmapData}
            dataLink={dataLinks.dataset2Link}
            filters={dataFilters}
        />}
        {!dataUploaded && <DataFilters
            handleSubmit={handleSubmitDataFilters}
            handleChange={handleChangeDataFilters}
            formData={dataFilters}
        />}
        {tableData.length > 0 && <DataTable
            //data={tableData}
            dataLink={dataLinks.dataset1Link}
            filters={dataFilters}
            // if we leave dataFilters connected we might want not want to apply the individually clicked items?
        />}

    </div>
  );
}

export default App;
