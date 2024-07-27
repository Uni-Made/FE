import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  OUTER_CONTAINER,
  CONTAINER,
  PRODUCT_CONTAINER,
  PRODUCT_IMAGE,
  PRODUCT_DETAILS,
  PRODUCT_NAME,
  PRODUCT_SUB_INFO,
  PRODUCT_PRICE,
  BUTTON,
  TAB_CONTAINER,
  TAB,
  TAB_CONTENT
} from './ProductDetailPage.style';
import { getQuestion, getAnswer, postQuestion, postAnswer } from './api/api';

const ProductDetailPageSell = () => {
  const location = useLocation();
  const { productId, buyerId, sellerId } = location.state || {}; // Ensure location.state is defined

  const [activeTab, setActiveTab] = useState('details');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    if (activeTab === 'qa') {
      fetchQnA();
    }
  }, [activeTab]);

  const fetchQnA = async () => {
    try {
      if (!productId) throw new Error('Product ID is not defined');
      const questionResponse = await getQuestion(productId);
      const questionData = questionResponse.data.result;
      const answerResponse = await getAnswer(questionData.questionId);
      setQuestions([questionData]);
      setAnswers([answerResponse.data.result]);
    } catch (error) {
      console.error('Error fetching Q&A:', error);
    }
  };

  const handlePostQuestion = async () => {
    try {
      if (!productId || !buyerId) throw new Error('Product ID or Buyer ID is not defined');
      await postQuestion(productId, buyerId, { title: '질문 제목', content: newQuestion });
      setNewQuestion('');
      fetchQnA();
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  const handlePostAnswer = async (questionId) => {
    try {
      if (!sellerId) throw new Error('Seller ID is not defined');
      await postAnswer(questionId, sellerId, { title: '답변 제목', content: newAnswer });
      setNewAnswer('');
      fetchQnA();
    } catch (error) {
      console.error('Error posting answer:', error);
    }
  };

  return (
    <OUTER_CONTAINER>
      <CONTAINER>
        <PRODUCT_CONTAINER>
          <PRODUCT_IMAGE />
          <PRODUCT_DETAILS>
            <PRODUCT_NAME>연세 하키티</PRODUCT_NAME>
            <PRODUCT_SUB_INFO>~8/15까지</PRODUCT_SUB_INFO>
            <PRODUCT_PRICE>29,000원</PRODUCT_PRICE>
            <select>
              <option>옵션 1 확인</option>
            </select>
            <select>
              <option>옵션 2 확인</option>
            </select>
            <BUTTON>수정</BUTTON>
            <BUTTON disabled>구매 요청 확인</BUTTON>
          </PRODUCT_DETAILS>
        </PRODUCT_CONTAINER>
        <div style={{ display: 'flex', overflowX: 'scroll', marginBottom: '20px' }}>
          <PRODUCT_IMAGE style={{ width: '60px', height: '60px' }} />
          <PRODUCT_IMAGE style={{ width: '60px', height: '60px' }} />
          <PRODUCT_IMAGE style={{ width: '60px', height: '60px' }} />
        </div>
        <TAB_CONTAINER>
          <TAB
            active={activeTab === 'details'}
            first
            onClick={() => setActiveTab('details')}
          >
            상세정보
          </TAB>
          <TAB
            active={activeTab === 'reviews'}
            onClick={() => setActiveTab('reviews')}
          >
            리뷰
          </TAB>
          <TAB
            active={activeTab === 'qa'}
            last
            onClick={() => setActiveTab('qa')}
          >
            Q&A
          </TAB>
        </TAB_CONTAINER>
        <TAB_CONTENT>
          {activeTab === 'details' && <div>상세 정보 내용</div>}
          {activeTab === 'reviews' && <div>리뷰 내용</div>}
          {activeTab === 'qa' && (
            <div>
              <div>
                {questions.map((question) => (
                  <div key={question.questionId}>
                    <div>{question.content}</div>
                    <div>
                      {answers
                        .filter((answer) => answer.questionId === question.questionId)
                        .map((answer) => (
                          <div key={answer.answerId}>{answer.content}</div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="질문을 입력하세요"
              />
              <BUTTON onClick={handlePostQuestion}>질문 등록</BUTTON>
              <input
                type="text"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="답변을 입력하세요"
              />
              <BUTTON onClick={() => handlePostAnswer(questions[0].questionId)}>답변 등록</BUTTON>
            </div>
          )}
        </TAB_CONTENT>
      </CONTAINER>
    </OUTER_CONTAINER>
  );
};

export default ProductDetailPageSell;
