import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './Bookings.css'
function Bookings() {
    const [bookings, setBookings] = useState([]);
    const history = useHistory();
    const [username, setUserName] = useState("");
    useEffect(() => {
        setUserName(localStorage.getItem('name'));
    }, [])

    

    const uid = localStorage.getItem('uid');
    const API_URL = `http://localhost:5000/bookings/${uid}`;

    useEffect(async () => {
        if (uid) {
            const response = await fetch(API_URL);
            const data = await response.json();
            setBookings(data);
        }
        else {
            setBookings([]);
        }
    }, [uid])
    console.log(bookings)
    return (
        <div className='bookings'>
            {
                username && (
                    bookings.map(booking => (
                        <div className="card" key={booking._id}>
                            <h3>{booking.shopname}</h3>
                            <p>{booking.location}</p>
                            <p className='booking_date'>Date: {new Date(booking.date).toLocaleString()}</p>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Bookings
