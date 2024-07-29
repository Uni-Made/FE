import styled from "styled-components";

const Container = styled.div`
    margin: 0 auto;
    height: 200px
    /* padding: 32px 0; */
    position: relative;
    
`;

const Logo = styled.img`
    position: absolute;
    top: 15%;
    left: 40%;
    height: auto ;
    width: 20vw ;
    
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
    Container,
    Logo,
    Text,
};