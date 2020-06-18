import React, { useState } from 'react';
import { HomeWrapper, MyForm } from './styled';
import { Form, Card, Input, Button, Checkbox } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';

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
  const [tab, setTab] = useState('login');

  const onTabChange = (key) => {
    setTab(key);
  };

  return (
    <HomeWrapper>
      <div className="home-wrapper">
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
                  const book = {
                    title: loGet(values, ['title']),
                    name: loGet(values, ['name']),
                    genre: loGet(values, ['genre']),
                    authorId: loGet(values, ['author']),
                  };
                  setSubmitting(true);
                  const result = await addBook({
                    variables: book,
                    refetchQueries: () => ['GET_BOOKS'],
                  });
                  toast.success('Success!', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  resetForm();
                  setSubmitting(false);
                } catch (error) {
                  toast.warn(`${error.message}`, {
                    position: toast.POSITION.TOP_RIGHT,
                  });
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
                console.log(values)
                return (
                  <MyForm>
                    <Form.Item
                      className="name"
                      label="Name"
                      colon={false}
                      required
                      hasFeedback={touched.name && errors.name}
                      validateStatus={
                        !touched.name && !errors.name
                          ? 'success'
                          : touched.name && !errors.name
                          ? 'success'
                          : 'error'
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
                        !touched.email && !errors.email
                          ? 'success'
                          : touched.email && !errors.email
                          ? 'success'
                          : 'error'
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
                  </MyForm>
                );
              }}
            </Formik>
          </div>
        </Card>
      </div>
      ;
    </HomeWrapper>
  );
};

export default Home;
