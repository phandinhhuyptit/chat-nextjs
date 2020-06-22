import React, { useState,useEffect } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { useQuery,useSubscription } from '@apollo/react-hooks';
import RoomPopup from '../../components/RoomPopup';
import  { v4 as uuidv4 } from 'uuid'
import { RoomWrapper } from './styled';
import { gql } from 'apollo-boost';


const GET_ROOMS = gql`
  query {
    ChatRooms {
      chatRoomId
      name
    }
  }
`;

const SUB_ROOMS = gql`
  subscription createChatRoomRealtime {
    createChatRoomRealtime {
      chatRoomId
      name
    }
  }
`;

const Rooms = (props) => {
  const [isRoomPopup, setIsRoomPopup] = useState(false);
  const { loading, error, data } = useQuery(GET_ROOMS);
  const [ rooms , setRooms] = useState([])


  useSubscription(SUB_ROOMS, {
    onSubscriptionData({ subscriptionData }) {
      setRooms([
        ...rooms,
        subscriptionData.data.createChatRoomRealtime,
      ]);
    },
  });
  useEffect(() => {
    if (data && data.ChatRooms) {
      const roomsList = data?.ChatRooms ?? [] 
      setRooms(roomsList)
    }
  }, [data]);

  if (loading) return null;
  if (error) return `Error! ${error}`;

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
        <Row gutter={[16, 16]}>
          {rooms.length &&
            rooms.map((room) => {
              return (
                <Col sm={8} md={6} lg={6} xl={6}>
                  <Card title={`ID ROOM:${room?.chatRoomId ?? ""}`} className="room-wrapper" hoverable>
                    <div className="room">
                      <div className="title-room">{room?.name ?? ""}</div>
                      <div className="button-wrapper">
                        <Button className="button">JOIN</Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>
      <RoomPopup
        onCloseRoomPopup={onCloseRoomPopup}
        isRoomPopup={isRoomPopup}
      />
    </RoomWrapper>
  );
};

export default Rooms;
