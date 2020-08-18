import { useReducer } from "react";

const NEW_MESSAGE = "NEW_MESSAGE";
const SET_NAME = "SET_NAME";
const TYPING = "TYPING";
const INITIAL = "INITIAL";
const NEW_CONNECTION = "NEW_CONNECTION";
const REMOVE_CONNECTION = "REMOVE_CONNECTION";

function chatReducer(state, action) {
  switch (action.type) {
    case NEW_MESSAGE: {
      const { message } = action.payload;
      const messages = [...state.messages, message];
      return { ...state, messages };
    }
    case SET_NAME: {
      const { name } = action.payload;
      return { ...state, user: name };
    }
    case TYPING: {
      const { user } = action.payload;
      return { ...state, typing: user };
    }
    case INITIAL: {
      const { id, connected } = action.payload;
      return { ...state, id, connected };
    }
    case NEW_CONNECTION: {
      const { user } = action.payload;
      const connected = [...state.connected, user];
      return { ...state, connected };
    }
    case REMOVE_CONNECTION: {
      const { user } = action.payload;
      const { connected } = state;
      const update = connected.filter((v) => v !== user);
      return { ...state, connected: update };
    }
    default:
      return state;
  }
}

/**
 *
 * @param {*} socket The socket connection created
 */
function useChatReducer(socket) {
  const [state, dispatch] = useReducer(chatReducer, {
    messages: [],
    user: "",
    id: null,
    typing: null,
    connected: [],
    setName,
  });

  const newMessage = ({ sender, message }) => {
    const msg = { sender, content: message };
    dispatch({ type: NEW_MESSAGE, payload: { message: msg } });
  };

  const initialConnect = ({ id, connected }) => {
    dispatch({ type: INITIAL, payload: { id, connected } });
  };

  const newConnection = (user) => {
    dispatch({ type: NEW_CONNECTION, payload: { user } });
  };

  const setTyping = (user) => {
    dispatch({ type: TYPING, payload: { user } });
  };

  const removeConnection = (user) => {
    dispatch({ type: REMOVE_CONNECTION, payload: { user } });
  };

  return {
    state,
    newMessage,
    setTyping,
    initialConnect,
    newConnection,
    removeConnection,
  };

  function setName(name) {
    dispatch({ type: SET_NAME, payload: { name } });
    socket.emit("connected", name);
  }
}

export default useChatReducer;
