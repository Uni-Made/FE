
// export default SortingDropdown;
import React from 'react';
import styled from 'styled-components';

// 드롭다운 컨테이너 스타일
const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

// 드롭다운 스타일
const Dropdown = styled.select`
  font-size: 16px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #ff00a5;
  }
`;

// 옵션 스타일
const Option = styled.option`
  font-size: 16px;
`;

const SortingDropdown = ({ onSortChange }) => {
  return (
    <DropdownContainer>
      <Dropdown onChange={(e) => onSortChange(e.target.value)}>
        <Option value="popularity">인기순</Option>
        <Option value="latest">최신순</Option>
        <Option value="deadline">마감순</Option>
      </Dropdown>
    </DropdownContainer>
  );
};

export default SortingDropdown;
