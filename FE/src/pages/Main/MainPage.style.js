import styled from "styled-components";

const PageContainer = styled.div`
    margin: 0 auto;
    /* padding: 32px 0; */
    position: relative;
    
`;

const Mainp = styled.img`
//   height: 980px ;
  width: 100%;
  
`;

const MainTextBox = styled.div`
    position: absolute;
    top: 25%;
    left: 45%;
    transform: translate ( -50% , -50% );
    font-size: 60px;
    color: #ffffff;
    text-align: center;
`;
  
const MainTextEv = styled.span`
    font-weight: 100;
`;

const MainTextMd = styled.span`
    font-weight: 700;
`;

const MadeLogo = styled.img`
    position: absolute;
    top: 33%;
    left: 38%;
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
`;

//   .explain {
//     position: absolute;
//     top: 60%;
//     left: 53%;
//     font-size: 80px;
//     color: #ffffff;
//     text-align: center;
//     font-weight: 700;
//   }
  
//   .movies-container {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//   }

  
//   .www {
//     text-align: center;
//     color: #000000; 
//     font-size: 40px;
//     margin: 0 0 50px 0;
//   }
  
//   .movie-container {
//     width: 250px;
//     margin: 16px;
//     background-color: #373b69;
//     color: white;
//     border-radius: 5px;
//     box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
//   }
  
//   .movie-container img {
//     max-width: 100%;
//   }
  
//   .movie-info {
//     display: flex;
//     padding: 20px;
//     justify-content: space-between;
//     align-items: center;
    
//   }
  
//   .movie-info h4 {
//     margin: 0;
//   }
  
//   .movie-info span {
//     margin-left: 3px;
//   }

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
};