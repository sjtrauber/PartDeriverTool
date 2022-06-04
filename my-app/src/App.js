import './App.css';
import HeatMap from "./components/HeatMap";
import DataFilters from "./components/DataFilters";
import DataTable from "./components/DataTable";
import DataInput from "./components/DataInput";
import {useState} from "react";

function App() {

    const [dataUploaded, setDataUploaded] = useState(true);
    const [filtersTrigger, setFiltersTrigger] = useState(true);

    const [dataLinks, setDataLinks] = useState({
        dataset1Link: "",
        dataset2Link: ""
    });

    const [dataFilters, setDataFilters] = useState({
        proteinId: [],
        color: [],
        pathway: [],
        ecNum: false,
        filterDefinition: false,
        gotermID: false,
        kogId: false,
        kogClass: false,
        iprId: false,
        filterFunction: false
    })

    const [submittedDataFilters, setSubmittedDataFilters] = useState({
        proteinId: [],
        color: [],
        pathway: [],
        ecNum: false,
        filterDefinition: false,
        gotermID: false,
        kogId: false,
        kogClass: false,
        iprId: false,
        filterFunction: false
    })

    // const [heatmapData, setHeatmapData] = useState({})
    // const [tableData, setTableData] = useState({})

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
        const {name, value, type, checked} = event.target
        setDataFilters(d => {
            return {
                ...d,
                [name]: type === 'checkbox' ? checked : value
            }
        })

    }
    console.log(dataFilters)
    async function handleSubmitDataFilters(event) {
        event.preventDefault()
        setSubmittedDataFilters(dataFilters)


    }

    // need to use the change of set filters trigger to allow the
    // change of state to rerender heatmap and table?
    // not sure if we can do that otherwise we can make another state that is equivalent to old state
    // and reset that state here or just let it update automatically?
    // function getData() {
        // setTableData(d3.json(dataLinks.dataset1Link))
        // let data = d3.json(dataLinks.dataset2Link).then(d => d)
        // setHeatmapData(data)
        // setFiltersTrigger(!filtersTrigger)
    // }



    return (
    <div className="App">
        {/* <Navbar /> */}
        {dataUploaded && <DataInput
            handleSubmit={handleSubmitDataInput}
            handleChange={handleChangeDataInput}
            formData={dataLinks}

        />}
        {!dataUploaded && dataLinks.dataset2Link !== "" && <HeatMap
            //data={heatmapData}
            dataLink={dataLinks.dataset2Link}
            propsFilters={submittedDataFilters}
        />}
        {!dataUploaded && dataLinks.dataset1Link !== "" && <DataFilters
            handleSubmit={handleSubmitDataFilters}
            handleChange={handleChangeDataFilters}
            formData={dataFilters}
            dataLink={dataLinks.dataset1Link}
            propsFilters={submittedDataFilters}
        />}
        {!dataUploaded && dataLinks.dataset1Link !== "" && <DataTable
            //data={tableData}
            dataLink={dataLinks.dataset1Link}
            propsFilters={submittedDataFilters}
            // if we leave dataFilters connected we might want not want to apply the individually clicked items?
        />}

    </div>
  );
}

export default App;
