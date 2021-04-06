import React from 'react'
import './Footer.css'
function Footer() {
    return (
        <div className='footer'>
            <div className="footerTop">
                <div className="left">
                    <div className="leftItems">
                        <img src={process.env.PUBLIC_URL + './logo.png'} alt="" />
                        <p>Terms & Conditions</p>
                        <p>Privacy Policy</p>
                    </div>
                </div>
                <div className="center">
                    <div className="centerLinks">
                        <h2>Quick Links</h2>
                        <p>Book a Service</p>
                        <p>About Us</p>
                        <p>Contact Us</p>
                        <p>Upgrade to premium</p>
                    </div>
                </div>
                <div className="right">
                    <div className="rightLinks">
                        <h2>Support</h2>
                        <p>support@carsnow.com</p>
                        <p>Whatsapp Now</p>
                    </div>
                </div>
            </div>
            <div className="footerBottom">
                <p>This is a Demo Project {new Date().getFullYear()}</p>
            </div>
        </div>
    )
}

export default Footer
