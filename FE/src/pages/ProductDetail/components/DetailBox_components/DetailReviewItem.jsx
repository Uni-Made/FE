import React from "react";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Stars = styled.div`
  color: #f8d64e;
  margin-bottom: 8px;
`;

const ReviewContent = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
`;

const Option = styled.div`
  font-size: 12px;
  color: #999;
  margin-bottom: 16px;
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #666;
`;

const ReviewerAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;

const ReviewerName = styled.div`
  font-weight: bold;
`;

const ReviewDate = styled.div`
  font-size: 12px;
  color: #999;
`;

// 매개변수로 타입 받아서 일반 리뷰와 리뷰 작성 블록 구분
const DetailReviewItem = ({
  stars,
  content,
  option,
  reviewerName,
  reviewDate,
  avatar,
}) => (
  <Card>
    <Stars>{"★".repeat(stars) + "☆".repeat(5 - stars)}</Stars>
    <ReviewContent>{content}</ReviewContent>
    <Option>구매 옵션: {option}</Option>
    <ReviewerInfo>
      <ReviewerAvatar src={avatar} alt="Reviewer Avatar" />
      <div>
        <ReviewerName>{reviewerName}</ReviewerName>
        <ReviewDate>{reviewDate}</ReviewDate>
      </div>
    </ReviewerInfo>
  </Card>
);

// <ReviewCard
//   stars={1}
//   content="Review body"
//   option=""
//   reviewerName="Reviewer name"
//   reviewDate="Date"
//   avatar="path/to/avatar.jpg"
// />;

export default DetailReviewItem;
