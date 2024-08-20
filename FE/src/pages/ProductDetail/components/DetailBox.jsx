import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DetailReviewBox from "./DetailBox_components/DetailReviewBox";
import DetailQnABox from "./DetailBox_components/DetailQnABox";
import DetailInfoBox from "./DetailBox_components/DetailInfoBox";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
`;

const TabContainer = styled.div`
  display: flex;
  background-color: #f0f0f0;
  height: 100px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px;
  background-color: ${(props) =>
    props.active ? "rgba(0, 221, 221, 1)" : "#e0e0e0"};
  color: ${(props) => (props.active ? "white" : "black")};
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 30px;
  font-weight: ${(props) => (props.active ? "600" : "none")};
  &:hover {
    background-color: #b2ebf2;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  overflow-y: auto;
`;

const DetailBox = () => {
  const [activeTab, setActiveTab] = useState("details");
  const location = useLocation();
  const reviewRef = useRef(null);

  useEffect(() => {
    const isVisited = sessionStorage.getItem("hasVisited") === "true";

    console.log(!isVisited);

    if (location.state?.from == "/api/v1/auth/buyer/test" && !isVisited) {
      setActiveTab("review");

      setTimeout(() => {
        if (reviewRef.current) {
          reviewRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);

      sessionStorage.setItem("hasVisited", "true");
    }
  }, [location.state?.from]); // location.state?.from을 의존성 배열에 추가

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("hasVisited", "false");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      sessionStorage.setItem("hasVisited", "false");
    };
  }, []);

  return (
    <Container>
      <TabContainer>
        <Tab
          active={activeTab === "details"}
          onClick={() => setActiveTab("details")}
        >
          상세정보
        </Tab>
        <Tab
          active={activeTab === "review"}
          onClick={() => setActiveTab("review")}
        >
          리뷰
        </Tab>
        <Tab active={activeTab === "qa"} onClick={() => setActiveTab("qa")}>
          Q&A
        </Tab>
      </TabContainer>
      <Content>
        {activeTab === "details" && <DetailInfoBox />}
        {activeTab === "review" && <DetailReviewBox ref={reviewRef} />}
        {activeTab === "qa" && <DetailQnABox />}
      </Content>
    </Container>
  );
};

export default DetailBox;
