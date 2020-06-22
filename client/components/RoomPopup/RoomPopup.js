import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Input, Form } from 'antd';
import { RoomPopupWrapper } from './styled';
import { useMutation } from "@apollo/react-hooks";
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import  { v4 as uuidv4 } from 'uuid';

const CREATE_ROOM = gql`
  mutation createChatRoom($input: ChatRoomInput!) {
    createChatRoom(input: $input) {
      chatRoomId
      name
    }
  }
`;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const RoomPopup = (props) => {
  const [title, _setTitle] = useState({
    value: '',
    isInputValid: true,
    errorMsg: '',
  });
  const [createChatRoom,{ loading: mutationLoading, error: mutationError }] = useMutation(CREATE_ROOM);

  const onSubmit = async () => {
    const { isInputValid, errorMsg } = validateTitleInput(title.value);
    if (isInputValid) {
       const room = {
        chatRoomId: uuidv4(),
        name: title.value
       }  
      try {
        const result = await createChatRoom({
          variables: {
            input:room
          }
        });  
        onCloseRoomPopup();
        _setTitle({
          value: '',
          isInputValid: true,
          errorMsg: '',
        });
      } catch (error) {
        console.log(error)
      }
       
    } else {
      setTitle(title.value);
    }
  };


  const validateTitleInput = (checkingText) => {
    if (!checkingText) {
      return {
        isInputValid: false,
        errorMsg: 'Title is required',
      };
    }
    if (checkingText.length < 10) {
      return {
        isInputValid: false,
        errorMsg: 'Title must have at least 10 characters',
      };
    }
    return {
      isInputValid: true,
      errorMsg: '',
    };
  };

  const setTitle = (value) => {
    const { isInputValid, errorMsg } = validateTitleInput(value);
    _setTitle({
      value: value,
      isInputValid: isInputValid,
      errorMsg: errorMsg,
    });
  };

  const { onCloseRoomPopup, isRoomPopup } = props;

  return (
    <Modal
      visible={isRoomPopup}
      title="Create Room"
      onCancel={() => {
        onCloseRoomPopup();
        _setTitle({
          value: '',
          isInputValid: true,
          errorMsg: '',
        });
      }}
      footer={[
        <Button
          loading={mutationLoading}
          key="create-room"
          onClick={onSubmit}
          // loading={isUpdateProperty}
        >
          Create
        </Button>,
        <Button
          onClick={() => {
            onCloseRoomPopup();
            _setTitle({
              value: '',
              isInputValid: true,
              errorMsg: '',
            });
          }}
          key="cancel-room"
        >
          Cancel
        </Button>,
      ]}
    >
      <RoomPopupWrapper>
        <Row>
          <Col span={24} md={24} lg={24} xs={24} sm={24}>
            <Form {...layout}>
              <Form.Item
                label={'Title'}
                colon={false}
                required
                validateStatus={!!title.isInputValid ? 'success' : 'error'}
                help={
                  title.errorMsg && !title.isInputValid ? title.errorMsg : null
                }
              >
                <Input
                  name="title"
                  value={title.value}
                  type="text"
                  placeholder="Typing title"
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={(e) => {
                    validateTitleInput(e.target.value);
                  }}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </RoomPopupWrapper>
    </Modal>
  );
};

RoomPopup.propTypes = {};

export default RoomPopup;
