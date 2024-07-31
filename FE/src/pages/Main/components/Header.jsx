import React from "react";
import * as S from "./Header.style";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/");
  };

  const handleClickSign = () => {
    navigate("/signUpSelect");
  };

  const handleClickLogin = () => {
    navigate("/login");
  };

  return (
    <S.Container>
      <S.LogoBox src={logo} onClick={handleClickLogo}></S.LogoBox>
      <S.SearchBox>
        <S.SearchBoxInput/>
        <S.SearchBoxButton/>
      </S.SearchBox>
      <S.CategoryBox>
        <S.CategoryBoxItem onClick={handleClickLogin}>
          login
        </S.CategoryBoxItem>
        <S.CategoryBoxItem onClick={handleClickSign}>
          Sign up
        </S.CategoryBoxItem>
      </S.CategoryBox>
    </S.Container>
  );
}

export default Navbar;