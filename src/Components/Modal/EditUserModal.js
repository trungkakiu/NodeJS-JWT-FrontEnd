
import React, { useState ,useEffect} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import RouteApi from '../../Service/RouteApi';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../ModalCss/Edit/EditUser.scss'

const DeleteConfirmModal = ({ show, closeEditModel, handleEdit, selectedEditUSer }) => {
    const [email, setEmail] = useState(selectedEditUSer.email);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [isShows, setisshows] = useState(false);
    const defaultdata = {
        validOldpassword: false,
        validEmail: false,
        validNewPassword: false,
        validRepassword: false,
       
    }
    const [isShow, setisShow] = useState(defaultdata);
    useEffect(() => {
        setEmail(selectedEditUSer.email || '');
        setOldPassword('');
        setNewPassword('');
        setReNewPassword('');
        setisShow(defaultdata);
        setisshows(false);
        
    }, [selectedEditUSer]);

    
    
    const isValidData = async () =>{

        try {
            if(!email){
                setisShow(defaultdata)
                setisShow({...defaultdata, validEmail: true})
                toast.error("Require email!")
                return;
            }
            if(!oldPassword){
                setisShow(defaultdata)
                setisShow({...defaultdata, validOldpassword: true})
                toast.error("Require old password!")
                return;
            }
            const data = await RouteApi.oldPasswordConfirm(oldPassword, selectedEditUSer.id);
            if(newPassword){
                if(!reNewPassword){
                    setisShow(defaultdata)
                    setisShow({...defaultdata, validRepassword: true});
                    toast.error("require!!");
                    return ;
                }
                if(reNewPassword){
                    if(reNewPassword !== newPassword){
                        setisShow(defaultdata)
                        setisShow({...defaultdata,validRepassword:true, validNewPassword: true});
                        toast.error("New password is not same!")
                        return ;
                    }
                 
                    if (data.EC === -1 || data.ED === false) {
                        setisShow({ ...defaultdata, validOldpassword: true });
                        toast.error("The old password is not correct!");
                        return;
                    }
                    const userdata = {
                        PassWord: newPassword,
                        email: email,
                        id: selectedEditUSer.id
                    };
                    let dataEdited = await handleEdit(userdata);
                    if(dataEdited.EC === -4){
                        toast.error("You do not have permission please contact the admin");
                        closeEditModel();
                        return;
                    }
                    if(!dataEdited){
                        toast.error("edit user error!");
                        return;
                   }
                   closeEditModel();
                }
            }else{
                if (data.EC === -1 || data.ED === false) {
                    setisShow({ ...defaultdata, validOldpassword: true });
                    toast.error("The old password is not correct!");
                    return;
                }
                const userdata = {
                    PassWord: oldPassword,
                    email: email,
                    id: selectedEditUSer.id
                };
                let dataEdited = await handleEdit(userdata);
                console.log("dataedited: ",dataEdited)
                if(!dataEdited){
                    toast.error("edit user error!");
                    return;
                }
                if(dataEdited.EC === -4){
                    toast.error("You do not have permission please contact the admin");
                    closeEditModel();
                    return;
                }
                if(dataEdited.EC === -5){
                    toast.error("You do not have role please contact with admin!");
                    closeEditModel();
                    return;
                }

                await setOldPassword('Dont Trying hack!');
                closeEditModel();
            }
            
        } catch (error) {
            console.error(error);
            return;
        }
    }
    const setShowPassWord = () =>{
        setisshows(!isShows)
    }
    return (
        <Modal show={show} onHide={closeEditModel}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <ToastContainer />
            <Modal.Body>
                <div className='UseeditContainer'>
                 
                     <div className='form-group col-12 col-sm-12 mb-3'>
                        <label>Email or phone number</label>
                        <input 
                            value={email} 
                            onChange={(event) => setEmail(event.target.value)} 
                            name='email' 
                            className={isShow.validEmail ? "is-invalid form-control" : "form-control"} 
                        />
                    </div>
                    <div className= { defaultdata.validOldpassword ? 'is-invalid form-group col-12 col-sm-12 mb-3' : 'form-group col-12 col-sm-12 mb-3'}>
                        <label>Old PassWord(<span>*</span>)</label>
                        <input type="password" value={oldPassword} onChange={
                            (event)=> setOldPassword(event.target.value)} name='email'  className= {
                             isShow.validOldpassword ? "is-invalid form-control" : "form-control"} >
                        </input>
                      
                    </div>
                    <div className='form-group col-12 col-sm-12 mb-3'>
                        <label>New PassWord</label>
                        <input  type={isShows ? "text" : "password"} value={newPassword}  onChange={(event)=> setNewPassword(event.target.value)}
                          name='email'  className= { isShow.validNewPassword ? "is-invalid form-control" : "form-control"}></input>
                        
                    </div>
                    <div className='form-group col-12 col-sm-12 mb-3'>
                        <label>Re New PassWord</label>
                        <input  type="password" value={reNewPassword} onChange={(event)=> setReNewPassword(event.target.value)}
                          name='email'  className= { isShow.validRepassword ? "is-invalid form-control" : "form-control"}></input>
                          <span onClick={setShowPassWord} style={reNewPassword ? { cursor: 'pointer', marginLeft: '10px' }: { display: 'none' }}>
                              <i  className={isShows ? "far fa-eye-slash" : "far fa-eye"}></i>
                         </span>
                    </div>
                    </div>
            </Modal.Body>
            {
                <Modal.Footer>
                <Button variant="secondary" onClick={closeEditModel}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={isValidData}>
                    Save
                </Button>
            </Modal.Footer>
            }
            
        </Modal>
    );
};

export default DeleteConfirmModal;
