import { useState } from 'react'
import './App.css'
import Navbar from './components/nav.jsx'
import Board from './components/board.jsx'






function App() {
  

  return (
    <>
    <header className="header">
      <Navbar />     
    </header>
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Board />
    </main>
    
      
    </>
  )
}

export default App
