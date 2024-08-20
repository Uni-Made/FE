import styled from 'styled-components';
import { CiMail, CiLock , CiRead, CiUnread } from "react-icons/ci";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%
  max-width: 700px;
  margin:0 auto;
`;
export const InputWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  
  `;

export const LogoIcon = styled.img`
  display: flex;
  align-items: center;
  margin: 40px 0 10vh 0;
  height: auto ;
  width: 25vw ;

`;
export const form = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 13vh;
  align-items: center;
`;

export const InputSum = styled.div`
  width: 50vw;
  height: 9vh;
  padding: 12px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  line-height: 55px;
  margin: 10px;
  position: relative;
  align-items: center;
  display:flex;
`;

export const Input = styled.input`
  position: relative;
  width: 45vw;
  border: none;
  background-color: #f0f0f0;
  border-radius: 25%;
  font-size: 1.5rem;
  line-height: 45px;
  margin-left: 1vw;
  outline: none;
  align-items: center;
`;

export const Emailimg = styled(CiMail)`
  width: 2vw;
  height: 5vh;
  position: relative;
  display: flex;
  
`;

export const PassWord = styled(CiLock)`
  width: 2vw;
  height: 5vh;
  position: relative;
  display: flex;
 
`;


export const Look = styled(CiRead)`
  width: 2vw;
  height: 5vh;
  position: relative;
  display: flex;
`;

export const NonLook = styled(CiUnread)`
  width: 2vw;
  height: 5vh;
  position: relative;
  display: flex;
`;

export const LookBox = styled.div`
  width: 2vw;
  height: 5vh;
  position: absolute;
  right: 10px; 
  cursor: pointer;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  justify-content: flex-start;
  margin-left: 9%;
`;

export const CheckboxLabel = styled.label`
  font-size: 1.1rem;
  white-space: nowrap;
`;

export const FindPass = styled.div`
  font-size: 1.1rem;
//   white-space: nowrap;
  text-align :left;
  margin: 0 0 0 28vw;
`;

export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  width: 1.5vw;
  height: 3vh;
  cursor: pointer;
`;

export const BoxContainer = styled.div`
  border: none;
  width: 50vw;
  // height: 10vh;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  display: flex;
  
  }
`;

export const Sin = styled.button`
  background-color: #DDDDDD;
  color: black;
  border: none;
  border-radius: 5px;
  font-size: 2.6rem;
  width: 50vw;
  height: 9vh;
  font-weight: bold;
  cursor: pointer;
  margin: 30px 0 0 0;
  
  
  
  &:hover {
    background-color: #000000;
    color: white;
  }
`;

export const SoLogInContainer = styled.div`
// //   width: 35vw;
//   display: flex;
  justify-content: space-around;
  margin: 20px 0;
  
`;

export const SocialButtonK = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  // margin-top:150px;
  background-color: #FEE500;
  color: black;
  border: none;
  border-radius: 10px;
  font-size: 2.6rem;
  width: 40vw;
  height: 11vh;
  font-weight: bold;
  cursor: pointer;
  margin: 30px 0 0 0;

  img {
    width: 60px;
    height: 60px;
    margin:20px;
    margin-left:100px;
     margin-right:50px;
  }
`;

export const SocialButtonN = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  // margin-top:150px;
  background-color: #00C73C;
  color: black;
  border: none;
  border-radius: 10px;
  font-size: 2.6rem;
  width: 40vw;
  height: 11vh;
  font-weight: bold;
  cursor: pointer;
  margin: 30px 0 0 0;

  img {
    width: 60px;
    height: 60px;
    margin:20px;
    margin-left:100px;
     margin-right:50px;
  }
`;

export const SocialButtonG = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  // margin-top:150px;
  background-color: #E6E6E6;
  color: black;
  border: none;
  border-radius: 10px;
  font-size: 2.6rem;
  width: 40vw;
  height: 11vh;
  font-weight: bold;
  cursor: pointer;
  margin: 30px 0 0 0;

  img {
    width: 60px;
    height: 60px;
    margin:20px;
    margin-left:100px;
     margin-right:50px;
  }

`;