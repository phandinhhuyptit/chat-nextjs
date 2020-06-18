import React , { useState } from 'react';
import { HomeWrapper } from './styled';
import { Card, Form, Input, Button, Checkbox } from 'antd';
import { Formik } from "formik";
import * as Yup from "yup";

const { Meta } = Card;
const tabList = [
  {
    key: 'login',
    tab: 'Login',
  },
  {
    key: 'register',
    tab: 'Register',
  },
];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


const Home = (props) => {

  const [tab, setTab] = useState('login') 

  const onTabChange = (key) => {
    setTab(key)
  }

  return (
    <HomeWrapper>
      <div className="home-wrapper">
        <Card
          className="card-login-register"
          tabList={tabList}
          hoverable
          style={{ width: 350 }}
          activeTabKey={tab}
          onTabChange={key => {
            onTabChange(key);
          }}
        >
          <div  className="form-wrapper">
              
            
          </div>
        </Card>
      </div>
      ;
    </HomeWrapper>
  );
};

export default Home;
