
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";

const Container = styled.div`
  width: 100VW;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vw;
  position: relative;
  // left: 3vw;
  overflow-x: hidden; 

`;

const LogoBox = styled.img`
  width: 11vw;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const SearchBox = styled.form`
  display: flex;
  align-items: center;
`;
const SearchBoxInput = styled.input`
  width: 70vw;
  height: 50px;
  padding: 5px;
  text:36px;
  border: none;
  border-radius: 5px;
  background-color: #f4f4f4;
  border-radius: 30px;
  // padding: 15px;
  &:focus {
    outline: none;
  }
`;
const SearchBoxButton = styled(CiSearch)`
  width: 3%;
  height: 20px;
  position: relative;

  left: -3vw;
`;

const CategoryBox = styled.div`
  width: 13vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: -1vw;

  @media (max-width: 1150px) {
    width: 17vw;
    
  }
  @media (max-width: 900px) {
    width: 20vw;
    left: -2vw;

  }

  @media (max-width: 400px) {
    width: 19vw;
    

  }

`;
const CategoryBoxItem = styled.div`
  width: 18vw;
  font-size: 1rem;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }

  @media (max-width: 1400px) {
    font-size: 0.8rem;
    // margin: 0 15px; 
    width: 8vw;
    
  }

  @media (max-width: 1150px) {
    font-size: 0.7rem;
    // margin: 0 15px; 
    width: 10vw;
    
  }

  @media (max-width: 900px) {
    font-size: 0.5rem;
    // margin: 0 15px; 
    width: 15vw;
    
  }
`;

export {
  Container,
  LogoBox,
  SearchBox,
  SearchBoxInput,
  SearchBoxButton,
  CategoryBox,
  CategoryBoxItem,
};
