import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';
import RoomPopup from '../../components/RoomPopup';
import { RoomWrapper } from './styled';

const Room = (props) => {
  const [isRoomPopup, setIsRoomPopup] = useState(false);

  const onOpenRoomPopup = () => {
    setIsRoomPopup(true);
  };

  const onCloseRoomPopup = () => {
    setIsRoomPopup(false);
  };

  return (
    <RoomWrapper>
      <div className="rooms-wrapper">
        <Button className="create-room" onClick={() => onOpenRoomPopup()}>
          {' '}
          Create Room
        </Button>
        <Row justify="space-around" gutter={[16, 16]}>
          <Col sm={8} md={6} lg={6} xl={6}>
            <Card title={`ID ROOM: `} className="room-wrapper" hoverable>
              <div className="room">
                <div className="title-room">Group Chat Awesome</div>
                <div className="button-wrapper">
                  <Button className="button">JOIN</Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col sm={8} md={6} lg={6} xl={6}>
            <Card title={`ID ROOM: `} className="room-wrapper" hoverable>
              <div className="room">
                <div className="title-room">Group Chat Awesome</div>
                <div className="button-wrapper">
                  <Button className="button">JOIN</Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col sm={8} md={6} lg={6} xl={6}>
            <Card title={`ID ROOM: `} className="room-wrapper" hoverable>
              <div className="room">
                <div className="title-room">Group Chat Awesome</div>
                <div className="button-wrapper">
                  <Button className="button">JOIN</Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col sm={8} md={6} lg={6} xl={6}>
            <Card title={`ID ROOM: `} className="room-wrapper" hoverable>
              <div className="room">
                <div className="title-room">Group Chat Awesome</div>
                <div className="button-wrapper">
                  <Button className="button">JOIN</Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <RoomPopup
        onCloseRoomPopup={onCloseRoomPopup}
        isRoomPopup={isRoomPopup}
      />
    </RoomWrapper>
  );
};

export default Room;
