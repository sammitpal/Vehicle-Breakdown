import { Avatar, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { useHistory } from 'react-router-dom';
function Navbar() {
    const history = useHistory();
    const [user, setUserName] = useState("")
    const [userid, setUserId] = useState("")
    const service = () => {
        history.push('/bookService');
    }
    const home = () => {
        history.push('/');
    }
    const login = () => {
        history.push('/login')
    }
    const logout = () => {
        localStorage.clear();
        setUserName("")
    }
    const bookings = () => {
        history.push('/bookings')
    }
    const username = localStorage.getItem('name')
    const uid = localStorage.getItem('uid')
    useEffect(() => {
        setUserName(username)
        setUserId(uid)
    }, [user, userid])
    console.log(user);
    console.log(userid);
    return (
        <div className='navbar'>
            <div className="left">
                <img src={process.env.PUBLIC_URL + './logo.png'} alt="" />
                <h3  onClick={home}>Home</h3>
                <h3>Service</h3>
                <h3>Products</h3>
                <h3 onClick={service}>Book a Service</h3>
                <h3>Pricing</h3>
            </div>
            <div className="right">
                {
                    user && <h3 onClick={bookings}>My Bookings</h3>
                }
                {
                    user ? (<Button className='loginBtn' onClick={logout}>Logout</Button>) : (<Button variant='contained' className='loginBtn' onClick={login}>Login/Register</Button>)
                }
                {
                    user ? (<Avatar src={'./broken'} alt={username} />) : (<Avatar />)
                }
            </div>
        </div>
    )
}

export default Navbar
