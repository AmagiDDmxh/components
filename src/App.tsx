import React from 'react'
import Button from './components/Button'
import Toggle from './components/Toggle'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Button</h1>
      <div>
        <Button>Hello</Button>
      </div>
      <h1>Toggle</h1>
      <div>
        <Toggle />
      </div>
    </div>
  )
}

export default App
