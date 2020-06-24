import React from 'react';
import { Row, Col, Input } from 'antd';
import { InfoCircleOutlined,SmileOutlined } from '@ant-design/icons';
import { ChatWrapper } from './styled';

const chat = (props) => {
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
              <div className="me-wrapper">
                <div className="me">
                  <span className="text-msg"> Hello chafo emdasdas dasdasd asdsdas</span>
                </div>
              </div>
              <div className="member-wrapper">
                <div className="member">
                  <span className="text-msg"> World</span>
                </div>
              </div>
              <div className="me-wrapper">
                <div className="me">
                  <span className="text-msg"> Hello chafo emdasdas dasdasd asdsdas</span>
                </div>
              </div>
              <div className="member-wrapper">
                <div className="member">
                  <span className="text-msg"> World</span>
                </div>
              </div>
              <div className="me-wrapper">
                <div className="me">
                  <span className="text-msg"> Hello chafo emdasdas dasdasd asdsdas</span>
                </div>
              </div>
              <div className="member-wrapper">
                <div className="member">
                  <span className="text-msg"> World</span>
                </div>
              </div>
              <div className="me-wrapper">
                <div className="me">
                  <span className="text-msg"> Hello chafo emdasdas dasdasd asdsdas</span>
                </div>
              </div>
              <div className="member-wrapper">
                <div className="member">
                  <span className="text-msg"> World</span>
                </div>
              </div>
              <div className="me-wrapper">
                <div className="me">
                  <span className="text-msg"> Hello chafo emdasdas dasdasd asdsdas</span>
                </div>
              </div>
              <div className="member-wrapper">
                <div className="member">
                  <span className="text-msg"> World</span>
                </div>
              </div>
              <div className="me-wrapper">
                <div className="me">
                  <span className="text-msg"> Hello chafo emdasdas dasdasd asdsdas</span>
                </div>
              </div>
              <div className="member-wrapper">
                <div className="member">
                  <span className="text-msg"> World</span>
                </div>
              </div>
              <div className="me-wrapper">
                <div className="me">
                  <span className="text-msg"> Hello chafo emdasdas dasdasd asdsdas</span>
                </div>
              </div>
              <div className="member-wrapper">
                <div className="member">
                  <span className="text-msg"> World</span>
                </div>
              </div>
              <div className="me-wrapper">
                <div className="me">
                  <span className="text-msg"> Hello chafo emdasdas dasdasd asdsdas</span>
                </div>
              </div>
              <div className="member-wrapper">
                <div className="member">
                  <span className="text-msg"> World</span>
                </div>
              </div>
              <div className="me-wrapper">
                <div className="me">
                  <span className="text-msg"> Hello chafo emdasdas dasdasd asdsdas</span>
                </div>
              </div>
              <div className="member-wrapper">
                <div className="member">
                  <span className="text-msg"> World</span>
                </div>
              </div>
            </div>
            <div className="chatting-wrapper">
              <Input
                className=""
                placeholder="Message..."
                prefix={
                  <SmileOutlined style={{ color: 'rgba(0,0,0,.45)' }}/>  
                }
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

export default chat;
