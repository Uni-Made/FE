import React, { useState } from "react";
import styled from "styled-components";
import { authInstance } from "../../../../api/axiosInstance";
import { IoStar, IoStarOutline } from "react-icons/io5";

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const CardForm = styled.form`
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

const ReviewTitleInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 5px;
`;

const ReviewContentInput = styled.input`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 5px;
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

const ReviewWritingFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 0 20px;
  color: #868686;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
  }
`;

function StarRating({ setRatingStar }) {
  console.log(setRatingStar);
  const [stars, setStars] = useState(0);

  const handleClick = (index) => {
    setStars(index + 1);
    setRatingStar(index + 1);
  };

  return (
    <div style={{ display: "inline-block" }}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          style={{ cursor: "pointer", fontSize: "24px" }}
          onClick={() => handleClick(index)}
        >
          {index < stars ? (
            <IoStar style={{ color: "rgba(0, 221, 221, 1)" }} />
          ) : (
            <IoStarOutline style={{ color: "rgba(0, 221, 221, 1)" }} />
          )}
        </span>
      ))}
    </div>
  );
}

// 매개변수로 타입 받아서 일반 리뷰와 리뷰 작성 블록 구분
const DetailReviewItem = ({
  stars,
  content,
  options,
  reviewerName,
  reviewDate,
  avatar,
  orderId,
}) => {
  console.log(
    stars,
    content,
    options,
    reviewerName,
    reviewDate,
    avatar,
    orderId
  );

  const [ratingStar, setRatingStar] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const handleFileChange = (event) => {
    setFileUrl(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // JSON 데이터 추가
    const reviewData = {
      title: e.target[0].value,
      content: e.target[1].value,
      ratingStar: ratingStar,
    };

    formData.append(
      "reviewCreateRequest",
      new Blob([JSON.stringify(reviewData)], { type: "application/json" })
    );
    formData.append("reviewImages", fileUrl);

    console.log(formData, reviewData, fileUrl);
    async function postNewReview() {
      const apiResult = await authInstance.post(
        "/buyer/review/" + orderId,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(apiResult);
      if (apiResult.status === 200) {
        alert("리뷰가 작성되었습니다.");
      } else {
        alert("리뷰 작성 실패. 다시 시도하세요.");
      }
    }
    postNewReview();
    // window.location.reload();
  };

  return orderId ? (
    <CardForm onSubmit={(e) => handleSubmit(e)}>
      <StarRating setRatingStar={setRatingStar} />
      <ReviewTitleInput placeholder="리뷰 제목을 입력하세요"></ReviewTitleInput>
      <ReviewContentInput placeholder="리뷰 내용을 입력하세요"></ReviewContentInput>
      <ReviewWritingFooter>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <Button type="submit">등록</Button>
      </ReviewWritingFooter>
    </CardForm>
  ) : (
    <Card>
      <Stars>{"★".repeat(stars) + "☆".repeat(5 - stars)}</Stars>
      <ReviewContent>{content}</ReviewContent>
      <Option>구매 옵션 : {options.join("")}</Option>
      <ReviewerInfo>
        <ReviewerAvatar src={avatar} alt="Reviewer Avatar" />
        <div>
          <ReviewerName>{reviewerName}</ReviewerName>
          <ReviewDate>{reviewDate}</ReviewDate>
        </div>
      </ReviewerInfo>
    </Card>
  );
};

export default DetailReviewItem;
