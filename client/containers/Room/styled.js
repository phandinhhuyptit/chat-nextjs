import styled, { css } from 'styled-components';

export const RoomWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  .rooms-wrapper {
    /* margin-top: 3rem; */
    position: relative;
    padding: 3rem 10px 10px 10px;
    .room-wrapper {
      width: 100%;
      height: 250px;
      .ant-card-body {
        padding: 10px;
      }
      .title-room {
        height: 135px;
      }
      .button-wrapper {
        display: flex;
        justify-content: center;
      }
    }
    .create-room {
      position: absolute;
      top: 0.5rem;
      left: 91.1%;
    }
  }
`;
