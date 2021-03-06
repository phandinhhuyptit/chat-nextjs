import React, { useContext,useState,useEffect } from 'react';
import { Row, Col, Input } from 'antd';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { InfoCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { StoreContext } from '../../contexts/storeContext';
import { ChatWrapper } from './styled';
import { gql } from 'apollo-boost';

const GET_CHAT = gql`
  query ChatHistoryByRoom($chatRoomId: String) {
    ChatHistoryByRoom(chatRoomId: $chatRoomId) {
      mesageId
      content
      user {
        userId
        name
      }
      roomId
    }
  }
`;

const SEND_CHAT = gql`
  mutation sendMessageByRoom($input: SendMessageInput!) {
    sendMessageByRoom(input: $input) {
      mesageId
      content
      user {
        userId
        name
      }
    }
  }
`;

const SUB_CHAT = gql`
  subscription messageRealtimeByRoom($roomId: String!) {
    messageRealtimeByRoom(roomId: $roomId) {
      mesageId
      content
      user {
        userId
        name
      }
      roomId
    }
  }
`;

const Chat = (props) => {
  const { state, dispatch } = useContext(StoreContext);
  const user = state?.user ?? null
  const [message, setMessage] = useState('');
  const { loading, error, data } = useQuery(GET_CHAT, {
    variables: { chatRoomId: props.param },
  });
  const [messages, updateMessages] = useState([]);

  useEffect(() => {
    if(!Object.keys(state?.user ?? {}).length){
      const user = localStorage.getItem('user');
      dispatch({ type: "UPDATE_USER", user : JSON.parse(user)}); 
    }
    return () => {
      dispatch({ type: "UPDATE_ROOM", roomId : null });
    }
  }, [])

  useEffect(() => {
    if (data && data.ChatHistoryByRoom) {
      updateMessages(data.ChatHistoryByRoom);
    }
  }, [data]);

  const [sendMessageByRoom] = useMutation(SEND_CHAT);
  useSubscription(SUB_CHAT, {
    variables: { roomId: props.param },
    onSubscriptionData({ subscriptionData }) {
      updateMessages([
        ...messages,
        subscriptionData.data.messageRealtimeByRoom,
      ]);
    },
  });

  const sendMessage = async (event) => {
    if (event.keyCode === 13) {
      try {
        const result = await sendMessageByRoom({
          variables: {
            input: {
              mesageId: new Date().valueOf().toString(),
              content: message,
              userId: state?.user?.userId ?? '',
              roomId: props.param,
            },
          },
        });
        setMessage('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading) return null;
  if (error) return `Error! ${error}`;
  return (
    <ChatWrapper>
      <div className="chat-wrapper">
        <Row className="row-chat">
          <Col className="list-user-wrapper" xs={4} md={4} sm={4} lg={4} xl={4}>
            <p className="title">Chats</p>
            <div className="list-user">
              <div className="user-wrapper">
                <p className="username">Phan Đình Huy</p>
              </div>
              <div className="user-wrapper">
                <p className="username">Hello World</p>
              </div>
            </div>
          </Col>
          <Col
            className="messenger-wrapper"
            xs={20}
            md={20}
            sm={20}
            lg={20}
            xl={20}
          >
            <div className="messenger">
              {messages.map((msg) => {
                const userId = msg?.user?.userId ?? null
                return (
                  <>
                    {user && user.userId === userId ? (
                      <div className="me-wrapper">
                        <span className="name"> You: </span>
                        <div className="me">
                          <span className="text-msg">
                            {' '}
                            {msg?.content ?? ''}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="member-wrapper">
                        <span className="name"> {msg?.user?.name ?? ""}: </span>
                        <div className="member">
                          <span className="text-msg">{msg?.content ?? ''}</span>
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
            <div className="chatting-wrapper">
              <Input
                onKeyDown={(e) => sendMessage(e)}
                onChange={(e) => setMessage(e.target.value)}
                className=""
                value={message}
                placeholder="Message..."
                prefix={<SmileOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                suffix={
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                }
              />
            </div>
          </Col>
        </Row>
      </div>
    </ChatWrapper>
  );
};

export default Chat;
