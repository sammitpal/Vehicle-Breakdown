import './App.css';
import Banner from './Banner';
import Discover from './Discover';
import Footer from './Footer';
import Navbar from './Navbar';
import Services from './Services';
import Map from './Map';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Bookings from './Bookings';
import Login from './Login';
import { useEffect, useState } from 'react';
function App() {
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/bookService'>
            <Navbar />
            <Map />
            <Footer />
          </Route>

          <Route path='/bookings'>

            <Navbar />
            <Bookings />
            <Footer />

          </Route>
          <Route path='/'>
            <Navbar />
            <Banner />
            <Services />
            <Discover />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
