import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';
import Login from '../Components/Login/Login'
import Register from '../Components/Register/Register';
import HomePage from '../HomePage/HomePage';


  const PublicRoutes =(props) =>{
    return (
    <Route>
        <Route path="/Login">
         <Login />
        </Route>
        <Route path="/register" exact>
         <Register/>
        </Route>
        <Route path="/" exact>
        <HomePage/>
        </Route>
    </Route>
    )
  }
  export default PublicRoutes;