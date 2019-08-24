import React, { Component } from 'react';
import './App.css';
import { entries } from 'd3-collection';
import { scaleOrdinal } from 'd3-scale';
import { select } from 'd3-selection';
import { schemeSet1 } from 'd3-scale-chromatic';
import { arc, pie } from 'd3-shape';

class PieChart extends Component {
   constructor(props){
      super(props);
      this.createPieChart = this.createPieChart.bind(this);
   }

   componentDidMount() {
      this.createPieChart();
   }

   componentDidUpdate() {
      this.createPieChart();
   }

   createPieChart() {
      // set the dimensions and margins of the graph
      const width = 500;
      const height = 400;
      const margin = 100;
      // The radius of the pieplot is half the width or half the height (larger one). I subtract a bit of margin.
      const radius = Math.max(width, height) / 2 - margin;

      // get the data from props
      const node = this.node;
      const data = this.props.data;

      // append the svg object to the node
      const svg = select(node)
        .append("g")
          .attr("transform", "translate(" + width * 0.5 + "," + height * 0.5 + ")");

      // set the color scale
      var color = scaleOrdinal().domain(data)
        .range(schemeSet1);

      // Compute the position of each group on the pie:
      var pieCompute = pie().value(function(d) {return d.value; });
      var data_ready = pieCompute(entries(data));

      // shape helper to build arcs:
      var arcGenerator = arc().innerRadius(radius * 0.4).outerRadius(radius * 0.8);
      var outerArc = arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9);

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
          .attr('d', arcGenerator)
          .attr("fill", function(d){ return(color(d.data.key)) })
          .attr("stroke", "black")
          .style("stroke-width", "0.5px")
          .style("opacity", 0.7);

      svg
        .selectAll('allLabels')
        .data(data_ready)
        .enter()
        .append('text')
          .text( function(d) { return d.data.key + ' (' + d.data.value +')' } )
          .attr('transform', function(d) {
              var pos = outerArc.centroid(d);
              var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
              pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
              return 'translate(' + pos + ')';
          })
          .style('text-anchor', function(d) {
              var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
              return (midangle < Math.PI ? 'start' : 'end')
          })
          .style("font-size", 15)
          .style("font-family", "Roboto");

      svg
        .selectAll('allPolylines')
        .data(data_ready)
        .enter()
        .append('polyline')
          .attr("stroke", "black")
          .style("fill", "none")
          .attr("stroke-width", 1)
          .attr('points', function(d) {
            var posA = arcGenerator.centroid(d); // line insertion in the slice
            var posB = outerArc.centroid(d); // line break
            var posC = outerArc.centroid(d); // Label position = almost the same as posB
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); 
            return [posA, posB, posC];
          });
   }

   render() {
      return <svg ref={node => this.node = node} width={500} height={400} />
   }
}

export default PieChart;
