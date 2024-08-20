import React from 'react'
import {Link} from 'react-router-dom';
import * as S from "./MainPage.style";
import Header from "./components/Header"; 
import main from "../../assets/Rectangle.png";
import Carousel from "./components/carousel";


export default function Home() {
  return (
    <S.Container>
      <Header />
      <S.PageContainer>
        <S.Mainp src={main} alt='main'></S.Mainp>
        <S.MainTextBox>
          <S.MainTextEv>모두의  MD,</S.MainTextEv>
        </S.MainTextBox>
        <S.MadeLogo src='/Uni-Made.png'alt=''></S.MadeLogo>
        <Link to="/explain">
          <S.About>
            About Us {'>'}
          </S.About>
        </Link>
      </S.PageContainer>
      <S.TextBox>
        <S.TextSe>판매</S.TextSe>와 <S.TextBl>구매</S.TextBl>를 쉽게
      </S.TextBox>
      <S.MainGoods>
        <p>현재 판매 중인 다양한 굿즈들</p>
      </S.MainGoods>
      <S.MainList>
        <Carousel />
      </S.MainList>
    </S.Container>
  );
};