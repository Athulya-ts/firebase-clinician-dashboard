import {BrowserRouter,Routes,Route} from 'react-router-dom'
import React from 'react'
import App from './App'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Video from './Components/Video'

const Router = () => {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path = "/" element = {<Login/>}/>
        <Route path = "/SignUp" element = {<SignUp/>}/>
        <Route path = "/App" element = {<App/>}/>
        <Route path = "/Login" element = {<Login/>}/>
        <Route path = "/Video" element = {<Video/>}/>
      </Routes>
    </div>
      </BrowserRouter>
  )
}

export default Router;

