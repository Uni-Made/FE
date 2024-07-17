import React from "react";
import * as S from "./Navbar.style";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/");
  };

  const handleClickMypage = () => {
    // 판매자는 판매자 마이페이지로 보내야 함
    navigate("/defaultMyPage");
  };

  return (
    <S.Container>
      <S.LogoBox src={logo} onClick={handleClickLogo}></S.LogoBox>
      <S.SearchBox>
        <S.SearchBoxInput></S.SearchBoxInput>
        <S.SearchBoxButton></S.SearchBoxButton>
      </S.SearchBox>
      <S.CategoryBox>
        <S.CategoryBoxItem>Event</S.CategoryBoxItem>
        <S.CategoryBoxItem onClick={handleClickMypage}>
          Mypage
        </S.CategoryBoxItem>
      </S.CategoryBox>
    </S.Container>
  );
}

export default Navbar;
