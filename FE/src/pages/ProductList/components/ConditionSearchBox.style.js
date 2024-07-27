import styled from "styled-components";
import { CiSearch } from "react-icons/ci";

export const Container = styled.div`
  background-color: rgba(0, 221, 221, 0.1);
  border-radius: 20px;
  padding: 20px;
  width: 65vw;
  height: 35vh;
  display: flex;
`;

export const FilterSection = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SelectedArea = styled.div`
  /* flex: 1; */
  width: 100px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #24c7c4;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    background-color: #24b7c4;
  }
`;

export const Category = styled.div`
  display: flex;
`;

export const CategoryTitle = styled.div`
  color: #24c7c4;
  font-weight: bold;
  margin-bottom: 10px;
  width: 20%;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CategoryItems = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: 80%;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.selected ? "#24c7c4" : "rgba(0, 221, 221, 0.1)"};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  /* border: 1px solid #24c7c4; */
  width: 100px;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  margin-right: 10px;
  color: #24c7c4;
  font-weight: bold;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 60%;
`;

export const SearchIcon = styled(CiSearch)`
  margin-left: -30px;
  cursor: pointer;
`;

export const PriceGroup = styled(InputGroup)`
  display: flex;
  align-items: center;
`;

export const PriceInput = styled.input`
  margin: 0 10px;
  width: 30%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
