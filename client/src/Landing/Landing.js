import React from 'react';
import { useEffect } from 'react';
import '../styles.css'

// Bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from  'react-bootstrap';

//const URL = "http://localhost:5000"

const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : 'https://ad-discoversongs.herokuapp.com';

function login() {
    console.log("login function was called!");
    const url = `${LOGIN_URI}/login`;
    window.location.href = url;
    return;
}

const Landing = () => {
    console.log(window.sessionStorage.getItem('accessToken'));

    return (
        <div className='center'>
            <Container className='my-auto text-center'>
                <h1>Discover New Songs</h1>
                <button type='button' onClick={login}>Login with Spotify</button>
            </Container>
        </div>
        
    );
}

export default Landing;