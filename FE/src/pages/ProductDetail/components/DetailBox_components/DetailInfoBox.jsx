import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";
import styled from "styled-components";

if (typeof Promise.withResolvers === "undefined") {
  if (window)
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    window.Promise.withResolvers = function () {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`;

function DetailInfoBox() {
  const { selectedProduct } = useSelector((state) => state.purchase);
  const detailImageUrl = selectedProduct?.detail?.detailImages?.[0];

  // 파일 확장자 추출
  const getFileExtension = (url) => {
    return url?.split(".").pop().toLowerCase();
  };

  // 파일이 PDF인지 확인
  const isPdf = (url) => {
    const ext = getFileExtension(url);
    return ext === "pdf";
  };

  // 파일이 이미지인지 확인
  const isImage = (url) => {
    const ext = getFileExtension(url);
    return ["jpg", "jpeg", "png", "webp"].includes(ext);
  };

  return (
    <Container style={{ height: "100%" }}>
      {detailImageUrl ? (
        isPdf(detailImageUrl) ? (
          <Worker
            workerUrl={
              "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"
            }
          >
            <Viewer fileUrl={detailImageUrl} />
          </Worker>
        ) : isImage(detailImageUrl) ? (
          <img
            src={detailImageUrl}
            alt="Detail Image"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        ) : (
          <div>상세정보 이미지가 없습니다.</div>
        )
      ) : (
        <div>상세정보 이미지가 없습니다.</div>
      )}
    </Container>
  );
}

export default DetailInfoBox;
