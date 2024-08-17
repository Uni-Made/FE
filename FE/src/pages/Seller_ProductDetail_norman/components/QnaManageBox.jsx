import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { authInstance } from "../../../api/axiosInstance";
import { useParams } from "react-router-dom";
import QnaItem from "./QnaItem";

const QnaContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;
const QnaTap = styled.div`
  border: 2px solid #d9d9d9;
  height: 5vh;
  font-size: 16px;
  padding: 6px;
`;

async function getProductQNA(productId) {
  const apiResponse = await authInstance.get(
    "/buyer/product/" + productId + "?viewType=QNA&pageSize=10"
  );
  return apiResponse.data.result.questions;
}

const QnaManageBox = () => {
  const { productId } = useParams();
  const [isExpanded, setIsExpanded] = useState({
    first: false,
    second: false,
  });
  const [noAnsweredQnaList, setNoAnsweredQnaList] = useState([]);
  const [answeredQnaList, setAnsweredQnaList] = useState([]);

  const handleExpandClick = (selectedTap) => {
    if (selectedTap == "first") {
      setIsExpanded((prev) => ({ ...prev, first: !prev.first }));
    } else if (selectedTap == "second") {
      setIsExpanded((prev) => ({ ...prev, second: !prev.second }));
    }
  };

  useEffect(() => {
    async function fetchQnaList() {
      const apiResponse = await getProductQNA(productId);
      const apiQnaList = apiResponse.questionsList;
      let noAnsweredList = [];
      let answeredList = [];
      apiQnaList.map((question) => {
        question.answer
          ? answeredList.push(question)
          : noAnsweredList.push(question);
      });
      console.log(noAnsweredList, answeredList);
      setNoAnsweredQnaList(noAnsweredList);
      setAnsweredQnaList(answeredList);
    }
    fetchQnaList();
  }, []);

  return (
    <QnaContainer>
      <QnaTap onClick={() => handleExpandClick("first")}>미답변</QnaTap>
      {isExpanded.first && (
        <>
          {noAnsweredQnaList.map((item) => (
            <QnaItem
              key={item.questionId}
              questionId={item.questionId}
              isPrivate={item.isPrivate}
              buyer={item.buyer}
              content={item.content}
              createdAt={item.createdAt}
              title={item.title}
              answers={item.answers}
            ></QnaItem>
          ))}
        </>
      )}
      <QnaTap onClick={() => handleExpandClick("second")}>답변완료</QnaTap>
      {isExpanded.second && (
        <div>
          {answeredQnaList.map((item) => (
            <QnaItem
              key={item.questionId}
              questionId={item.questionId}
              isPrivate={item.isPrivate}
              buyer={item.buyer}
              content={item.content}
              createdAt={item.createdAt}
              title={item.title}
              answers={item.answers}
            ></QnaItem>
          ))}
        </div>
      )}
    </QnaContainer>
  );
};

export default QnaManageBox;
