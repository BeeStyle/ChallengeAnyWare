import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import jwt_Decode from 'jwt-decode';
import Home from './component/Home/Home';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import { useEffect, useState } from 'react';
import Notfound from './component/notfound/Notfound';
import Master from './component/Master/Master';
import History from './component/History/History';
import axios from 'axios';
function App() {
  let [user, setUser] = useState(null)
  let token = localStorage.getItem("token")
  useEffect(() => {
    if (token) {
      saveUserData()
    }
  }, [token])
  function saveUserData() {
    let token = localStorage.getItem("token")
    let data = jwt_Decode(token)
    setUser(data)
    axios.defaults.headers.common['Authorization'] = token
  }
  async function LogOut() {
    localStorage.removeItem("token")
    setUser(null)
    await axios.get("http://localhost:5000/auth/logout")
    return <Navigate to='/Login' />
  }
  function ProtectedRouter(props) {
    if (localStorage.getItem("token") == null) {
      return <Navigate to='/Login' />
    }
    else {
      return props.children
    }
  }
  let routes = createBrowserRouter([
    {
      path: "/", element: <Master user={user} LogOut={LogOut} />, children: [
        { path: "/", element: <ProtectedRouter><Home /></ProtectedRouter> },
        { path: "home", element: <ProtectedRouter><Home /></ProtectedRouter> },
        { path: "history", element: <ProtectedRouter><History /></ProtectedRouter> },
        { path: "history", element: <ProtectedRouter><History /></ProtectedRouter> },
        { path: "login", element: <Login saveUser={saveUserData} /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <Notfound /> }
      ]
    }
  ])
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
