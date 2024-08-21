import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import RouteApi from '../../Service/RouteApi';
import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";
import DeleteConfirmModal from '../Modal/DeleteModal';
import EditUserModal from '../Modal/EditUserModal'
import CreateUserModal from '../Modal/CreateUserModal'
// import CreatenewModal from '../Modal/CreateUserModal';
// import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import 'react-toastify/dist/ReactToastify.css';


const UserHome = (props) =>{
    const [users, setUsers] = useState([]);
    const [curentPage, setcrentPage] = useState(1);
    const [curentLimit, setcrentLimit] = useState(8);
    const [pageCount, setPageCount] = useState([]);
    const [showModal, setshowModal] = useState(false);
    const [showEditModal, setShowEdit] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    

    useEffect(()=>{
        fetchUser();
    },[curentPage]);
   
    const openModal = (user, code)=>{
      try {
        if(code === 1){
            setShowCreate(true);
        }
        if(code === 2){
            setShowEdit(true);
            setSelectedUser(user);
        }
        if(code === 3){
            setshowModal(true);
            setSelectedUser(user);
        }
      } catch (error) {
        console.error(error)
      }
      
    }

    const closeModal = () =>{
        try {
            setShowCreate(false);
            setShowEdit(false);
            setshowModal(false);
            if(selectedUser){
            setSelectedUser({})
            }
        } 
        catch (error) {
            console.error(error);
        }
    }
  
    const fetchUser = async () => {
        try {
            let response = await RouteApi.fetchAllUser(curentPage,curentLimit);
            if (response && response.data && response.data.EC === 0) {
                const userData = response.data.ED.DataPage;
                setPageCount(response.data.ED.totalPage)
                if (Array.isArray(userData)) {
                    setUsers(userData);
                } else {
                    toast.error("Data format is incorrect");
                }
            } else {
                toast.error("Failed to fetch users");
            }
        } catch (error) {
            toast.error("An error occurred while fetching users");
            console.error("Fetch users error:", error);
        }
    }

    const handleEdit = async(userData) =>{
        try {   
            console.log("ok") 
            let respone = await RouteApi.editUser(userData)
            if(respone.EC !== 0){
                return respone;
            }
            if(respone.EC === 0){
                toast.success("edit user ",userData.email," complate!")
                await fetchUser();
                return respone;
               
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleCreate = async(userData) =>{
        try {
            let response = await RouteApi.CreateUser(userData.emailorpnb, userData.password);
            console.log("respones: ", response);
            if(response && response.data.EC === 0){
                toast.success("Create new user success!");
                await fetchUser();
            }else if(response && response.data.EC === -4){
                toast.error(response.data.EM);
                return;
            }else if(response && response.data.EC === -5){
                toast.error(response.data.EM);
                return;
            }
        } catch (e) {
            console.log(e);
        }
    }


    const handleDelete =async (userID) =>{
        try {
            let response = await RouteApi.deleteUser(userID);
            
            if(response && response.data.EC === 0){
                toast.success("Delete complete!")
               await fetchUser();
               closeModal();
            } else if(response && response.data.EC === -5) {
                toast.error(response.data.EM, " You do not have role please contact with admin!");
                return;
            }else if(response && response.data.EC === -4){
                toast.error(response.data.EM );
                return;
            }
        } catch (e) {
            console.error("Delete error:", e);
        }
    }

    const handlePageClick = (event) => {
       setcrentPage(+event.selected + 1);
      };


    return (
       <div className='manage-User-Container container'>
        <ToastContainer/>
            <div className='user-container'>  
                <div className='mt-4'>
                    <button onClick={()=> window.location.reload()} className=' btn btn-success'>Refresh <i class="fa-solid fa-arrows-rotate"></i></button>
                    <button onClick={() => openModal({} , 1) } className='mx-3 btn btn-warning'>Add New  <i class="fa-solid fa-circle-plus"></i></button>
                </div>   
               <div className='User-body '>
               <table class="table table-dark table-hover mt-5">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                               users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.PassWord}</td>
                                        <td>
                                            <button onClick={()=> openModal(user, 2)} className='btn btn-warning'>
                                            <i class="fa-solid fa-pen-to-square"></i>  Edit
                                            </button>
                                            <button onClick={() => openModal(user, 3)}
                                             className='btn btn-danger mx-3'>
                                              <i class="fa-solid fa-trash"></i>  Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
               </div>
               <div className='page-paginate'>
                { pageCount &&
                    <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    />
                }
              
               </div>
            </div>
            {
               
            }
                <DeleteConfirmModal 
                    show={showModal}
                    closeModal={closeModal}
                    handleDelete={handleDelete}
                    selectedUser={selectedUser}

                />
                <EditUserModal
                    show = {showEditModal}
                    closeEditModel={closeModal}
                    selectedEditUSer={selectedUser}
                    handleEdit={handleEdit}
                 />
                 <CreateUserModal
                    show = {showCreate}
                    closeCreateModel={closeModal}
                    handleCreate={handleCreate}
                 />

       </div>
       
    )
}

export default UserHome;