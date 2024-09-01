import axios from 'axios';
import {  toast } from 'react-toastify';

const registerUser = async(EmailorUserName, Password) => {
    return await axios.post("http://localhost:8081/api/v1/Register", { EmailorUserName, Password })
    .then(response => {
        return response;
    })
    .catch(error => {
        console.error(error);
        toast.error("Send Registration data failed!");
    });
}

const CreateUser = async(EmailorUserName, Password) => {
    return await axios.post("http://localhost:8081/api/v1/CreateUser", { EmailorUserName, Password },{withCredentials: true})
    .then(response => {
        return response;
    })
    .catch(error => {
        console.error(error);
        toast.error("Send Registration data failed!");
    });
}


const editUser = async (userdata) =>{
    try {
        const response = await axios.put("http://localhost:8081/api/v1/Update", { userdata},   { withCredentials: true });
        const data = response.data;
        console.log("data:",data);
        return data; 
        
    } catch (error) {
        console.log("Login error: ", error);
        toast.error("An error occurred during edit.");
        throw error; 
    }
}
const loginUser = async (EmailorUserName, Password) => {
    try {
        const response = await axios.post("http://localhost:8081/api/v1/Login", 
            { EmailorUserName, Password }, { withCredentials: true }
        );
        const data = response.data;
     
        return data; 
    } catch (error) {
        console.error("Login error: ", error);
        toast.error("An error occurred during login.");
        throw error; 
    }
};

const fetchAllUser = async(page, limit)=>{
    try{
        const response = await axios.get(`http://localhost:8081/api/v1/Read?page=${page}&limit=${limit}`);
        return response; 
    }catch(e){
        console.log(e)
        toast.error("An error occurred during fetchuser");
        return;
    }
}

const takeListClasses  = async () => { // lay thong tin ve lop hoc phan cua nguoi dung
    try {
        const response = await axios.get("http://localhost:8081/api/v1/Readclasse", {
            withCredentials: true
        });
        console.log("classlist: ", response)
        return response;
    } catch (error) {
        console.log(error);
        toast.error("An error occurred during fetchuser");
        return;
    }
};

const Leckinfo = async () => { // lay thong tin ve nguoi dung co the thay the bang useContext
    try {
        const response = await axios.get("http://localhost:8081/api/v1/infomation", {
            withCredentials: true
        });
        console.log("leckinfo: ", response)
        return response;
    } catch (error) {
        console.log(error);
        toast.error("An error occurred during fetchuser");
        return;
    }
};

const deleteUser = async (userID) =>{ // Xoa nguoi dung, chi su dung truoc ban V0.0.1
    try {
        const response = await axios.delete(`http://localhost:8081/api/v1/Delete`, {
            data: { id: userID }, withCredentials: true 
        });
        return response; 
    } catch (e) {
        console.log(e);
        toast.error("An error occurred during delete user");
        return;
    }
}

const oldPasswordConfirm = async (oldpassword, userId) =>{
    try {
        const respone = await axios.post(`http://localhost:8081/api/v1/GetoldPassword`, { oldP: oldpassword, id: userId }
        );
      
        return respone.data;
    } catch (e) {
        console.error("Error in API call:", e);
        toast.error("An error occurred during validate oldpassword user");
        return;
    }
}


export default {
    loginUser, registerUser, fetchAllUser, deleteUser, editUser, oldPasswordConfirm, CreateUser,takeListClasses, Leckinfo
}