import React, { useState, useEffect, useRef } from 'react';
import { authInstance } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Header from '../ProductList/components/Navbar';
import {
  CONTAINER,
  FORM,
  SECTION,
  PRODUCT_NAME,
  INPUT_CONTAINER,
  INPUT,
  INPUT_DATE,
  INPUT_PRICE,
  INPUT_UNIV_NAME,
  INPUT_ACCOUNT_HOLDER,
  INPUT_ACCOUNT_NUMBER,
  IMAGE_UPLOAD_SECTION,
  MAIN_IMAGE_CONTAINER,
  PLACEHOLDER_IMAGE,
  IMAGE_UPLOAD_BUTTON,
  SMALL_IMAGE_CONTAINER,
  SMALL_IMAGE_PREVIEW,
  OPTIONS_SECTION,
  OPTION_GROUP,
  OPTION_INPUT,
  ADD_OPTION_BUTTON,
  ADD_FULL_OPTION_BUTTON,
  SUBMIT_BUTTON,
  IMAGE_OVERLAY_TEXT,
  LABEL,
  SELECT,
  SELECT_BANK,
  ONLINE_BUTTON,
  OFFLINE_BUTTON,
  ACCOUNT_SECTION,
  ACCOUNT_INPUT,
  OPTION_INPUT_WRAPPER,
  OPTION_TITLE,
  LARGE_IMAGE_CONTAINER,
  PDF_UPLOAD_BUTTON,
  INPUT_ROW,
  ROUND_BUTTON,
  PRODUCT_NAME_INPUT,
} from './ProductRegistration.style';
import { useParams } from 'react-router-dom';

