import React from "react";
import * as S from "./NoticeDetailPage.style";
import Navbar from "../ProductList/components/Navbar";
import { useNavigate } from "react-router-dom";

function NoticeDetailPage() {
  const navigate = useNavigate();
  const handleClickReturn = () => {
    navigate("/notice/board");
  };
  return (
    <S.Container>
      <Navbar />
      <S.MainNoticeBox>
        <S.MainNoticeHeaderBox>
          <h2>제목입니다 제목입니다</h2>
          <div>24/7/14</div>
        </S.MainNoticeHeaderBox>
        <S.MainNoticeBodyBox>내용</S.MainNoticeBodyBox>
      </S.MainNoticeBox>
      <S.ReturnButton onClick={handleClickReturn}>목록으로</S.ReturnButton>
    </S.Container>
  );
}

export default NoticeDetailPage;
