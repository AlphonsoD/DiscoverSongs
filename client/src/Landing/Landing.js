import React from 'react';

const URL = "http://localhost:5000"

function login() {
    console.log("login function was called!");
    const url = `${URL}/login`;
    window.location.href = url;
    return;
}

// function test() {
//     console.log("test function was called!");
//     const url = `${URL}/test`;
//     const requestOptions = {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Access-Control-Allow-Origin':'*',
//             'Content-Type': 'applications/json'
//         }
//     }
//     fetch(url, requestOptions)
//     return;
// }

const Landing = () => {
    console.log(window.sessionStorage.getItem('accessToken'));

    return (
        <div>
            <h1>Discover new songs</h1>
            <button type='button' onClick={login}>Login with Spotify</button>
        </div>
    );
}

export default Landing;