import React, { useState } from "react";
import styled from "styled-components";
DetailInfoBox;
import DetailReviewBox from "./../../ProductDetail/components/DetailBox_components/DetailReviewBox";
import DetailInfoBox from "./../../ProductDetail/components/DetailBox_components/DetailInfoBox";
import QnaManageBox from "./QnaManageBox";

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
        {activeTab === "details" && <DetailInfoBox></DetailInfoBox>}
        {activeTab === "review" && <DetailReviewBox></DetailReviewBox>}
        {activeTab === "qa" && <QnaManageBox></QnaManageBox>}
      </Content>
    </Container>
  );
};

export default DetailBox;
