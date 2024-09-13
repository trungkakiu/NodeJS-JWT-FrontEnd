import React, { useState, useRef, useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./Scss/EditUser.scss";
import Nav from '../SvNav/Nav';
import Avatar from "../../HomePage/Scrourcedata/Beelogo.png"
import axios from 'axios';
import RouteApi from '../../Service/RouteApi';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/Authenticate-context';

const EditStudent = ({ show, closeModal, userdata }) => {
    const { authState, logout, AvatarChange } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const userAvatarUrl = `http://localhost:8081/UserAvatar/${authState.data.Avatar}`;
    const [uploadStatus, setUploadStatus] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(userAvatarUrl ? userAvatarUrl : Avatar);
    const fileInputRef = useRef(null);
    const [filesave, setfilesave] = useState(false);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            toast.error("File không đúng định dạng (chỉ cho phép JPEG, PNG, GIF)");
            return;
        }
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            toast.error("Dung lượng file quá lớn (tối đa 5MB)");
            return;
        }
        setSelectedFile(file);
        if (file) {
            const previewUrl = URL.createObjectURL(file);

            setAvatarPreview(previewUrl);
            setfilesave(true);
        }
    };

    const handleUpload = async () => {
      if (!selectedFile) {
          setUploadStatus('Please select a file first.');
          return;
      }
  
      const formData = new FormData();
      formData.append('file', selectedFile);
      for (let pair of formData.entries()) {
          console.log( 'file', `${pair[0]}: ${pair[1]}`);
      }
      try {
          const response = await RouteApi.AvatarChage(formData);
          const fileName = selectedFile.name; 
          console.log("ED:",response.data.ED)
          setUploadStatus('File uploaded successfully!');
          if (response) {
              toast.success('Cập nhật ảnh người dùng thành công');
              const newAvatarUrl = response.newAvatarName;
              setfilesave(false);
              AvatarChange(response.data.ED);
              closeModal(newAvatarUrl);
          } else {
              toast.error('Cập nhật ảnh người dùng không thành công');
          }
      } catch (error) {
          console.error(error);
          setUploadStatus('File upload failed!');
      }
  };
  
    const checkingsave = () =>{
      toast.warning('Hãy chọn ảnh mới trước khi lưu!')
      return;
    }
    useEffect(() => {
        return () => {
            if (avatarPreview && avatarPreview !== userdata.avatar) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview, userdata.avatar]);

    return (
        <Modal show={show} onHide={closeModal} size='lg' className='EditUser-Madal'>
            <Modal.Header closeButton>
                <Modal.Title>Tài Khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <form method='post' encType='multipart/form-data'>
                        <input
                            type="file"
                            name='profile_pic'
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <span className='User-Avatar' onClick={() => fileInputRef.current.click()}>
                            <img src={avatarPreview} className='shadow' alt="Avatar" />
                            <i className="avatar-edit fa-regular fa-pen-to-square"></i>
                        </span>
                        <div className='Savebtn' onClick={ filesave ? handleUpload : checkingsave}>
                            <button type='button' className={filesave ? 'btn btn-success' : 'btn btn-secondary'} >Save</button>
                        </div>
                    </form>

                    <div className='row col-12'>
                        <div className='input-area form-group col-6'>
                            <label>{userdata.Roleid === "SV" ? "Mã sinh viên *" : "Mã giáo viên *"}</label>
                            <input readOnly value={userdata.MSV} className='form-control' />
                        </div>
                        <div className='input-area form-group col-6'>
                            <label>{userdata.Roleid === "SV" ? "Tên sinh viên *" : "Tên giáo viên *"}</label>
                            <input readOnly value={userdata.Username} className='form-control' />
                        </div>
                        <div className='input-area form-group col-6'>
                            <label>Email</label>
                            <input readOnly value={userdata.Useremail} className='form-control' />
                        </div>
                        <div className='input-area form-group col-6'>
                            <label>Giới tính</label>
                            <input readOnly value="Nam" className='form-control' />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Cancel
                </Button>
                <Button variant="danger" >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditStudent;
