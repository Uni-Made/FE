import styled from "styled-components";



const Container = styled.div`
  overflow-x: hidden; 
  width: 100%;
  max-width: 100%;
`;

const PageContainer = styled.div`
    margin: 0 auto;
    /* padding: 32px 0; */
    position: relative;
`;



const Mainp = styled.img`
//   height: 980px ;
  width: 100%;
  max-width: 100%; 
  
  
`;

const MainTextBox = styled.div`
    position: absolute;
    top: 25%;
    left: 44%;
    transform: translate ( -50% , -50% );
    font-size: 60px;
    color: #ffffff;
    text-align: center;

    @media (max-width: 1400px) {
    font-size: 50px;
    top: 25%;
    left: 42%;
  }

  @media (max-width: 900px) {
    font-size: 30px;
    top: 25s%;
    left: 40%;
  }
`;
  
const MainTextEv = styled.span`
    font-weight: 100;
`;

const MainTextMd = styled.span`
    font-weight: 700;
`;

const MadeLogo = styled.img`
    position: absolute;
    top: 35%;
    left: 37%;
    height: auto ;
    width: 30vw ;
`;

const About = styled.div`
    position: absolute;
    top: 60%;
    left: 43%;
    font-size: 70px;
    color: #ffffff;
    text-align: center;
    font-weight: 700;
    
    @media (max-width: 1400px) {
    font-size: 50px;
    left: 42%;
  }
    @media (max-width: 900px) {
    font-size: 30px;
    left: 40%;
  }
`;

const TextBox = styled.div`
    text-align: center;
    margin: 120px 0 50px 0;
    color: #000000; 
    font-weight: 500;
    font-size: 70px;
    font-weight: 600;
    /* height: 100px; */
    display: block;

    @media (max-width: 1400px) {
    font-size: 50px;
  }
    @media (max-width: 900px) {
    font-size: 30px;
  }
`;

const TextSe = styled.span`
    color: #FF0099;
`;
const TextBl = styled.span`
    color: #00DDDD;
`;
const MainGoods = styled.div`
    text-align: center;
    color: #000000; 
    font-size: 40px;
    margin: 0 0 50px 0;
    
    @media (max-width: 1400px) {
    font-size: 25px;
  }
    @media (max-width: 900px) {
    font-size: 15px;
  }
`;

const MainList = styled.div`
    color: #000000;
    text-align: center;
`;

const List = styled.div`
    text-align:center
    color: #000000;
    font-size: 40px;
    display: block;
`;

export {
    PageContainer,
    Mainp,
    MainTextBox,
    MainTextEv,
    MainTextMd,
    MadeLogo,
    About,
    TextBox,
    TextSe,
    TextBl,
    MainGoods,
    MainList,
    List,
    Container,
    

};