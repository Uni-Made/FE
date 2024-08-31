import React, { useState } from 'react';
import { authInstance } from '../../api/axiosInstance';
import * as pdfjsLib from 'pdfjs-dist';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../ProductList/components/Navbar';
// PDF.js의 API 버전과 워커 버전이 일치하도록 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

import {
    CONTAINER,
    FORM,
    SECTION,
    PRODUCT_NAME_INPUT,
    INPUT_CONTAINER,
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
    OPTION_INPUT_WRAPPER,
    OPTION_TITLE,
    LARGE_IMAGE_CONTAINER,
    PDF_UPLOAD_BUTTON,
    INPUT_ROW,
    ROUND_BUTTON,
} from './ProductRegistration.style';

async function createProduct(data, images, jpgImage) {
  try {
    const formData = new FormData();
    
    // Add the product details in JSON format to the FormData
    formData.append('createProductDto', JSON.stringify(data));
    
    // Append each image file to the FormData
    images.forEach((image, index) => {
      formData.append('image', image, `image_${index}.png`);
    });
    
    // If a JPG image is uploaded, append it to the FormData
    if (jpgImage) {
      formData.append('detailImage', jpgImage, 'detail.jpg');
    }

    // Send POST request to the API endpoint
    const response = await authInstance.post(
      "http://15.165.185.157:8080/seller/product/create", 
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log('Product created successfully', response.data);
    return true;
  } catch (error) {
    console.error("Error creating product", error);
    return false;
  }
}

const ProductRegisterPage = () => {
  const [product, setProduct] = useState({
    bankName: '',
    price: '',
    pickupDate: '2024-08-30',
    name: '',
    university: '',
    pickupOption: '',
    pickupLocation: '아무거나',
    status: 'SELLING',
    registerStatus: 'PENDING',
    accountNumber: '',
    accountName: '',
    deadline: '',
    content: '',
    categoryId: '',
  });

  const grayPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACZElEQVR4Xu3aO47CQBiF4ZNtEsVFSqWJZshZshRsiZVsiZZsh5UWhAlFbFhAj+Ak5fOt67/AAJKejhzA/O4V6mXIFadWo1m6Xw/sxFfpj3AXAWgIIBQ0AdCWATfDDJbBjCvAzmd2HQz8CHAx8+PsGPxosFr4CfAQ+AE3QpEwZlKCBkADfAAYBrQz/FVCEQFnoGR5IjIHtg9wKsC2gQmYEzAmRUXAoCEgZhSi+CaBILgIbSVCMAroPbgIC/B6QcOgZngcOgdHQA7gM6OZqA/BbMFHgKTQkNcADlBBtBZoFPMVIBH+AfAXOA1UCdYA2wEdURKPAIFQLXAFUgBiHwTCgM5imAJaE8cRIIA+yswCrQVeEnUFnoJ0+J4RJAArVotbAEsKMCw1T5+GQB7oBESMlVWi6yOaAfaGdS12gRsC+ob/O61';

  const [options, setOptions] = useState([{ name: '옵션1', values: [{ value: '' }] }]); 
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(grayPlaceholder);
  const [pdfImage, setPdfImage] = useState(grayPlaceholder);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to manage submission confirmation

  const navigate = useNavigate(); // Initialize useNavigate

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => file);
    setImages([...images, ...newImages]);
  
    if (mainImage === grayPlaceholder) {
      setMainImage(URL.createObjectURL(newImages[0]));
    }
  };
  
  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    
    if (file && file.type.startsWith('image/')) {  // 이미지 파일일 경우
      const imageUrl = URL.createObjectURL(file);
      setPdfImage(imageUrl); // 이미지 URL을 상태로 설정
    }
  };
  
  const handleAddOptionValue = (index) => {
    const newOptions = [...options];
    newOptions[index].values.push({ value: '' });
    setOptions(newOptions);
  };

  const handleOptionValueChange = (index, valueIndex, value) => {
    const newOptions = [...options];
    newOptions[index].values[valueIndex].value = value;
    setOptions(newOptions);
  };

  const handleRemoveOptionValue = (index, valueIndex) => {
    const newOptions = [...options];
    newOptions[index].values.splice(valueIndex, 1);
    setOptions(newOptions);
  };

  const handleAddOptionGroup = () => {
    const newOptionName = `옵션${options.length + 1}`;
    setOptions([
      ...options,
      { name: newOptionName, values: [{ value: '' }] },
    ]);
  };

  const handleRemoveOptionGroup = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleMainImageChange = (index) => {
    setMainImage(URL.createObjectURL(images[index]));
  };

  const handlePickupOptionChange = (option) => {
    let updatedOption = '';
    if (product.pickupOption.includes(option)) {
      updatedOption = product.pickupOption.split(',').filter(o => o !== option).join(',');
    } else {
      updatedOption = option;
    }
    setProduct({ ...product, pickupOption: updatedOption });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOptionNameChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].name = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Convert options to the required format with id, name, and values
    const optionsFormatted = options.map((option, index) => ({
      id: index + 1, // Set id starting from 1
      name: option.name,
      values: option.values.map(valueObj => valueObj.value),
    }));
  
    // Include options in the product data
    const productWithOptions = {
      ...product,
      options: optionsFormatted,
    };
  
    const imageFilesResolved = await Promise.all(images.map(image => {
      return new Promise((resolve) => {
        resolve(image);
      });
    }));
  
    const pdfBlob = pdfImage
      ? await fetch(pdfImage)
          .then(res => res.blob())
          .then(blob => new File([blob], 'detail.pdf', { type: 'application/pdf' }))
      : null;
  
    console.log("콘솔창이다", productWithOptions, imageFilesResolved, pdfBlob);
    const success = await createProduct(productWithOptions, imageFilesResolved, pdfBlob);
    
    if (success) {
      setIsSubmitted(true); // Show the confirmation message
    }
  };

  const handleConfirmation = () => {
    navigate('/maderMyPage');
  };

  const handleImageError = (event) => {
    event.target.src = '/path/to/placeholder/image.png'; // 대체할 이미지 경로를 설정합니다.
  };

  return (
    <>
    <Header/>
    <CONTAINER>
      {isSubmitted && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
          }}>
            <p>등록이 완료되었습니다.</p>
            <button onClick={handleConfirmation}>확인</button>
          </div>
        </div>
      )}
      <FORM onSubmit={handleSubmit}>
        <SECTION>
          <IMAGE_UPLOAD_SECTION>
            <MAIN_IMAGE_CONTAINER>
              {mainImage ? (
                <img src={mainImage} alt="Main Product" onError={handleImageError} />
              ) : (
                <PLACEHOLDER_IMAGE>
                  <IMAGE_OVERLAY_TEXT>Main Product</IMAGE_OVERLAY_TEXT>
                </PLACEHOLDER_IMAGE>
              )}
            </MAIN_IMAGE_CONTAINER>
            <SMALL_IMAGE_CONTAINER style={{ position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  display: 'flex',
                  transition: 'transform 0.5s ease',
                  width: `${images.length * 100}px`,
                }}
              >
                {images.map((image, index) => (
                  <SMALL_IMAGE_PREVIEW
                    key={index}
                    onClick={() => handleMainImageChange(index)}
                    style={{
                      border: mainImage === URL.createObjectURL(image) ? '2px solid #ff00a5' : 'none',
                    }}
                  >
                    <img src={URL.createObjectURL(image)} alt={`Product ${index + 1}`} />
                  </SMALL_IMAGE_PREVIEW>
                ))}
              </div>
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
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  placeholder="제품명"
                />
              </INPUT_CONTAINER>
            </INPUT_ROW>
            <INPUT_ROW>
              <INPUT_CONTAINER>
              <LABEL>판매 마감일</LABEL>
                <INPUT_DATE
                  type="date"
                  name="deadline"
                  value={product.deadline}
                  onChange={handleInputChange}
                />
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
              <SELECT
                name="categoryId"
                value={product.categoryId}
                onChange={handleInputChange}
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
              <LABEL>카테고리</LABEL>
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
              isActive={product.pickupOption === "ONLINE"}
              onClick={() => handlePickupOptionChange("ONLINE")}
            >
              온라인 수령
            </ONLINE_BUTTON>
            <OFFLINE_BUTTON
              type="button"
              isActive={product.pickupOption === "OFFLINE"}
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
                onChange={handleInputChange}
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
                placeholder="계좌주"/>

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
                      value={option.name}
                      onChange={(e) => handleOptionNameChange(optionIndex, e.target.value)}
                    />
                    <ADD_FULL_OPTION_BUTTON type="button" onClick={handleAddOptionGroup}>
                      +
                    </ADD_FULL_OPTION_BUTTON>
                  </div>
                  {(option.values || []).map((valueObj, valueIndex) => (
                    <OPTION_INPUT_WRAPPER key={valueIndex}>
                      <OPTION_INPUT
                        type="text"
                        value={valueObj.value}
                        onChange={(e) => handleOptionValueChange(optionIndex, valueIndex, e.target.value)}
                        placeholder="옵션값"
                      />
                      <ROUND_BUTTON type="button" onClick={() => handleRemoveOptionValue(optionIndex, valueIndex)}>
                        x
                      </ROUND_BUTTON>
                    </OPTION_INPUT_WRAPPER>
                  ))}
                  <ADD_OPTION_BUTTON type="button" onClick={() => handleAddOptionValue(optionIndex)}>옵션 추가</ADD_OPTION_BUTTON>
                  {optionIndex > 0 && (
                    <div style={{ marginTop: '10px', color: '#000000', cursor: 'pointer',  }} onClick={() => handleRemoveOptionGroup(optionIndex)}>
                      옵션제거
                    </div>
                  )}
                </OPTION_GROUP>
              ))}
            </OPTIONS_SECTION>
          </div>
        </SECTION>
        <LARGE_IMAGE_CONTAINER>
          <img src={pdfImage} alt="PDF Preview" />
        </LARGE_IMAGE_CONTAINER>
        <PDF_UPLOAD_BUTTON>
          <input type="file" accept="image/*" onChange={handlePdfUpload} />
          PDF 업로드
        </PDF_UPLOAD_BUTTON>
        <SUBMIT_BUTTON type="submit">등록</SUBMIT_BUTTON>
      </FORM>
    </CONTAINER>
    </>
  );
};

export default ProductRegisterPage;
