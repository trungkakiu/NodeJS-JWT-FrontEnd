 
import React, { useState } from 'react'

const UserContext = React.createContext ({name: "", auth: false});

const UserProvider = ({ children }) => {

    const [ user, setUsers] = useState({

        isAuthenticate: false,
        token: '',
        account: {}
    })

    
    const loginContext = (userData) =>{
       
        if(userData){
            setUsers(userData);
        }else{
            console.error("Not ok!");
        }
    }

    const logoutContext = () =>{
       setUsers ((user) => ({
        isAuthenticate: false,
        token: '',
        account: {}
       }));
    }

    return (
        <UserContext.Provider value= {{user, loginContext, logoutContext}}>
            { children}
        </UserContext.Provider>
    );
}

export {UserContext, UserProvider};
