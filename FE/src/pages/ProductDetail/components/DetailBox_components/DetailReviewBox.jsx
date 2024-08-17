import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DetailReviewItem from "./DetailReviewItem";
import { defaultInstance, authInstance } from "../../../../api/axiosInstance";
import { useParams } from "react-router-dom";

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

async function getProductReviews(productId) {
  try {
    const data = await authInstance.get(
      "/buyer/product/" + productId + "?viewType=REVIEW"
    );
    console.log(data.data.result.reviews);
    return data.data.result.reviews;
  } catch (error) {
    console.error("Error fetching product reviews:", error);
  }
}

function DetailReviewBox() {
  const [productReviews, setProductReviews] = useState(null);
  const { productId } = useParams();
  useEffect(() => {
    async function fetchReviews() {
      const reviews = await getProductReviews(productId);
      setProductReviews(reviews);
    }

    fetchReviews();
  }, [productId]);

  return (
    <Container>
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
            {productReviews.reviewsList.map((review) => {
              return (
                <DetailReviewItem
                  key={review.id}
                  stars={review.ratingStar}
                  content={review.content}
                  option={review.option}
                  reviewerName={review.buyer}
                  reviewDate={review.createdAt}
                  // avatar={review.avatar}
                />
              );
            })}
          </ReviewBox>
        </>
      )}
    </Container>
  );
}

export default DetailReviewBox;
