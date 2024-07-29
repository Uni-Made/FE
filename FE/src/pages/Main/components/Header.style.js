
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";

const Container = styled.div`
  width: 90vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5vw;
  position: relative;
  left: 3vw;
  padding-top: 10px;
`;

const LogoBox = styled.img`
  width: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const SearchBox = styled.form`
  width: 70vw;
  display: flex;
  align-items: center;
`;
const SearchBoxInput = styled.input`
  width: 90%;
  height: 40px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  background-color: #f4f4f4;
  border-radius: 30px;
  padding: 15px;
  &:focus {
    outline: none;
  }
`;
const SearchBoxButton = styled(CiSearch)`
  width: 10%;
  height: 20px;
  position: relative;
  left: -5vw;
`;

const CategoryBox = styled.div`
  width: 15vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: -7vw;
`;
const CategoryBoxItem = styled.div`
  width: 40%;
  font-size: 25px;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
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
