import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/nav.jsx'
import Wordle from './components/wordle.jsx'






function App() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => {
        if(!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setBackendData(data));
  }, []);

  return (
    <>
    
      <Navbar />     
    
    
      <Wordle solution="REACT" />
    
    
      
    </>
  )
}

export default App
