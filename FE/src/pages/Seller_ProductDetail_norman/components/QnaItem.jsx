import React, { useState } from "react";
import styled from "styled-components";
import { authInstance } from "./../../../api/axiosInstance";
import { useParams } from "react-router-dom";

const QnaContainer = styled.div`
  margin-bottom: 20px;
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
`;

const InputBox = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
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

const QnaItem = ({
  isWriting,
  isPrivate,
  // question,
  avatar,
  buyer,
  content,
  createdAt,
  title,
  answers,
  questionId,
}) => {
  const [myAnswer, setMyAnswer] = useState("");

  const handleSubmit = () => {
    console.log(myAnswer);
    const fetchQnaAnswer = async () => {
      if (myAnswer === "") {
        alert("내용을 입력하세요.");
        return;
      }
      const qna = await authInstance.post("/qna/answer/" + questionId, {
        content: myAnswer,
        isPrivate: isPrivate,
      });
      console.log(qna);
      alert("질문 답변 등록 완료");
      window.history.go(0);
    };
    fetchQnaAnswer();
  };

  return (
    <QnaContainer>
      <Header>{title}</Header>
      <Content>{content}</Content>
      <Author>
        <img
          src={
            "https://w7.pngwing.com/pngs/948/545/png-transparent-computer-icons-shape-user-person-scalable-graphics-shape-text-shape-symbol-thumbnail.png"
          }
          alt="author"
        />
        <div>
          <div>{buyer}</div>
          <div>{createdAt.split("T")[0]}</div>
        </div>
      </Author>
      <InputBox onChange={(e) => setMyAnswer(e.target.value)}></InputBox>
      <ButtonBox>
        <Button onClick={(e) => handleSubmit(e)}>등록</Button>
      </ButtonBox>

      {answers.length > 0 ? <Response></Response> : null}
    </QnaContainer>
  );
};

export default QnaItem;
