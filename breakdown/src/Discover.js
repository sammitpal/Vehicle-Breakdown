import React from 'react'
import './Discover.css';
const data =  require('./states.json'); 
function Discover() {
    console.log(data)
    return (
        <div className='discover'>
            <h1>Discover <span>CarsNow</span> all over India</h1>
            <div className="statesBlock">
            {
                data.map(mData => (
                    <p key={mData?.name}>{mData?.name}</p>
                ))
            }
            </div>
        </div>
    )
}

export default Discover
