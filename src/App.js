import React from 'react'
import Input from './components/Input2'
import Page  from './components/Page'
import './App.css'


function App () {
  return <span style={{ fontSize: '12px' }}>
    <div style={{ height: '50px' }}/>
    <Page/>
    <br/>
    <br/>
    <br/>
    <Input/>
    <button onClick={() => {
      window.location.reload()
    }}>reload</button>
  </span>
}


export default App
