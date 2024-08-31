import React from "react";
import * as S from "./NoticeBoardPage.style";
import Navbar from "../ProductList/components/Navbar";
import { useNavigate } from "react-router-dom";
import Board from "./components/Board";

function NoticeBoardPage() {
  return (
    <S.Container>
      <Navbar></Navbar>
      <S.TopHeader>Event</S.TopHeader>
      <Board></Board>
    </S.Container>
  );
}

export default NoticeBoardPage;
