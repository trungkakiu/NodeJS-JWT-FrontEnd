import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../ModalCss/Create/CreateUser.scss';
import { toast, ToastContainer } from 'react-toastify';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const CreateNewUser = ({ show, closeCreateModel, handleCreate }) => {
    const [emailorpnb, setemailorpnb] = useState({});
    const [password, setPassword] = useState({});
    const [repassword, setRepassword] = useState({});
    const [isShows, setisshows] = useState(false);
    const defaultdata = {
        validEmail: false,
        validNewPassword: false,
        validRepassword: false,
       
    }

    
    useEffect(() => {
        setemailorpnb('');
        setPassword('');
        setRepassword('');
        setisshows(false);
        
    },[show]);
    const [isShow, setisShow] = useState(defaultdata);
    const userData = {
        emailorpnb,
        password
    }
    const showErrorToast = (message) => {
        toast.error(
            <div>
                <FontAwesomeIcon icon={faExclamationCircle} style={{ marginRight: '8px' }} />
                {message}
            </div>
        );
    };
    
    const setShowPassWord = () =>{
        setisshows(!isShows)
    }
    const checkingdata = () =>{
        try {
            if(!emailorpnb){
                showErrorToast("Require email or phone number!");
                setisShow({...defaultdata, validEmail: true})
                return;
            }
            if(!password ){
                showErrorToast("Require this parameter!");
                setisShow({...defaultdata,validNewPassword: true})
                return;
            }
            if(!repassword){
                showErrorToast("Require this parameter!");
                setisShow({...defaultdata,validRepassword: true})
                return;
            }
            if(repassword !== password){
                showErrorToast("The password and repassword is not same!");
                setisShow({...defaultdata,validRepassword: true,validNewPassword: true})
                return;
            }
            handleCreate(userData);
            closeCreateModel();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Modal show={show} onHide={closeCreateModel}>
            <Modal.Header closeButton>
                <Modal.Title>Create New</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className='UseeditContainer'>
                 <ToastContainer/>
                 <div className='form-group col-12 col-sm-12 mb-3'>
                    <label>Email or phone number</label>
                    <input 
                       
                        onChange={(event) => setemailorpnb(event.target.value)} 
                        name='email' 
                        className={isShow.validEmail ? "is-invalid form-control" : "form-control"} 
                    />
                </div>
                <div className='form-group col-12 col-sm-12 mb-3'>
                    <label>New PassWord</label>
                    <input  type="password" onChange={(event)=> setPassword(event.target.value)}
                      name='email'  className= { isShow.validNewPassword ? "is-invalid form-control" : "form-control"}></input>
                    
                </div>
                <div className='form-group col-12 col-sm-12 mb-3'>
                    <label>Re New PassWord</label>
                    <input  type={isShows ? "text" : "password"} onChange={(event)=> setRepassword(event.target.value)}
                      name='email'  className= { isShow.validRepassword ? "is-invalid form-control" : "form-control"}></input>
                      <span onClick={setShowPassWord} style={repassword ? { cursor: 'pointer', marginLeft: '10px' }: { display: 'none' }}>
                          <i  className={isShows ? "far fa-eye-slash" : "far fa-eye"}></i>
                     </span>
                </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeCreateModel}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => checkingdata()}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateNewUser;
