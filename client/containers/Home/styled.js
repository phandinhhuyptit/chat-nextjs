import styled, { css } from 'styled-components';

export const HomeWrapper = styled.div`
  .home-wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center !important;
    align-items: center;

    .button-wrapper {
      margin-top : 2rem;
      .button-submit {
        width: 100%;
        height: 39px;
      }
    }

    .tsparticles-wrapper {
      width: 100vw;
      height: 100vh;
      background-image: url('https://codersera.com/blog/wp-content/uploads/2019/07/photo-1518933165971-611dbc9c412d.jpg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .ant-card-head {
      padding: 0;

      .ant-tabs-large > .ant-tabs-nav .ant-tabs-tab {
        display: flex;
        justify-content: center;
        width: 50%;
        margin: 0;
      }
      .ant-tabs-nav-list {
        width: 100%;
      }
    }
    .card-login-register {
      height: 350px;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export const MyForm = styled.form`
  .ant-col.ant-form-item-label {
    width: 100%;
    display: flex;
  }
`;
