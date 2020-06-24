import styled, { css } from 'styled-components';

export const ChatWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  .chat-wrapper {
    width: 100vw;
    height: 100vh;

    .row-chat {
      width: 100vw;
      height: 100vh;
      .list-user-wrapper {
        background-color: #f2f2f2;
        width: 100vw;
        height: 100vh;
        border-right: 1px solid #d5d5d5;
        .list-user {
          .user-wrapper {
            height: 43px;
            display: flex;
            justify-content: center;
            border-bottom: 1px solid #d5d5d5;
            align-items: center;
            .username {
              margin: 0;
            }
          }
        }
      }
      .messenger-wrapper {
        width: 100vw;
        height: 100vh;
        .messenger {
          padding: 15px;
          overflow: hidden;
          overflow-y: scroll;
          height: calc(100vh - 31px);
          .me-wrapper {
            display: flex;
            justify-content: flex-end;
          }
          .member-wrapper {
            display: flex;
          }

          .me {
            border-radius: 22px;
            border: 1px solid rgba(var(--bb2, 239, 239, 239), 1);
            max-width: 236px;
            min-height: 44px;
            padding-bottom: 10px;
            background-color: #efefef;
            padding-top: 10px;
            padding-left: 16px;
            padding-right: 16px;
            display: inline-flex;
            justify-content: center;
            .text-msg {
              overflow-wrap: break-word;
              white-space: normal;
            }
          }
          .member {
            border-radius: 22px;
            border: 1px solid rgba(var(--bb2, 239, 239, 239), 1);
            max-width: 236px;
            min-height: 44px;
            padding-bottom: 10px;
            padding-top: 10px;
            padding-left: 16px;
            padding-right: 16px;
            display: inline-flex;
            justify-content: center;
            .text-msg {
              overflow-wrap: break-word;
              white-space: normal;
            }
          }
        }
      }
    }
  }
`;
