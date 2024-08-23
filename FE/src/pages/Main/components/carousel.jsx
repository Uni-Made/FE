import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from "./carousel.style";

const handleDragStart = (e) => e.preventDefault();

const Gallery = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);  // 로딩 상태를 관리

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://15.165.185.157:8080/buyer/product/list",
          {
            headers: {
              Accept: "application/json;charset=UTF-8",
              Authorization: `Bearer ${
                import.meta.env.VITE_WOONG_BUYER_API_KEY
              }`, // 환경 변수 사용
            },
            params: {
              sort: "FAVORITE",
              offset: 0,
              pageSize: 10, // 페이지 사이즈 설정 (로드할 데이터 수)
            },
          }
        );

        const data = response.data;
        if (data.code === 'OK') {
          setImages(data.result.productsList.slice(5, 9));  // 최대 5개의 항목만 로드
        } else {
          console.error('Error fetching data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);  // 데이터를 모두 가져오면 로딩 상태를 해제
      }
    };

    fetchData();
  }, []);

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  if (loading) {
    return <div>Loading...</div>;  // 로딩 중일 때 표시할 내용
  }

  const items = images.map((item) => (
    <S.CarouselDescription
      key={item.productId}
      // onClick={() => navigate(`/${item.name}`)}
    >
      <S.Imgs
        alt={item.name}
        src={item.imgUrl}
        onDragStart={handleDragStart}
        role="presentation"
      />
    </S.CarouselDescription>
  ));

  return (
    <S.Top>
      <AliceCarousel
        mouseTracking
        infinite={true}
        animationDuration={1000}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
        paddingRight={40}
      />
    </S.Top>
  );
};

export default Gallery;
