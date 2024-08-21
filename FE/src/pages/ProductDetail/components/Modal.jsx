import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

// 오버레이 컴포넌트 추가
const ModalOverlay = styled.div`
  display: ${(props) => (props.$show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

// 모달 컴포넌트 추가
const ModalContainer = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: white;
  /* padding: 20px 40px; */
  padding: 80px 100px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
`;

const ModalTopBox = styled.div`
  display: flex;
  height: 90%;
  flex-direction: column;
  justify-content: space-between;
`;

const TotalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 20%;
`;

const OptionTextBox = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const PriceText = styled.p`
  color: #00bfff;
  font-size: 24px;
  margin: 20px 0;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 40%;
  background-color: ${(props) => (props.primary ? "#00BFFF" : "#D3D3D3")};
  color: ${(props) => (props.primary ? "white" : "black")};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? "#008CBA" : "#b7b7b7")};
  }
`;

export default function Modal({ showModal, handleClose }) {
  const navigate = useNavigate();
  const { productId } = useParams();

  const { selectedOptions, totalPrice } = useSelector(
    (state) => state.purchase
  );

  const handleYesBtnClick = () => {
    handleClose();
    navigate("/product/" + productId + "/purchase");
  };
  return (
    <>
      <ModalOverlay show={showModal} />
      <ModalContainer show={showModal}>
        <ModalTopBox>
          <div>
            {selectedOptions.map((option, idx) => (
              <OptionTextBox key={idx}>
                <p>
                  {option.values.map((optionItem) => (
                    <>{optionItem + " "}</>
                  ))}{" "}
                </p>
                <p>{option.amount}개</p>
              </OptionTextBox>
            ))}
          </div>
          <div>
            <PriceText>총 {totalPrice}원</PriceText>
            <h3>상품을 구매하시겠습니까?</h3>
          </div>
          <ButtonContainer>
            <Button primary onClick={handleYesBtnClick}>
              예
            </Button>
            <Button onClick={handleClose}>아니오</Button>
          </ButtonContainer>
        </ModalTopBox>
      </ModalContainer>
    </>
  );
}
