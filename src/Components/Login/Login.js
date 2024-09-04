import './Login.scss'
import { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer, toast } from 'react-toastify';
import RouteApi from '../../Service/RouteApi';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Context/Authenticate-context';
import Cookies from 'js-cookie';
const { loginUser } = RouteApi;



const Login = (props) =>{
    let history = useHistory();
    const { login, authState  } = useContext(AuthContext);
    const [EmailorUserName, setEmailorUserName] = useState("");
    const [Password, setPassword] = useState("");
    const defaultvalidinput = {
        isValidemail: true,
        isValidpassword: true
    }
    const [ojbvaliddata, setojbvaliddata] = useState(defaultvalidinput);
    
    const handleCreateNew = () =>{
        history.push("/register");
   }

   const handleLogin = async() =>{

    setojbvaliddata(defaultvalidinput);
    if(!EmailorUserName){
        setojbvaliddata({...defaultvalidinput, isValidemail:false});
        toast.error("Please enter your email or phone number!"); 
        return;
    }
    if(!Password){
        setojbvaliddata({...defaultvalidinput, isValidpassword: false});
        toast.error("Please enter your password!")
        return;
    }
     let responesedata =await loginUser(EmailorUserName, Password);
     
     if(responesedata.EC === 0 ){
        let UserData = {
            isAuthenticate: true,
            token: responesedata.ED.Access_token,
            data: responesedata.ED.data,
          };
      
        toast.success("Login success!");
        login(UserData.token, UserData.data);
        setTimeout(() => {
            history.push("/Home");
        }, 1000);
     }
     if(responesedata.EC === -105){
        toast.error("Invalid email!")
        setojbvaliddata({...defaultvalidinput, isValidemail:false});
        return;
     }
     if(responesedata.EC === -104){
        toast.error("invalid password!")
        setojbvaliddata({...defaultvalidinput, isValidpassword: false});
        return;
     }
   }
   
   useEffect(() => {
    console.log("State changed: ", authState);
  }, [authState]);

    return (
        <div className='Background'>
            <div className="login-container container">
            <div className="Login-content row">
                <div className="left-content col-7 text-center">
                <ToastContainer />
                    <div className='Text-Center'>
                    Chung Bee 🐝
                    </div>
                    <div className="slogan mt-3">
                    Put all your heart into your work, <br/>Jump all your way into the game, so that no energy is wasted.
                    </div>       
                </div>
                <div className="right-content col-5 green d-flex flex-column shadow gap-4">
                    <input className={ojbvaliddata.isValidemail ? 'form-control input-area' : 'is-invalid form-control'} 
                     placeholder='Email address or phone number' value={EmailorUserName} onChange={ (even) =>{
                        setEmailorUserName(even.target.value)
                     }} type='text'></input>
                    <input className={ojbvaliddata.isValidpassword ? 'form-control input-area' : 'is-invalid form-control'} placeholder='Password' value={Password} onChange={(even) =>{
                       setPassword(even.target.value) 
                    }} type='password'></input>
                    <button onClick={() =>handleLogin() } className='btn-login btn btn-primary'>Login</button>
                    <a href="#" className='PW-span text-center'>Forgot your password ?</a>
                    <hr/>
                    <div className='text-center'>
                    <button className='btn btn-success'onClick={() => handleCreateNew()} >Create new account</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    )
}

export default Login;