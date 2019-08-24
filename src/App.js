import React from 'react';
import './App.css';
import DataFetch from './DataFetch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Classy Alcoholics
      </header>
      <p className="App-desc">
        Some visualizations summarizing brewery data from Open Brewery DB.
      </p>
      <div className="App-content">
        <DataFetch />
      </div>
    </div>
  );
}

export default App;
