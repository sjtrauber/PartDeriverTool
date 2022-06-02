import React, {useState,useEffect, useRef} from 'react'
import * as d3 from 'd3'


export default function HeatMap(props) {

    let {dataLink, filters} = props;
    const [data, setData] = useState(null);

    const margin = {top: 40, right: 0, bottom: 20, left: 0};
    const [width, setWidth] = useState(600 - margin.left - margin.right);
    const [height, setHeight] = useState(210 - margin.top - margin.bottom);

    const refElementblue = useRef(null);
    const refElementbrown = useRef(null);
    const refElementturquoise = useRef(null);

    let alreadyLoaded = false;
    useEffect(() => {
        if (alreadyLoaded) {return;}

        d3.csv(dataLink).then(async function(data) {

            console.log("Data:")
            console.log(data)

            // if (filters && filters.length > 0) {
            //     data = data.filter(function(d) {
            //         for (let proteinId of filters) {
            //             if (d["proteinId"] == proteinId) {
            //                 return d;
            //             }
            //         }
            //     })
            // }

            let sumstat = d3.group(data, m => m.dsmoduleColors)

            let myGroups = data.map(d => d.condition)
            let allKeys = new Set(data.map(m=>m.dsmoduleColors));

            sumstat.forEach((i, index) =>{
                let selectName;
                if (index === 'grey') { return;}
                if (index === 'blue') {selectName = refElementblue.current}
                if (index === 'brown') {selectName = refElementbrown.current}
                if (index === 'turquoise') {selectName = refElementturquoise.current}

                //let selectName = '#dataviz' + index;
                // Add an svg element for each group. The will be one beside each other and will go on the next row when no more room available
                const svg = d3.select(selectName)
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        `translate(${margin.left},${margin.top})`)


                const myVars = i.map(d => d.proteinId)
                console.log(myVars)
                // Build X scales and axis:
                const x = d3.scaleBand()
                    .range([ 0, width ])
                    .domain(myGroups)
                //       .padding(0.05);
                svg.append("g")
                    .style("font-size", 15)
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x).tickSize(0))
                    .select(".domain").remove()


                console.log(myVars.length / 12)


                // Build Y scales and axis
                const y = d3.scaleBand()
                    .range([ height, 0 ])
                    .domain(myVars)
                //       .padding(0.05);

                // Build color scale
                const myColor = d3.scaleSequential()
                    .interpolator(d3.interpolateRdBu)  // red high, blue low
                    .domain([3000,0])

                console.log('start add squares')
                // add the squares
                svg.selectAll()
                    .data(i, function(d) {return d.condition+':'+d.proteinId;})
                    .join("rect")
                    .attr("x", function(d) { return x(d.condition) })
                    .attr("y", function(d) { return y(d.proteinId) })
                    .attr("rx", 4)
                    .attr("ry", 4)
                    .attr("width", x.bandwidth() )
                    //.attr("height", 1 )
                    .attr('height', () => {return (y.bandwidth() < 1) ? 1 : y.bandwidth(); })
                    .style("fill", function(d) { return myColor(d.expression)} )
                    .style("stroke-width", 4)
                    .style("stroke", "none")
                    .style("opacity", 0.8)
                //       .on("mouseover", mouseover)
                //       .on("mousemove", mousemove)
                //       .on("mouseleave", mouseleave)

                console.log('end add squares')
                // Add title to graph
                svg.append("text")
                    .attr("x", 0)
                    .attr("y", -20)
                    .attr("text-anchor", "left")
                    .style("font-size", "22px")
                    .text("Module " + index + " with " + myVars.length / 12 + " genes");

            })
        })
        alreadyLoaded = true
    }, [])


    let style = {
        display: 'flex',
        flexDirection: "column"
    }

    return (
        <div style={style}>
            <svg ref={refElementblue}></svg>
            <svg ref={refElementbrown}></svg>
            <svg ref={refElementturquoise}></svg>
        </div>
    )
}
