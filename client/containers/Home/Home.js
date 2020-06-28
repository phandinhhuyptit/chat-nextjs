import React, { useState , useEffect } from 'react';
import { HomeWrapper, MyForm } from './styled';
import { Form, Card, Input, Button, Checkbox } from 'antd';
import Particles from 'react-particles-js';
import { useRouter } from 'next/router'
import loGet from 'lodash/get'
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Formik } from 'formik';
import  { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

const CREATE_USER = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      userId
      name
      email
    }
  }
`;
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

// Schema for yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must have at least 2 characters')
    .max(100, "Name can't be longer than 100 characters")
    .required('Name is required'),
  email: Yup.string().email('email not valid').required('Email is required'),
});

const Home = (props) => {
  const router = useRouter()
  const [tab, setTab] = useState('login');
  const [createUser,{ loading: mutationLoading, error: mutationError }] = useMutation(CREATE_USER);

  const onTabChange = (key) => {
    setTab(key);
  };
 
  return (
    <HomeWrapper>
      <div className="home-wrapper">
        <Particles
          className="tsparticles-wrapper"
          params={{
            particles: {
              number: {
                value: 250,
              },
              size: {
                value: 5,
              },
              move: {
                speed: 7,
              },
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: 'repulse',
                },
              },
            },
          }}
        />
        <Card
          className="card-login-register"
          tabList={tabList}
          hoverable
          style={{ width: 350 }}
          activeTabKey={tab}
          onTabChange={(key) => {
            onTabChange(key);
          }}
        >
          <div className="form-wrapper">
            <Formik
              initialValues={{ name: '', email: '' }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  const user = {
                    userId : uuidv4(),
                    name: loGet(values, ['name']),
                    email: loGet(values, ['email']),
                  };
                  setSubmitting(true);
                  const result = await  createUser({
                    variables: {
                      input:user
                    }
                  });
                  localStorage.setItem("user",JSON.stringify(result?.data?.createUser ?? {}))
                  resetForm();
                  setSubmitting(false);
                  router.push('/room')
                } catch (error) {
                  console.log(error)
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                dirty,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                handleReset,
              }) => {
                return (
                  <MyForm>
                    <Form.Item
                      className="name"
                      label="Name"
                      colon={false}
                      required
                      hasFeedback={touched.name && errors.name}
                      validateStatus={  
                        touched.name && errors.name ? 'error' : 'success'
                      }
                      help={touched.name && errors.name ? errors.name : null}
                    >
                      <Input
                        name="name"
                        value={values.name}
                        type="text"
                        placeholder="Typing name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Item>
                    <Form.Item
                      className="email"
                      label="Email"
                      colon={false}
                      required
                      hasFeedback={touched.email && errors.email}
                      validateStatus={
                        touched.email && errors.email ? 'error' : 'success'
                      }
                      help={touched.email && errors.email ? errors.email : null}
                    >
                      <Input
                        name="email"
                        value={values.email}
                        type="text"
                        placeholder="Typing email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Item>
                    <Form.Item className="button-wrapper">
                      <Button
                        className="button-submit"
                        type="primary"
                        shape="round"
                        disabled={isSubmitting}
                        size={"default"}
                        onClick={(e)=>{
                          e.preventDefault();
                          handleSubmit()
                        }}
                      >
                         Submit                          
                      </Button>
                    </Form.Item>
                  </MyForm>
                );
              }}
            </Formik>
          </div>
        </Card>
      </div>
    </HomeWrapper>
  );
};

export default Home;
