import React, { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import DetailReviewItem from "./DetailReviewItem";
import { defaultInstance, authInstance } from "../../../../api/axiosInstance";
import { useParams, useLocation } from "react-router-dom";

const Container = styled.div`
  margin-top: 40px;
`;
const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  margin-bottom: 20px;
`;
const HeaderLeft = styled.div`
  span {
    font-style: italic;
    color: rgba(0, 221, 221, 1);
  }
`;
const HeaderRight = styled.div`
  span {
    font-style: italic;
    color: rgba(0, 221, 221, 1);
  }
`;
const ReviewBox = styled.div``;

async function getProductReviews(productId, userType) {
  try {
    let data;
    const viewType = "REVIEW";
    if (userType == "seller") {
      data = await authInstance.get(
        `/seller/myPage/${productId}?viewType=${viewType}`
      );
    } else {
      data = await authInstance.get(
        `/buyer/product/${productId}?viewType=${viewType}`
      );
    }

    console.log(data.data.result.reviews);
    return data.data.result.reviews;
  } catch (error) {
    console.error("Error fetching product reviews:", error);
  }
}
const DetailReviewBox = forwardRef((props, ref) => {
  const [orderId, setOrderId] = useState(null);
  if (localStorage.getItem("reviewOrderId")) {
    const nowOrderId = localStorage.getItem("reviewOrderId");
    console.log(nowOrderId);
    setOrderId(nowOrderId);
    localStorage.removeItem("reviewOrderId");
  }

  const [productReviews, setProductReviews] = useState(null);
  const { productId } = useParams();
  useEffect(() => {
    async function fetchReviews() {
      const reviews = await getProductReviews(
        productId,
        localStorage.getItem("userType")
      );
      setProductReviews(reviews);
    }

    fetchReviews();
  }, [productId]);

  return (
    <Container ref={ref}>
      {productReviews != null && (
        <>
          <HeaderBox>
            <HeaderLeft>
              총 리뷰 <span>{productReviews.totalCount}</span> 건
            </HeaderLeft>
            <HeaderRight>
              평균 별점 <span>{productReviews.ratingAverage}</span> 점
            </HeaderRight>
          </HeaderBox>
          <ReviewBox>
            {productReviews.reviewsList.length === 0 && (
              <div>리뷰가 없습니다.</div>
            )}
            {productReviews.reviewsList.map((review) => {
              return (
                <DetailReviewItem
                  key={review.id}
                  stars={review.ratingStar}
                  content={review.content}
                  options={review.options}
                  reviewerName={review.buyer}
                  reviewDate={review.createdAt}
                  avatar={review.imgUrl}
                />
              );
            })}
            {orderId && <DetailReviewItem orderId={orderId}></DetailReviewItem>}
          </ReviewBox>
        </>
      )}
    </Container>
  );
});
// displayName 설정
DetailReviewBox.displayName = "DetailReviewBox";

export default DetailReviewBox;
