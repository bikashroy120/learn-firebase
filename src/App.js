import React from 'react'
import './App.css';
import Authentication from './components/Authentication';
import Storage from './components/Storage';



function App() {

  return (
    <div className="App">
      <div>
        <h2>
        Authentication
        </h2>
        <Authentication />
      </div>
      <div>
          <h2>Storage</h2>
          <Storage />
      </div>
       
    </div>
  );
}

export default App;
