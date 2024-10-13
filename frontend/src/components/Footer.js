import React from 'react';
import './Footer.css'; // Ensure you have a corresponding CSS file for styling
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IoMail, IoPhonePortrait, IoLocation } from 'react-icons/io5';

function Footer() {
    // Function to handle subscribe button click
    const handleSubscribeClick = (event) => {
        event.preventDefault(); // Prevent form submission
        alert('Thank you for subscribing!');
    };

    return (
        <section className="footer">
            <div className="box-container">
                <div className="box">
                    <h3>Note taking app<i className=""></i></h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam, corporis?</p>
                    <div className="share">
                        <a href="https://www.facebook.com/login" className="fab fa-facebook-f" target="_blank" rel="noopener noreferrer" title="Login with Facebook">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com/login" className="fab fa-twitter" target="_blank" rel="noopener noreferrer" title="Login with Twitter">
                            <FaTwitter />
                        </a>
                        <a href="https://www.instagram.com/accounts/login/" className="fab fa-instagram" id="inst"target="_blank" rel="noopener noreferrer" title="Login with Instagram">
                            <FaInstagram />
                        </a>
                        <a href="https://www.linkedin.com/login" className="fab fa-linkedin" target="_blank" rel="noopener noreferrer" title="Login with LinkedIn">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
                <div className="box">
                    <h3>Contact Info</h3>
                    <a href="tel:+254724749550" className="links">
                        <IoPhonePortrait /> +254-712-345-678
                    </a>
                    <a href="mailto:support.note@gmail.com?subject=Inquiry%20Regarding%20Products&body=Hello%2C%20I%20would%20like%20more%20information%20about%20your%20products.%20Thank%20you." className="links">
                        <IoMail /> Email Us
                    </a>
                    <a href="https://www.google.com/maps/place/Nairobi,+Kenya" className="links" target="_blank" rel="noopener noreferrer">
                        <IoLocation /> Nairobi, Kenya
                    </a>
                </div>
                <div className="box">
                    <h3>Newsletter</h3>
                    <p>Subscribe for the latest updates</p>
                    <form onSubmit={handleSubscribeClick}>
                        <input type="email" name="email" className="email" placeholder="Your email" />
                        <input type="submit" value="Subscribe" className="btn" />
                    </form>
                </div>
            </div>
            <div className="credit">
                Created by <span>Note taking app members</span> | All rights reserved
            </div>
        </section>
    );
}

export default Footer;
