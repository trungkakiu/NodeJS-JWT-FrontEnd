import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Avatar from "../../HomePage/Scrourcedata/Beelogo.png"
import "./Scss/EditUser.scss"


const EditStudent = ({ show, closeModal ,userdata}) => {

    return (
        
        <Modal show={show} onHide={closeModal} size='lg' className='EditUser-Madal'>
            <Modal.Header closeButton>
                <Modal.Title>Tài Khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <div>
                        <span className='User-Avatar'>
                            <img src={Avatar} className='shadow'/>
                            <i className="avatar-edit fa-regular fa-pen-to-square"></i>
                        </span>
                        <div className='row col-12 '>
                            <div className='input-area form-group col-6' >
                                <label> {userdata.Roleid === "SV" ? "Mã sinh viên *" : "Mã giáo viên *"}</label>
                                <input readOnly value= {userdata.MSV} className='form-control'></input>
                            </div>
                            <div className='input-area form-group col-6'>
                                <label> {userdata.Roleid === "SV" ? "Tên sinh viên *" : "Tên giáo viên *"}</label>
                                <input readOnly value= {userdata.Username} className='form-control'></input>
                            </div>
                            <div className='input-area form-group col-6'>
                                <label>Email</label>
                                <input readOnly value= {userdata.Useremail} className='form-control'></input>
                            </div>
                            <div className='input-area form-group col-6'>
                                <label>Giới tính</label>
                                <input readOnly value= "Nam" className='form-control'></input>
                            </div>
                        </div>
                    </div>
            </Modal.Body>
          
        </Modal>
    );
};

export default EditStudent;
