import { useEffect, useState } from 'react';
import '../Register/Register.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiRoutes from '../../Service/RouteApi';
const { registerUser } = apiRoutes;

const Register = (props) => {
    let history = useHistory();
    const [EmailorUserName, setEmailorUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [RePassword, setRePassword] = useState("");
    const defaultvalidinput = {
        isValidemail: true,
        isValidpassword: true
    }
    const [ojbvaliddata, setojbvaliddata] = useState(defaultvalidinput);
    const validateData = () => {
        if (!EmailorUserName) {
            toast.error("Email is required!");
            return false;
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(EmailorUserName)) {
            toast.error("Email is not correct!");
             setojbvaliddata({...defaultvalidinput, isValidemail:false});
            return false;
        }
        if (!Password) {
            toast.error("Password is required!");
            return false;
        }
        if (Password !== RePassword) {
            toast.error("Re-entered password does not match!");
            return false;
        }
        return true;
    };

    const handleRegister = async() => {
        if (validateData()) {
            
            let UserData = { EmailorUserName, Password, RePassword };
            const respones = await registerUser(EmailorUserName, Password);
            if(respones){
               if(respones.data.EC !== 0){
                if(respones.data.EC === -102){
                    toast.error(respones.data.EM)
                    setojbvaliddata({...defaultvalidinput, isValidemail:false});
                    return;
                }
               }
                toast.success("login now with your account!");
                setTimeout(() => {
                    history.push("/Login");
                }, 2000);
            }
           
        }
        
    };
    const handleLogin = () => {
        history.push("/Login");
    };

    useEffect(() => {
       
    }, []); // Dependencies as needed

    return (
        <div className='Background'>
            <ToastContainer />
            <div className="login-container container">
                <div className="Login-content row">
                    <div className="left-content col-7 text-center">
                        <div className='Text-Center'>
                            Chung Bee 🐝
                        </div>
                        <div className="slogan mt-3">
                            Put all your heart into your work, <br />Jump all your way into the game, so that no energy is wasted.
                        </div>
                    </div>
                    <div className="right-contentR col-5 green d-flex flex-column shadow gap-4">
                        <input className= { !ojbvaliddata.isValidemail ? 'is-invalid input-area form-control '  : 'form-control input-area'}  value={EmailorUserName} onChange={(event) => setEmailorUserName(event.target.value)} placeholder='Email address or phone number' type='text'></input>
                        <input className='form-control input-area' value={Password} onChange={(event) => setPassword(event.target.value)} placeholder='Password' type='password'></input>
                        <input className='form-control input-area' value={RePassword} onChange={(event) => setRePassword(event.target.value)} placeholder='Re-Password' type='password'></input>
                        <button onClick={handleRegister} className='btn-login btn btn-primary'>Signup</button>
                        <p className='PW-span text-center'>Already have an account? <a href="#" onClick={handleLogin} >Login</a></p>
                        <hr />
                        <div className='text-center'>
                            <div>Or login with</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
