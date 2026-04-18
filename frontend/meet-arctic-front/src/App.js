import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Loader from './components/loader';




function App() {
  const [loading, setLoading] = useState(true);

  setTimeout(()=>{
        setLoading(false);
      }, 8000);

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setLoading(false);
  //   }, 8000);
  // });

  
  if(loading) {
    return <Loader>Loading...</Loader>;
  } 

  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
