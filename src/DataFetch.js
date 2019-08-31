import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import PieChart from './PieChart';
import BarChart from './BarChart';

const API_SERVER_HOST = process.env.REACT_APP_API_SERVER_HOST || "https://api.openbrewerydb.org";

class DataFetch extends Component {
	constructor() {
    super();
 		this.state = {
	  pieData: {}, 
	  barData: []
    }
  }

  componentDidMount() {
  	const pie = {};
  	axios.all([
		    axios.get(API_SERVER_HOST + '/breweries?by_city=berkeley'),
		    axios.get(API_SERVER_HOST + '/breweries?by_city=oakland'),
		    axios.get(API_SERVER_HOST + '/breweries?by_city=fremont'),
		    axios.get(API_SERVER_HOST + '/breweries?by_city=sunnyvale'),
		    axios.get(API_SERVER_HOST + '/breweries?by_city=san_jose'),
		  ])
		  .then(axios.spread((be, ok, fr, su, sj) => {
		    pie['Berkeley'] = be.data.length;
		    pie['Fremont'] = fr.data.length;
		    pie['Oakland'] = ok.data.length;
		    pie['Sunnyvale'] = su.data.length;
		    pie['San Jose'] = sj.data.length;
			this.setState({ pieData: pie });
			
			const bar = [
				{ city: 'Berkeley',
				  freq: be.data.length
				},
				{ city: 'Fremont',
				  freq: fr.data.length
				},
				{ city: 'Oakland',
				  freq: ok.data.length
				},
				{ city: 'Sunnyvale',
				  freq: su.data.length
				},
				{ city: 'San Jose',
				  freq: sj.data.length
				}	
			]
			this.setState({ barData: bar });
		  }));
  }

  render() {
    return (
    	<div>
			<h3 className='Chart-title'>
				Distribution of Breweries in Bay Area Cities
			</h3>
			<div className='Chart-row'>
				<div className='Chart-item'>
					<p className='Chart-desc'>
						Pie charts are generally not good representations of data, just doing this for demonstration purposes.
					</p>
					<PieChart data={this.state.pieData} />
				</div>
				<div className='Chart-item'>
					<p className='Chart-desc'>
						This is a more suitable visualization type :) 
					</p>
					<BarChart data={this.state.barData} />
				</div>
			</div>
	    </div>
    );
  }
}

export default DataFetch;

