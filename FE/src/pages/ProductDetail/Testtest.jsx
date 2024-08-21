import React from "react";
import { useNavigate } from "react-router-dom";

function Testtest() {
  const navigate = useNavigate();
  const alarm = {
    title: "리뷰 작성 알림",
    content: { orderId: "152" },
  };
  return (
    <div>
      <button
        onClick={() => {
          localStorage.setItem("reviewOrderId", alarm.content.orderId);
          navigate("/product/17");
        }}
      >
        알림보내기
      </button>
    </div>
  );
}

export default Testtest;
