import React, { useState } from 'react';
import { Container, Title, Form, Label, Input, Button } from './UserInfoUpdatePage.style';

const MemberInfoEditPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 서버로 데이터를 보내는 로직을 여기에 추가할 수 있습니다.
    alert('회원정보가 수정되었습니다.');
  };

  return (
    <Container>
      <Title>회원정보 수정</Title>
      <Form onSubmit={handleSubmit}>
        <Label>이름</Label>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력하세요" />
        
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email을 입력하세요" />
        
        <Label>비밀번호</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력하세요" />
        
        <Label>비밀번호 확인</Label>
        <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀번호를 확인하세요" />
        
        <Label>전화번호</Label>
        <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="전화번호를 입력하세요" />

        <Button type="submit">완료</Button>
      </Form>
    </Container>
  );
};

export default MemberInfoEditPage;
