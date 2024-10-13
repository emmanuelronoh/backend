import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Signup from './components/Signup';
import Home from './components/Home';
import Contact from './components/Contact';
import Login from './components/Login';
import Help from './components/Help';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import Notes from './components/Notes';
import { toast } from 'react-toastify'; // For notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const App = () => {
    const [showCarousel, setShowCarousel] = useState(true);

    // Function to handle clicks anywhere on the page
    const handleClick = () => {
        setShowCarousel(false);
    };

    useEffect(() => {
        // Attach event listener
        document.addEventListener('click', handleClick);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    // Notify user of successful login/signup
    const notifySuccess = (message) => {
        toast.success(message);
    };

    return (
        <Router>
            <Header />
            <div className="app-container">
                <Routes>
                    <Route path='/help' element={<Help />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<Signup onSuccess={notifySuccess} />} />
                    <Route path="/login" element={<Login onSuccess={notifySuccess} />} />
                    <Route path='/blog' element={<Notes />} />
                </Routes>
                {/* Conditionally render the Swiper carousel */}
                {showCarousel && <Carousel />}
            </div>
            <Footer />
        </Router>
    );
};

export default App;
