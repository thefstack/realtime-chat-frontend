import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Auth = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    const endpoint = isLogin ? '/api/auth/local' : '/api/auth/local/register';
    let data;
    if(isLogin){
      data={ identifier:username, password }
    }else{
      data={username,password,email}
    }
    const response = await axios.post(`http://localhost:1337${endpoint}`, data);
    console.log(response)
    setUser(response.data.user);
    
  };

  return (
    <Wrapper>
      <FormContainer>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {isLogin ? '':<Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />}
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button onClick={handleAuth}>{isLogin ? 'Login' : 'Register'}</Button>
        <SwitchButton onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </SwitchButton>
      </FormContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f3f4f6, #e0e7ff);
`;

const FormContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  margin: 10px 0;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 15px;
  margin: 20px 0;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #4338ca;
  }
`;

const SwitchButton = styled.button`
  background: none;
  border: none;
  color: #4f46e5;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

export default Auth;
