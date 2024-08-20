import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: #ff00a5;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: ${props => (props.visible ? 'block' : 'none')};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s;
  
  &:hover {
    background-color: #e60091;
  }
`;

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const checkScrollTop = () => {
    if (!visible && window.pageYOffset > 300) {
      setVisible(true);
    } else if (visible && window.pageYOffset <= 300) {
      setVisible(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [visible]);

  return (
    <Button onClick={scrollTop} visible={visible}>
      ↑
    </Button>
  );
};

export default ScrollToTopButton;
