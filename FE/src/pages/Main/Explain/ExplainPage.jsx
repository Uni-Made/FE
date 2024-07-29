import React from "react";
import * as S from "./ExplainPage.style";
import Header from "../components/Header"; 

function ExplainPage() {
  return (
    <S.Explain>
      <Header />
      <S.Logo src='/Uni-Made.png'alt='main'></S.Logo>
      <S.Text>
      여기서부터 설명입니다.여기서부터 설명입니다.여기서부터 설명입니다.여기서부터 설명입니다.여기서부터 설명입니다.여기서부터 설명입니다.
      </S.Text>
    </S.Explain>)
}

export default ExplainPage;