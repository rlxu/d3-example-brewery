import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import PieChart from './PieChart';

const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST || "https://api.openbrewerydb.org";

class DataFetch extends Component {
	constructor() {
    super();
 		this.state = {
      pieData: {}, 
    }
  }

  componentDidMount() {
  	const data = {};
  	axios.all([
		    axios.get(API_SERVER_HOST + '/breweries?by_city=berkeley'),
		    axios.get(API_SERVER_HOST + '/breweries?by_city=oakland'),
		    axios.get(API_SERVER_HOST + '/breweries?by_city=fremont'),
		    axios.get(API_SERVER_HOST + '/breweries?by_city=sunnyvale'),
		    axios.get(API_SERVER_HOST + '/breweries?by_city=san_jose'),
		  ])
		  .then(axios.spread((be, ok, fr, su, sj) => {
		    data['Berkeley'] = be.data.length;
		    data['Fremont'] = fr.data.length;
		    data['Oakland'] = ok.data.length;
		    data['Sunnyvale'] = su.data.length;
		    data['San Jose'] = sj.data.length;
		    this.setState({ pieData: data });
		  }));
  }

  render() {
    return (
    	<div>
	    	<h3 className='Chart-title'>
	        Distribution of Breweries in Bay Area Cities
	      </h3>
	      <p className='Chart-desc'>
	      	Pie chart is a terrible representation of this data, just doing this for demonstration purposes.
	      </p>
	    	<PieChart data={this.state.pieData} />
	    </div>
    );
  }
}

export default DataFetch;
