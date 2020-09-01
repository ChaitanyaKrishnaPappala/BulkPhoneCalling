import React from 'react'
import './App.css'
import Numbers from './containers'
import {Route} from 'react-router-dom'

function App () {
  return (
      <div className='App'>
        <header className='App-header'>
          <Route exact path='/' component={Numbers} />
        </header>
      </div>
  )
}

export default App
