import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import HeatMap from "./components/HeatMap";
import DataFilters from "./components/DataFilters";
import DataTable from "./components/DataTable";
import DataInput from "./components/DataInput";
import {useState} from "react";

function App() {

    const [dataUploaded, setDataUploaded] = useState(true);

    const [dataLinks, setDataLinks] = useState({
        dataset1Link: "",
        dataset2Link: ""
    });

    function handleChange(event) {
        const {name, value} = event.target
        setDataLinks(d => {
            return {
                ...d,
                [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        setDataUploaded(false)
        //    do something here
    }

  return (
    <div className="App">
        {/* <Navbar /> */}
        {dataUploaded && <DataInput
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formData={dataLinks}

        />}
        <HeatMap />
        <DataFilters />
        <DataTable />

    </div>
  );
}

export default App;
