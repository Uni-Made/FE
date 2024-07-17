import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
`;

const TabContainer = styled.div`
  display: flex;
  background-color: #f0f0f0;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px;
  background-color: ${(props) => (props.active ? "#b2ebf2" : "#e0e0e0")};
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #b2ebf2;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
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
        {activeTab === "details" && <div>상세정보 내용</div>}
        {activeTab === "review" && <div>리뷰 내용</div>}
        {activeTab === "qa" && <div>Q&A 내용</div>}
      </Content>
    </Container>
  );
};

export default DetailBox;
