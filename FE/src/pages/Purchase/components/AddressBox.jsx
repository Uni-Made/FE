import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

const PostcodeWrapper = styled.div`
  width: 400px;
  height: 500px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 16px;
  background-color: #f9f9f9;
`;

const AddressDisplay = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 4px;
`;

const AddressBox = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [address, setAddress] = useState("");

  const handleComplete = (data) => {
    setAddress(data.address);
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <PostcodeWrapper>
          <DaumPostcode
            onComplete={handleComplete}
            style={{ height: "100%", width: "100%" }}
          />
        </PostcodeWrapper>
      )}
    </div>
  );
};

export default AddressBox;
