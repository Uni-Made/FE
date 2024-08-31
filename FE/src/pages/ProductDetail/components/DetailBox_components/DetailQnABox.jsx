import React, { useEffect, useState } from "react";
import { defaultInstance, authInstance } from "../../../../api/axiosInstance";
import { useParams } from "react-router-dom";
import DetailReviewItem from "./DetailReviewItem";
import DetailQnAItem from "./DetailQnAItem";
import styled from "styled-components";

const Container = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
`;

async function getProductQnA(productId) {
  try {
    const data = await authInstance.get(
      "/buyer/product/" + productId + "?viewType=QNA"
    );
    console.log(data.data.result.questions);
    return data.data.result.questions;
  } catch (error) {
    console.error("Error fetching product : questions", error);
  }
}

function DetailQnABox() {
  const [productQnA, setProductQnA] = useState(null);
  const { productId } = useParams();
  useEffect(() => {
    async function fetchQnA() {
      const QnA = await getProductQnA(productId);
      console.log(QnA);
      setProductQnA(QnA.questionsList);
    }

    fetchQnA();
  }, [productId]);
  return (
    <Container>
      <DetailQnAItem isWriting={true}></DetailQnAItem>
      {productQnA &&
        productQnA.map((question) => (
          <DetailQnAItem
            key={question.questionId}
            isWriting={false}
            // question={question}
            isPrivate={question.isPrivate}
            // avatar= {}
            buyer={question.buyer}
            content={question.content}
            createdAt={question.createdAt}
            title={question.title}
            answers={question.answers}
          />
        ))}
    </Container>
  );
}

export default DetailQnABox;
