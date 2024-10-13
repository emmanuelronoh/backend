import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; // Import Swiper modules
import { styled } from '@mui/material/styles';

// Define a styled component using MUI v5
const StyledSwiperContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  height: '300px', // Adjust height as needed
  width: '100%',
  overflow: 'hidden', // Prevent overflow of images
}));

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export default function Carousel() {
  const [isVisible, setIsVisible] = useState(true);

  // Check localStorage to see if the swiper was dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('swiperDismissed');
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleButtonClick = () => {
    setIsVisible(false);
    localStorage.setItem('swiperDismissed', 'true'); // Store in localStorage
  };

  return (
    <>
      {isVisible && (
        <StyledSwiperContainer>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]} // Use the module configuration here
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
          >
            <SwiperSlide>
              <StyledImage src="https://plus.unsplash.com/premium_photo-1664300897489-fd98eee64faf?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D" alt="A beautiful landscape" />
            </SwiperSlide>
            <SwiperSlide>
              <StyledImage src="https://media.istockphoto.com/id/1699271970/photo/latin-student-studying-using-laptop-learning-language-exam-preparation-sitting-in-library.webp?b=1&s=612x612&w=0&k=20&c=oq32IYFyjBN-sJ4dBHghDICVAE84g7DKKezDyZ-cFZs=" alt="Student studying in a library" />
            </SwiperSlide>
            <SwiperSlide>
              <StyledImage src="https://media.istockphoto.com/id/135341581/photo/old-books-in-a-library-big-file.jpg?s=612x612&w=0&k=20&c=mahB12CP-VHRYQYNLV0ZQ8CTtHbIWY2qpWlQaZNUgy8=" alt="Old books in a library" />
            </SwiperSlide>
            <SwiperSlide>
              <StyledImage src="https://media.istockphoto.com/id/1498878143/photo/book-stack-and-open-book-on-the-desk-in-modern-public-library.webp?b=1&s=612x612&w=0&k=20&c=VNyPBKIS8zq_58gLSa3fnpHq1DRVvjdZHzW4fGPcIb8=" alt="Books on a desk in a library" />
            </SwiperSlide>
          </Swiper>
          <button onClick={handleButtonClick} style={{ position: 'absolute', top: '10px', right: '10px' }}>Dismiss</button>
        </StyledSwiperContainer>
      )}
    </>
  );
}
