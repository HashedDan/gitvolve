import React, { Component } from 'react'
import * as d3 from "d3"


class Viz extends Component {
    constructor(props){
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }
    
    componentDidMount() {
        this.createBarChart()
    }
    
    componentDidUpdate() {
        this.createBarChart()
    }

    createBarChart() {
        const height = 500
        const width = 500
        const node = this.node
        const radius = (Math.min(height, width) / 2) - 10
        const color = d3.scaleOrdinal(d3.schemeCategory20)
        const formatNumber = d3.format(",d")
        const partition = d3.partition()

        const x = d3.scaleLinear()
            .range([0, 2 * Math.PI]);
        
        const y = d3.scaleSqrt()
            .range([0, radius]);

        // Calculate arc relative to elements in same level
        var arc = d3.arc()
            .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
            .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
            .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
            .outerRadius(function(d) { return Math.max(0, y(d.y1)); });

        // Append SVG and Group for Paths
        var svg = d3.select("#viz").append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

        d3.select(self.frameElement).style("height", height + "px");
    }
    render() {
        return <div id="viz"></div>
    }
}

export default Viz