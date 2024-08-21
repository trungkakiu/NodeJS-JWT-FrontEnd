
import React, { Children, useContext, useState } from 'react'

const UserContext = React.useContext({name: "", auth: false});

const UserProvider = ( {Children} ) =>{

    const [ user, setUsers] = useState({

        isAuthenticate: false,
        token: '',
        account: {}
    })

    const loginContext = (userData) =>{
        setUsers(userData);
    }

    const logoutContext = () =>{
       setUsers ((user) => ({
        isAuthenticate: false,
        token: '',
        account: {}
       }));
    }

    return (
        <UserContext.Provider value= {{user, loginContext, loginContext}}>
            {Children}
        </UserContext.Provider>
    );
}

export {UserContext, UserProvider};