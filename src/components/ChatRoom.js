import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
const socket = io('http://localhost:1337');

const ChatRoom = ({ user }) => {

  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', { username: user.username });
    
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('activeUsers', (users) => {
      setActiveUsers(users);
      console.log(users)
    });

    return () => {
      socket.off('message');
      socket.off('activeUsers');
    };
  }, [user]);

  const sendMessage = () => {
    const Data={user:user.username,msg:message}
    socket.emit('sendMessage', {Data:Data});
    setMessage('');
  };

  return (
    <Wrapper>
      <ChatContainer>
        <MessagesContainer>
          <h2>Chat Room</h2>
          <Messages>
            {messages.map((msg, idx) => (
              <Message key={idx} isSentByCurrentUser={msg.username === user.username}>
                <strong>{msg.username}:</strong> {msg.message}
              </Message>
            ))}
          </Messages>
        </MessagesContainer>
        <ActiveUsersContainer>
          <h3>Active Users: {activeUsers.length}</h3>
        </ActiveUsersContainer>
        <InputContainer>
          <Input 
            type="text" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Type a message" 
          />
          <Button onClick={sendMessage}>Send</Button>
        </InputContainer>
      </ChatContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 800px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const Messages = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background: ${props => props.isSentByCurrentUser ? '#d1e7dd' : '#e0e7ff'};
  border-radius: 8px;
  align-self: ${props => props.isSentByCurrentUser ? 'flex-end' : 'flex-start'};
  max-width: 70%;
  word-wrap: break-word;
`;

const ActiveUsersContainer = styled.div`
  margin-bottom: 20px;
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
`;

const User = styled.li`
  margin-bottom: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
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

export default ChatRoom;
