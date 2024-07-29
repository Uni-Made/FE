import React, { useState } from 'react';
import { Container, Title, Form, Label, Input, Button } from './UserInfoUpdatePage.style';

const UserInfoUpdatePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!name) {
      errors.name = '이름을 입력하세요.';
      valid = false;
    }

    if (!email) {
      errors.email = 'Email을 입력하세요.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = '유효한 Email을 입력하세요.';
      valid = false;
    }

    if (!password) {
      errors.password = '비밀번호를 입력하세요.';
      valid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      valid = false;
    }

    if (!phone) {
      errors.phone = '전화번호를 입력하세요.';
      valid = false;
    } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(phone)) {
      errors.phone = '유효한 전화번호를 입력하세요.';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = {
      name,
      email,
      password,
      phone,
    };

    // 서버로 데이터를 보내는 로직을 여기에 추가할 수 있습니다.
    // 예시:
    // fetch('/api/user/update', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   alert('회원정보가 수정되었습니다.');
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    //   alert('회원정보 수정에 실패했습니다.');
    // });

    alert('회원정보가 수정되었습니다.');
  };

  return (
    <Container>
      <Title>회원정보 수정</Title>
      <Form onSubmit={handleSubmit}>
        <Label>이름</Label>
        <Input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="이름을 입력하세요" 
        />
        {errors.name && <p>{errors.name}</p>}
        
        <Label>Email</Label>
        <Input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email을 입력하세요" 
        />
        {errors.email && <p>{errors.email}</p>}
        
        <Label>비밀번호</Label>
        <Input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="비밀번호를 입력하세요" 
        />
        {errors.password && <p>{errors.password}</p>}
        
        <Label>비밀번호 확인</Label>
        <Input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="비밀번호를 확인하세요" 
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        
        <Label>전화번호</Label>
        <Input 
          type="tel" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          placeholder="전화번호를 입력하세요" 
        />
        {errors.phone && <p>{errors.phone}</p>}

        <Button type="submit">완료</Button>
      </Form>
    </Container>
  );
};

export default UserInfoUpdatePage;
