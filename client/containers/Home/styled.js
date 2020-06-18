import styled, { css } from 'styled-components';

export const HomeWrapper = styled.div`
  .home-wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center !important;
    align-items: center;
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
    }
  }
`;
