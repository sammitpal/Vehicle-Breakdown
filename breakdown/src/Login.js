import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import './Login.css'
import { useStateValue } from './StateProvider';
function Login() {
    const LOGIN_URL = 'http://localhost:5000/api/routes/login';
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [{ user }, dispatch] = useStateValue();
    const history = useHistory();
    const login = async (e) => {
        e.preventDefault();
        const loginData = {
            email: email,
            password: password
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        }
        const response = await fetch(LOGIN_URL, options);
        const data = await response.json();
        if (data.message === 'Success') {
            dispatch({
                type: 'SET_USER',
                user: data
            })
            history.push('/')
        }
        else {
            dispatch({
                type: 'SET_USER',
                user: null
            })
        }
        setPassword("");
        setEmail("");
    }
    useEffect(()=>{
        if(user){
            console.log(user)
            sessionCookie(user.name, user.uid)
        }
    },[user])
    function sessionCookie(name, id) {
        localStorage.setItem('name', name)
        localStorage.setItem('uid', id)
    }
    return (
        <div className='login'>
            <div className="left">
                <h1>Tagline here</h1>
            </div>
            <div className="right">
                <form>
                    <div className="inputGrp">
                        <label htmlFor="">Email</label>
                        <input type="email" name="" id="" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="inputGrp">
                        <label htmlFor="">Password</label>
                        <input type="password" name="" id="" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button variant='contained' onClick={login}>Login</Button>
                </form>
            </div>
        </div>
    )
}

export default Login