// 커스텀 화살표 컴포넌트
const NextArrow = ({ onClick }) => {
  return (
    <div
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundImage: 'url(https://cdn-icons-png.flaticon.com/512/9931/9931027.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundImage: 'url(https://cdn-icons-png.flaticon.com/512/9931/9931024.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
};

async function getProductDetails(productId, cursor, pageSize) {
  try {
    const response = await authInstance.get(`/seller/myPage/${productId}?viewType=DETAIL&cursor=${cursor}&pageSize=${pageSize}`);

    console.log("API response data:", response.data);

    if (response.data && response.data.result) {
      const productData = response.data.result;
      
      // productImages가 null이면 빈 배열로 설정
      productData.productImages = productData.productImages || [];

      return productData;  // 응답의 result 객체를 반환
    } else {
      console.error("Unexpected response structure or empty result:", response.data);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error fetching product details:", error.response ? error.response.data : error.message);
    throw error;
  }
}

async function updateProductDetails(productId, data, images = [], pdfImage) {
  try {
    const formData = new FormData();
    
    // JSON 데이터를 문자열로 직렬화하여 추가
    formData.append('updateProductDto', JSON.stringify(data));

    // 이미지 파일 추가 (File 객체인 경우에만)
    images.forEach((image) => {
      if (image instanceof File) {
        formData.append('productImages', image);
      } else if (typeof image === 'string') {
        // URL인 경우 URL도 함께 추가 (백엔드에서 처리할 수 있을 때)
        formData.append('productImageUrl', image); 
      }
    });

    // PDF 이미지 파일 추가 (File 객체인 경우에만)
    if (pdfImage instanceof File) {
      formData.append('detailImage', pdfImage);
    }

    console.log("콘솔창이다", productId, data, images, pdfImage);

    // 서버에 PATCH 요청
    const response = await authInstance.patch(`/seller/product/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Product updated successfully', response.data);
  } catch (error) {
    console.error("Error updating product:", error.response ? error.response.data : error.message);
    throw error;
  }
}


//-----------------------API

const ProductModifyPage = () => {
  const [product, setProduct] = useState({
    productName: '',
    deadline: '',
    price: '',
    categoryId: 1,
    university: '',
    bankName: '',
  });
  const [images, setImages] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [pdfImage, setPdfImage] = useState(null);
  const [pickupOptions, setPickupOptions] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [accountName, setAccountName] = useState(null);
  const [accountNumber, setAccountNumber] = useState(null);

  const { productId } = useParams();
  const navigate = useNavigate(); // useNavigate 훅 사용


  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productData = await getProductDetails(productId, 1, 10);
  
        if (!productData) {
          throw new Error("No product data received");
        }
  
        console.log("Product data received:", productData);
  
        // 상태 업데이트
        setProduct({
          productName: productData.productName,
          deadline: productData.deadline,
          price: productData.price,
          categoryId: productData.categoryId,
          university: productData.university,
          bankName: productData.bankName,
          accountName: productData.accountName,
          accountNumber: productData.accountNumber
        });
  
        setImages(productData.productImages || []);
        setMainImage(productData.productImages[0]);
        setOptions(productData.options || []);
        setPickupOptions([productData.pickupOption]);
        setPdfImage(productData.detail.detailImages[0]);
  
      } catch (error) {
        console.error('Error loading product details:', error);
        setError('Error loading product details');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProductDetails();
  }, [productId]);
  
  // 이미지 업로드 핸들러
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    setImages([...images, ...files]);

    if (!mainImage && files.length > 0) {
      setMainImage(URL.createObjectURL(files[0]));
    }
  };

  // 메인 이미지 변경 핸들러
  const handleMainImageChange = (index) => {
    const image = images[index];
    if (image instanceof File) {
      setMainImage(URL.createObjectURL(image));
    } else {
      setMainImage(image); // URL일 경우 그대로 사용
    }
    setCurrentSlide(index);
  }

  // PDF 이미지 미리보기 처리
  const handleDetailImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfImage(file);
    }
  };

  const nextSlide = () => {
    if (currentSlide < images.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setMainImage(URL.createObjectURL(images[currentSlide + 1]));
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setMainImage(URL.createObjectURL(images[currentSlide - 1]));
    }
  };

  const handleAddOptionValue = (index) => {
    const newOptions = [...options];
    if (!newOptions[index].optionValues) {
      newOptions[index].optionValues = [];
    }
    newOptions[index].optionValues.push({ value: '', valueId: null });
    setOptions(newOptions);
  };

  const handleOptionValueChange = (optionIndex, valueIndex, value) => {
    const newOptions = [...options];
    newOptions[optionIndex].optionValues[valueIndex].value = value;
    setOptions(newOptions);
  };

  const handleOptionTitleChange = (index, newTitle) => {
    const updatedOptions = [...options];
    updatedOptions[index].optionCategory = newTitle;
    setOptions(updatedOptions);
  };
  
  const handleRemoveOptionValue = (optionIndex, valueIndex) => {
    const newOptions = [...options];
    newOptions[optionIndex].optionValues.splice(valueIndex, 1);
    setOptions(newOptions);
  };

  const handleAddOptionGroup = () => {
    const newOptionCategory = `옵션${options.length + 1}`;
    setOptions([
      ...options,
      { optionCategory: newOptionCategory, optionValues: [{ value: '' }] },
    ]);
  };

  const handleRemoveOptionGroup = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handlePickupOptionChange = (option) => {
    let updatedOptions;
    if (option === "ONLINE") {
      updatedOptions = ["ONLINE"];
    } else {
      updatedOptions = ["OFFLINE"];
    }
    setPickupOptions(updatedOptions);
    const updatedProductData = {
      ...product,
      pickupOption: updatedOptions.join(',')
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value, 10);
    setProduct(prevState => ({
      ...prevState,
      categoryId: categoryId
    }));
  };

  const handleBankNameChange = (e) => {
    const bankName = e.target.value;
    setProduct(prevState => ({
      ...prevState,
      bankName: bankName
    }));
  };

  const handleAccountNumberChange = (e) => {
    const accountNumber = e.target.value;
    setProduct(prevState => ({
      ...prevState,
      accountNumber: accountNumber
    }));
  };

  const handleAccountNameChange = (e) => {
    const accountName = e.target.value;
    setProduct(prevState => ({
      ...prevState,
      accountName: accountName
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // options 배열을 options 형식으로 변환
      const optionsData = options.map((option) => ({
        name: option.optionCategory,
        values: option.optionValues.map(valueObj => valueObj.value)
      }));
  
      const updatedProductData = {
        bankName: product.bankName,
        price: parseFloat(product.price),
        pickupDate: '', // 예를 들어, 픽업 날짜를 추가하려면 여기에 값 설정
        name: product.productName,
        university: product.university,
        pickupOption: pickupOptions.join(','),
        pickupLocation: '', // 픽업 위치를 설정하려면 여기에 값 설정
        status: 'SELLING', // 상태는 상황에 맞게 변경
        registerStatus: 'PENDING', // 등록 상태는 상황에 맞게 변경
        accountNumber: product.accountNumber,
        accountName: product.accountName,
        deadline: product.deadline,
        content: '', // 제품 설명이나 내용을 여기에 설정
        categoryId: product.categoryId,
        options: optionsData
      };
  
      await updateProductDetails(productId, updatedProductData, images, pdfImage);
      
      alert('수정이 완료되었습니다.'); // 수정 완료 메시지

      // 확인 버튼을 누르면 특정 페이지로 이동
      navigate(`/maderMyPage/products/selling/${productId}`);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <Header/>
    <CONTAINER>
      <FORM onSubmit={handleSubmit}>
        <SECTION>
          <IMAGE_UPLOAD_SECTION>
            <MAIN_IMAGE_CONTAINER>
              {mainImage ? (
                <img src={mainImage} alt="Main Product" />
              ) : (
                <IMAGE_OVERLAY_TEXT>이미지가 없습니다</IMAGE_OVERLAY_TEXT>
              )}
            </MAIN_IMAGE_CONTAINER>
            <SMALL_IMAGE_CONTAINER style={{ position: 'relative', overflow: 'hidden' }}>
              <PrevArrow onClick={prevSlide} />
              <div
                style={{
                  display: 'flex',
                  transition: 'transform 0.5s ease',
                  transform: `translateX(-${currentSlide * 100}px)`,
                  width: `${images.length * 100}px`,
                }}
              >
                {images.map((image, index) => (
                  <SMALL_IMAGE_PREVIEW
                    key={index}
                    onClick={() => handleMainImageChange(index)}
                    style={{
                      border: currentSlide === index ? '2px solid #ff00a5' : 'none',
                    }}
                  >
                    {image instanceof File ? (
                      <img src={URL.createObjectURL(image)} alt={`Product ${index + 1}`} />
                    ) : (
                      <img src={image} alt={`Product ${index + 1}`} /> // URL일 경우 그대로 사용
                    )}
                  </SMALL_IMAGE_PREVIEW>
                ))}
              </div>
              <NextArrow onClick={nextSlide} />
            </SMALL_IMAGE_CONTAINER>
            <IMAGE_UPLOAD_BUTTON>
              <input type="file" multiple onChange={handleImageUpload} />
              사진 업로드
            </IMAGE_UPLOAD_BUTTON>
          </IMAGE_UPLOAD_SECTION>
          <div>
            <INPUT_ROW>
              <INPUT_CONTAINER>
                <PRODUCT_NAME_INPUT
                  type="text"
                  name="productName"
                  value={product.productName}
                  onChange={handleInputChange}
                  placeholder="제품명"
                />
              </INPUT_CONTAINER>
            </INPUT_ROW>
            <INPUT_ROW>
              <INPUT_CONTAINER>
                <INPUT_DATE
                  type="date"
                  name="deadline"
                  value={product.deadline}
                  onChange={handleInputChange}
                />
                <LABEL>판매 마감일</LABEL>
              </INPUT_CONTAINER>
              <INPUT_CONTAINER>
                <INPUT_PRICE
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  placeholder="가격"
                />
              </INPUT_CONTAINER>
            </INPUT_ROW>
            <INPUT_ROW>
              <INPUT_CONTAINER>
                <LABEL>카테고리</LABEL>
                  <SELECT
                    name="categoryId"
                    value={product.categoryId}
                    onChange={handleCategoryChange}
                  >
                    <option value="1">의류</option>
                    <option value="2">악세사리</option>
                    <option value="3">학용품</option>
                    <option value="4">인형</option>
                    <option value="5">스티커</option>
                    <option value="6">잡화</option>
                    <option value="7">생활용품</option>
                    <option value="8">행사용품</option>
                    <option value="9">기타</option>
                  </SELECT>
                </INPUT_CONTAINER>
                <INPUT_UNIV_NAME
                  type="text"
                  name="university"
                  value={product.university}
                  onChange={handleInputChange}
                  placeholder="학교명"
                />
            </INPUT_ROW>
              <ONLINE_BUTTON
                type="button"
                isActive={pickupOptions.includes("ONLINE")}
                onClick={() => handlePickupOptionChange("ONLINE")}
              >
                온라인 수령
              </ONLINE_BUTTON>
              <OFFLINE_BUTTON
                type="button"
                isActive={pickupOptions.includes("OFFLINE")}
                onClick={() => handlePickupOptionChange("OFFLINE")}
              >
                오프라인 수령
              </OFFLINE_BUTTON>

              <div style={{ marginTop: "10px", marginBottom: "10px", fontWeight: "bold" }}>
                입금계좌
              </div>

            <INPUT_ROW>
                <SELECT_BANK
                  name="bankName"
                  value={product.bankName}
                  onChange={handleBankNameChange}
                >
                  <option value="">은행명</option>
                  <option value="국민은행">국민은행</option>
                  <option value="신한은행">신한은행</option>
                  <option value="우리은행">우리은행</option>
                  <option value="하나은행">하나은행</option>
                  <option value="농협은행">농협은행</option>
                  <option value="기업은행">기업은행</option>
                </SELECT_BANK>
                <INPUT_ACCOUNT_HOLDER 
                  type="text"
                  name="accountName"
                  value={product.accountName}
                  onChange={handleInputChange}
                  placeholder="예금주"/>

                 <INPUT_ACCOUNT_NUMBER
                   type="text"
                   name="accountNumber"
                   value={product.accountNumber}
                   onChange={handleInputChange}
                   placeholder="계좌번호"/> 
            </INPUT_ROW>
            <OPTIONS_SECTION>
              {options.map((option, optionIndex) => (
                <OPTION_GROUP key={optionIndex}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <OPTION_TITLE
                      type="text"
                      value={option.optionCategory}
                      onChange={(e) => handleOptionTitleChange(optionIndex, e.target.value)}
                    />
                    <ADD_FULL_OPTION_BUTTON type="button" onClick={handleAddOptionGroup}>
                      +
                    </ADD_FULL_OPTION_BUTTON>
                  </div>
                  {(option.optionValues || []).map((valueObj, valueIndex) => (
                    <OPTION_INPUT_WRAPPER key={valueIndex}>
                      <OPTION_INPUT
                        type="text"
                        value={valueObj.value}
                        onChange={(e) => handleOptionValueChange(optionIndex, valueIndex, e.target.value)}
                        placeholder="옵션값"
                      />
                      <ROUND_BUTTON type="button" onClick={() => handleRemoveOptionValue(optionIndex, valueIndex)}>
                        X
                      </ROUND_BUTTON>
                    </OPTION_INPUT_WRAPPER>
                  ))}
                  <ADD_OPTION_BUTTON type="button" onClick={() => handleAddOptionValue(optionIndex)}>옵션 값 추가</ADD_OPTION_BUTTON>
                  {optionIndex > 0 && (
                    <div style={{ marginTop: '10px', cursor: 'pointer' }} onClick={() => handleRemoveOptionGroup(optionIndex)}>
                      옵션제거
                    </div>
                  )}
                </OPTION_GROUP>
              ))}
            </OPTIONS_SECTION>
          </div>
        </SECTION>
        <LARGE_IMAGE_CONTAINER>
          {pdfImage && pdfImage instanceof File ? (
            <img src={URL.createObjectURL(pdfImage)} alt="Detail Image" />
          ) : (
            pdfImage ? <img src={pdfImage} alt="Detail Image" /> : <PLACEHOLDER_IMAGE>이미지가 없습니다</PLACEHOLDER_IMAGE>
          )}
        </LARGE_IMAGE_CONTAINER>
        <PDF_UPLOAD_BUTTON>
          <input type="file" accept="image/*" onChange={handleDetailImage} />
          제품 상대내용 업로드
        </PDF_UPLOAD_BUTTON>
        <SUBMIT_BUTTON type="submit">수정</SUBMIT_BUTTON>
      </FORM>
    </CONTAINER>
    </>
  );
};

export default ProductModifyPage;
