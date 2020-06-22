import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Input, Form } from 'antd';
import { RoomPopupWrapper } from './styled';
import PropTypes from 'prop-types';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const RoomPopup = (props) => {    
  const [title,_setTitle] = useState({
     value:'',
     isInputValid:true,
     errorMsg:''
  })  
  
  const validateTitleInput = (checkingText) => {
    
    if(checkingText.length < 10){
        return {
            isInputValid:false,
            errorMsg:'Title must have at least 10 characters'
        }
    }
    return {
        isInputValid : true,
        errorMsg:''
    }
 }


 const setTitle = (value) =>{
     const  {isInputValid , errorMsg} = validateTitleInput(value)   

    _setTitle({
        value: value,
        isInputValid:isInputValid,
        errorMsg: errorMsg  
    })  
 }

  const { onCloseRoomPopup, isRoomPopup } = props; 

  return (
    <Modal
      visible={isRoomPopup}
      title="Create Room"
      onCancel={onCloseRoomPopup}
      footer={[
        <Button
          key="create-room"
          // onClick={this.handleChangePriority}
          // loading={isUpdateProperty}
        >
          Create
        </Button>,
        <Button onClick={() => onCloseRoomPopup()} key="cancel-room">
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
                help={title.errorMsg && !title.isInputValid ? title.errorMsg : null}
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
