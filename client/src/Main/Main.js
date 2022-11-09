import React from 'react'
import { useState, useEffect } from 'react';
import { accessToken, logout } from '../spotify'

const Main = () => {
    // hook for state
    const [token, setToken] = useState(null);

    // called when mounting (?)
    useEffect(() => {
        setToken(accessToken);
    }, [])

    return (
        <div>
            {!token ? (
                <h1>Not authorized</h1>
            ) : 
            <div>
                <h1>Main</h1>
                <button type='button' onClick={logout}>logout</button>
            </div>
            }
        </div>
    );
}

export default Main;