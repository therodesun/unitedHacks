import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './MainPage.css';

const MainPage = ({ users }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    const currentCard = document.querySelector('.profile-card.active');
    currentCard.style.transform = `translateX(${direction === 'left' ? '-' : ''}100%)`;
    currentCard.style.opacity = '0';

    setTimeout(() => {
      setCurrentIndex(nextIndex);
    }, 300);
  };

  return (
    <div className="main-container">
      <div className="card-stack">
        <AnimatePresence>
          {users.slice(currentIndex, currentIndex + 2).map((user, index) => (
            <motion.div
              key={user.id}
              className={`profile-card ${index === 0 ? 'active' : 'next'}`}
              initial={{ y: index === 0 ? 0 : '100%' }}
              animate={{ y: index === 0 ? 0 : 'calc(100% - 60px)' }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} className="profile-pic" />
              <h2>{user.firstName} {user.lastName}</h2>
              <p><strong>Education:</strong> {user.education}</p>
              <p><strong>Skills:</strong> {user.skills}</p>
              <p><strong>Experience:</strong> {user.experience}</p>
              <p><strong>Location:</strong> {user.location}</p>
              <p><strong>Salary:</strong> {user.salary}</p>

              {index === 0 && (
                <div className="action-buttons">
                  <motion.button
                    className="reject"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSwipe('left')}
                  >
                    <FaTimes />
                  </motion.button>
                  <motion.button
                    className="accept"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSwipe('right')}
                  >
                    <FaCheck />
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainPage;
