import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3';
import { select } from 'd3-selection';

class BarChart extends Component {
   constructor(props){
      super(props);
      this.createBarChart = this.createBarChart.bind(this);
   }

   componentDidMount() {
      this.createBarChart();
   }

   componentDidUpdate() {
      this.createBarChart();
   }

   createBarChart() {

    const node = this.node;
    const data = this.props.data;
    
      // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    // set the ranges
    var x = d3.scaleBand()
        .domain(data.map(function(d) { return d.city; }))
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.freq; })])
        .range([height, 0]);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(node).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
        "translate(" + margin.left + "," + margin.top + ")");

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", (function(d) { return x(d.city); }))
    .attr("width", x.bandwidth())
    .attr("y", (function(d) { return y(d.freq); }))
    .attr("height", (function(d) { return height - y(d.freq); }))
    .style('fill', (d, i) => colorScale(i));

    // add the x Axis
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
    .call(d3.axisLeft(y));

   }

   

   render() {
      return <svg ref={node => this.node = node} width={500} height={400} />
   }
}

export default BarChart;