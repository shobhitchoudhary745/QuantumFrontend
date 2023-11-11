import React from 'react'
import { HashRouter, Route,Routes } from 'react-router-dom'
import Login from './routers/Login'
import Signup from './routers/Signup'

import Main from './routers/Main'
function App(){
    return(
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/main" element={<Main />}/>
        </Routes>
    </HashRouter> 
    )
}

export default App;