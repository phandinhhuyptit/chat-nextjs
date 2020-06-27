
export const storeReducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_USER":
        const newStateUser = Object.assign(state, { user: action.user });
        return newStateUser;
      case "UPDATE_ROOM":
        const newStateRoom = Object.assign( state, { roomId: action.roomId });
        return newStateRoom;
      default:
        return state;
    }
  };