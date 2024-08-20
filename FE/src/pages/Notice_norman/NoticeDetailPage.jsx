import React, { useEffect, useState } from "react";
import * as S from "./NoticeDetailPage.style";
import Navbar from "../ProductList/components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { authInstance } from "../../api/axiosInstance";

async function getNoticeDetail(id) {
  try {
    const responseData = await authInstance.get("/admin/notice/" + id);
    console.log(responseData);
    return responseData.data.result;
  } catch (error) {
    console.error(error);
  }
}

function NoticeDetailPage() {
  const navigate = useNavigate();
  const { noticeId } = useParams();
  const [noticeDetail, setNoticeDetail] = useState();
  console.log(noticeId, noticeDetail);

  const handleClickReturn = () => {
    navigate("/notice/board");
  };

  useEffect(() => {
    async function fetchGetNoticeDetail() {
      const noticeDetail = await getNoticeDetail(noticeId);
      console.log(noticeDetail);
      setNoticeDetail(noticeDetail);
    }

    fetchGetNoticeDetail();
  }, []);

  return (
    <S.Container>
      <Navbar />
      {noticeDetail && (
        <>
          <S.MainNoticeBox>
            <S.MainNoticeHeaderBox>
              <h2>{noticeDetail.title}</h2>
              <div>{noticeDetail.createdAt.split("T")[0]}</div>
            </S.MainNoticeHeaderBox>
            <S.MainNoticeBodyBox>{noticeDetail.content}</S.MainNoticeBodyBox>
          </S.MainNoticeBox>
          <S.ReturnButton onClick={handleClickReturn}>목록으로</S.ReturnButton>
        </>
      )}
    </S.Container>
  );
}

export default NoticeDetailPage;
