import styled from "styled-components";

const Explain = styled.div`
    margin: 0 auto;
    height: 200px
    /* padding: 32px 0; */
    position: relative;
    
`;

const Logo = styled.img`
    position: absolute;
    top: 25%;
    left: 38%;
    height: auto ;
    width: 30vw ;
    
`;

const Text = styled.div`
    position: absolute;
    font-weight: 500;
    top: 55%;
    left: 36%;
    font-size: 60px;
    width: 35vw ;
    color: #D9D9D9;
    
`;

export {
    Logo,
    Explain,
    Text,
};