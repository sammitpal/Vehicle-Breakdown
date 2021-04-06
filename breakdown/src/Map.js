import React from 'react'
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import { useEffect, useState } from 'react';
import { serviceData } from './API';
import './Map.css'
import { Button, TextField } from '@material-ui/core';
import { useStateValue } from './StateProvider'
function Map() {
  const [entries, setEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [cLat, setcLat] = useState("");
  const [cLan, setcLan] = useState("");
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [dataShop, setDataShop] = useState("")
  const SER_URL = `http://localhost:5000/services`;
  const API_URL = `http://localhost:5000/bookings`;
  useEffect(async () => {
    const response = await fetch(SER_URL);
    const serdata = await response.json();
    console.log(serdata);
  }, [])

  const submit = async (e) => {
    const uid = localStorage.getItem('uid')
    e.preventDefault();
    const formdata = {
      phone: phone,
      location: location,
      shop: dataShop,
      userID: uid
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata)
    }
    const response = await fetch(API_URL, options);
    const data = await response.json();
    console.log(data);
    localStorage.setItem('bookings',data);
    setPhone("");
    setLocation("");
    setDataShop("");
  }
  const [viewport, setViewport] = useState({
    latitude: 22.5,
    longitude: 88,
    zoom: 8,
    height: '100%',
    width: '100%'
  });


  const servicesData = async () => {
    const services = await serviceData();
    setEntries(services);
  };
  useEffect(() => {
    servicesData();
  }, [])
  const navControlStyle = {
    right: 10,
    top: 10
  };
  useEffect(() => {
    if (navigator.geolocation) {
      var options = {
        enableHighAccuracy: true,
        timeout: 1000 * 10 * 1000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition(showPosition, error, options);
    }
  }, [])


  function showPosition(position) {
    setcLat(position.coords.latitude)
    setcLan(position.coords.longitude)
  }
  function error() {
    console.log('sorry')
  }

  return (
   <div className="map">
      <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken="pk.eyJ1Ijoic2FtbWl0cGFsMjAwMCIsImEiOiJja2ZoeGF5cmUwMWY0MnRxanlhZm1wa2ZwIn0.HCs9mgxZpygzeHZbSfRXDQ"
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {
        entries.map(entry => (
          <>
            <Marker latitude={entry.lat} longitude={entry.lan} key={entry._id}>
              <div onClick={() => setShowPopup({ [entry._id]: true })}>
                <svg className='marker' viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              </div>
            </Marker>
            {showPopup[entry._id] && <Popup
              latitude={entry.lat}
              longitude={entry.lan}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup(false)}
              anchor="top" >
              <form className="box">
                <h3>{entry.sname}</h3>
                <p>{entry.owner}</p>
                <div className="form">
                  <TextField
                    value={entry.sname}
                    onFocus={(e) => setDataShop(e.target.value)}
                    variant='outlined'
                    autoFocus
                    label='Shop Name' />
                  <TextField
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    variant='outlined'
                    label='Phone Number' />
                  <TextField
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    variant='outlined'
                    label='Your Current Location' />
                  <Button type='submit' onClick={submit}>Submit</Button>
                </div>
              </form>
            </Popup>}
          </>
        ))
      }

      <Marker latitude={cLat ? (cLat) : 22} longitude={cLan ? (cLan) : 88} key={cLat}>
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="#36a420" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        <h3>You are Here</h3>
      </Marker>

      <NavigationControl style={navControlStyle} />
    </ReactMapGL>
   </div>
  )
}

export default Map
