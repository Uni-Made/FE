// import React from "react";
// import * as S from "./Navbar.style";
// import logo from "../../../assets/logo.png";
// import { useNavigate } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// 헤더 컨테이너 스타일
const HeaderContainer = styled.header`
  background-color: #fff;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`;

// 타이틀 스타일
const TitleLink = styled(Link)`
  font-family: "Inspiration", cursive;
  font-size: 2.5rem;
  font-weight: 400;
  background: linear-gradient(90deg, #ff0099 0%, #00dddd 100%);
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

// 네비게이션 링크들을 감싸는 컨테이너 스타일
const NavLinks = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 100%;
`;

// 링크 스타일
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

  /* 미디어 쿼리 추가 */
  @media (max-width: 1200px) {
    font-size: 1.25rem;
    padding: 0 10px;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 5px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0 3px;
  }
`;

// 검색 입력 필드 스타일
const SearchInputContainer = styled.div`
  position: relative;
  flex-grow: 1; /* 남은 공간을 차지하도록 설정 */
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

// function Navbar() {
//   const navigate = useNavigate();

//   const handleClickLogo = () => {
//     navigate("/");
//   };

//   const handleClickMypage = () => {
//     // 판매자는 판매자 마이페이지로 보내야 함
//     navigate("/defaultMyPage");
//   };

//   return (
//     <S.Container>
//       <S.LogoBox src={logo} onClick={handleClickLogo}></S.LogoBox>
//       <S.SearchBox>
//         <S.SearchBoxInput></S.SearchBoxInput>
//         <S.SearchBoxButton></S.SearchBoxButton>
//       </S.SearchBox>
//       <S.CategoryBox>
//         <S.CategoryBoxItem>Event</S.CategoryBoxItem>
//         <S.CategoryBoxItem onClick={handleClickMypage}>
//           Mypage
//         </S.CategoryBoxItem>
//       </S.CategoryBox>
//     </S.Container>
//   );
// }

// export default Navbar;
const Navbar = (type) => {
  return type == "logout" ? (
    <HeaderContainer>
      <TitleLink to="/"> Uni-Made </TitleLink>
      <SearchInputContainer>
        <SearchInput type="text" />
        <SearchButton>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchButton>
      </SearchInputContainer>
      <NavLinks>
        <NavLink to="/loginSelect">Login</NavLink>
        <NavLink to="/signUpSelect">Sign up</NavLink>
      </NavLinks>
    </HeaderContainer>
  ) : (
    <HeaderContainer>
      <TitleLink to="/"> Uni-Made </TitleLink>
      <SearchInputContainer>
        <SearchInput type="text" />
        <SearchButton>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchButton>
      </SearchInputContainer>
      <NavLinks>
        <NavLink to="/notice/board">Event</NavLink>
        <NavLink to="/defaultMyPage">My Page</NavLink>
        <NavLink to="/">Logout</NavLink>
      </NavLinks>
    </HeaderContainer>
  );
};

export default Navbar;
