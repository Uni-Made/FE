import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// 헤더 컨테이너 스타일
const HeaderContainer = styled.header`
  background-color: #fff;
  padding: 15px; /* 좌우 패딩 추가 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* 화면의 가로 폭에 맞춤 */
  box-sizing: border-box; /* 패딩을 포함한 박스 크기 계산 */
`;

// 타이틀 스타일
const TitleLink = styled(Link)`
  font-family: 'Inspiration', cursive;
  font-size: 2.5rem; /* 40px에 해당하는 값 */
  font-weight: 400;
  background: linear-gradient(90deg, #FF0099 0%, #00DDDD 100%);
  -webkit-background-clip: text;
  color: transparent;
  margin: 0 20px; /* 간격 조정 */

  text-decoration: none; /* 링크 스타일 제거 */
  display: flex;
  align-items: center;
  height: 100%;
  min-width: max-content;

  /* 미디어 쿼리 추가 */
  @media (max-width: 1200px) {
    font-size: 2rem; /* 32px에 해당하는 값 */
    margin: 0 15px; /* 간격 조정 */
    
  }

  @media (max-width: 768px) {
    font-size: 1.5rem; 
    margin: 0 5px; /* 간격 조정 */
  }
`;

// 네비게이션 링크들을 감싸는 컨테이너 스타일
const NavLinks = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0; /* 크기가 줄어들지 않도록 설정 */
  height: 100%; /* 높이 고정 */
`;

// 링크 스타일
const NavLink = styled(Link)`
  padding: 0 15px; /* 좌우 패딩 추가 */
  text-decoration: none;
  color: #333;
  font-size: 1.3rem; /* 25px에 해당하는 값 */
  display: flex;
  align-items: center;
  height: 100%;
  &:hover {
    text-decoration: underline;
  }

  /* 미디어 쿼리 추가 */
  @media (max-width: 1200px) {
    font-size: 1.3rem;
    padding: 0 10px; /* 미디어 쿼리에 맞게 패딩 조정 */
  }

  @media (max-width: 768px) {
    font-size: 1.0rem; 
    padding: 0 5px; /* 미디어 쿼리에 맞게 패딩 조정 */
  }

  @media (max-width: 480px) {
    font-size: 0.8rem; 
    padding: 0 3px; /* 미디어 쿼리에 맞게 패딩 조정 */
  }
`;

// 검색 입력 필드 스타일
const SearchInputContainer = styled.div`
  position: relative;
  flex-grow: 1; /* 남은 공간을 차지하도록 설정 */
  margin: 10px;
  display: flex;
  align-items: center; /* 중앙 정렬 */

`;

const SearchInput = styled.input`
  padding: 0.5rem 3rem 0.5rem 1rem; /* 패딩 값 조정 */
  border-radius: 15px;
  border: 2px solid rgba(244, 244, 244, 1);
  background-color: rgba(244, 244, 244, 1);
  flex-grow: 1;
  flex-shrink: 1;
  max-width: 1500px;
  height: 45px; /* 고정된 높이 */
  font-size: 1rem; /* 폰트 사이즈 조정 */
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
      <TitleLink to="/">Uni-Made</TitleLink>
      <SearchInputContainer>
        <SearchInput type="text" />
        <SearchButton>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchButton>
      </SearchInputContainer>
      <NavLinks>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signUpSelect">Sign up</NavLink>
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
