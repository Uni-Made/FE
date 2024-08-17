import React, { useState } from "react";
import styled from "styled-components";
import { authInstance } from "../../../../api/axiosInstance";
import { useParams } from "react-router-dom";

const QnaContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Content = styled.div`
  margin-bottom: 10px;
  white-space: pre-wrap;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;

  img {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

const Response = styled.div`
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  white-space: pre-wrap;
  height: 120px;
  overflow-y: auto;
`;

const PrivateNote = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const InputBox = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const MyQNAFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-top: 10px; */
`;
const PrivateBox = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  padding: 8px 20px;
  color: #868686;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
  }
`;

const PrivateInput = styled.input`
  width: 40px;
  height: 18px;
`;

const DetailQnAItem = ({
  isWriting,
  isPrivate,
  // question,
  avatar,
  buyer,
  content,
  createdAt,
  title,
  answers,
}) => {
  const [myQuestion, setMyQuestion] = useState({
    title: "",
    content: "",
    isPrivate: false,
  });
  const { productId } = useParams();

  const handleSubmit = () => {
    console.log(myQuestion);
    const fetchQnASubmit = async () => {
      if (myQuestion.title === "") {
        alert("제목을 입력하세요.");
        return;
      }
      if (myQuestion.content === "") {
        alert("내용을 입력하세요.");
        return;
      }
      const qna = await authInstance.post(
        "/qna/question/" + productId,
        myQuestion
      );
      console.log(qna);
      alert("질문 등록 완료");
      window.history.go(0);
    };
    fetchQnASubmit();
  };

  return (
    <QnaContainer>
      {isWriting ? (
        <>
          <TitleInput
            defaultValue={(e) => e.target.value}
            onChange={(e) =>
              setMyQuestion((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
            placeholder="제목을 입력하세요."
          ></TitleInput>
          <InputBox
            defaultValue={(e) => e.target.value}
            onChange={(e) =>
              setMyQuestion((prevState) => ({
                ...prevState,
                content: e.target.value,
              }))
            }
            placeholder="내용을 입력하세요."
          />
          <MyQNAFooter>
            <PrivateBox>
              <PrivateInput
                type="checkbox"
                checked={myQuestion.isPrivate}
                onChange={(e) =>
                  setMyQuestion((prevState) => ({
                    ...prevState,
                    isPrivate: e.target.checked,
                  }))
                }
              ></PrivateInput>
              <p>비공개</p>
            </PrivateBox>
            <Button onClick={() => handleSubmit()}>등록</Button>
          </MyQNAFooter>
        </>
      ) : (
        <>
          {isPrivate ? (
            <>
              <Header>{title}</Header>
              <div>작성자와 판매자만 볼 수 있는 문의입니다.</div>
            </>
          ) : (
            <>
              <Header>{title}</Header>
              <Content>{content}</Content>
              <Author>
                <img src={avatar} alt="author" />
                <div>
                  <div>{buyer}</div>
                  <div>{createdAt.split("T")[0]}</div>
                </div>
              </Author>
              {answers[0] && <Response>{answers[0].content}</Response>}
            </>
          )}
        </>
      )}
    </QnaContainer>
  );
};

export default DetailQnAItem;
