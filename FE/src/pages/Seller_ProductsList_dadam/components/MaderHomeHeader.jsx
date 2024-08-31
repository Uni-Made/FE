import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const HeaderContainer = styled.header`
  background-color: #fff;
  padding: 15px; 
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; 
  box-sizing: border-box;
`;


const TitleLink = styled(Link)`
  font-family: 'Inspiration', cursive;
  font-size: 2.5rem;
  font-weight: 400;
  background: linear-gradient(90deg, #FF0099 0%, #00DDDD 100%);
  -webkit-background-clip: text;
  color: transparent;
  margin: 0 20px; 

  text-decoration: none;
  display: flex;
  align-items: center;
  height: 100%;
  min-width: max-content;

  @media (max-width: 1200px) {
    font-size: 2rem;
    margin: 0 15px; 
    
  }

  @media (max-width: 768px) {
    font-size: 1.5rem; 
    margin: 0 5px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 100%; 
`;


const NavLink = styled(Link)`
  padding: 0 15px; 
  text-decoration: none;
  color: #333;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  height: 100%;
  &:hover {
    text-decoration: underline;
  }


  @media (max-width: 1200px) {
    font-size: 1.25rem;
    padding: 0 10px;
  }

  @media (max-width: 768px) {
    font-size: 1.0rem; 
    padding: 0 5px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem; 
    padding: 0 3px;
  }
`;


const SearchInputContainer = styled.div`
  position: relative;
  flex-grow: 1; 
  margin: 10px;
  display: flex;
  align-items: center;

`;

const SearchInput = styled.input`
  padding: 0.5rem 3rem 0.5rem 1rem;
  border-radius: 15px;
  border: 2px solid rgba(244, 244, 244, 1);
  background-color: rgba(244, 244, 244, 1);
  flex-grow: 1;
  flex-shrink: 1;
  max-width: 1500px;
  height: 45px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: rgba(244, 244, 244, 1);
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  font-size: 20px;
  color: rgba(134, 134, 134, 1);
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <TitleLink to="/"> Uni-Made </TitleLink>
      <SearchInputContainer>
        <SearchInput type="text" />
        <SearchButton>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchButton>
      </SearchInputContainer>
      <NavLinks>
        <NavLink to="/maderMyPage/purchase/requests">Event</NavLink>
        <NavLink to="/maderMyPage">My Page</NavLink>
        <NavLink to="/">Logout</NavLink>
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
