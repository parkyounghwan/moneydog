import axios from 'axios';

import { GET_SUBS, GET_USERS_SUBSTMPL_LIST } from './ActionTypes';

export const getUserSubsTmplList = (list) => (dispatch) => {
  dispatch(
    {
      type: GET_USERS_SUBSTMPL_LIST,
      list,
    }
  );
};

// TODO: token 값 cookie 에 있는거 꺼내주는거로 바꿔줘야하는데
export const getSubsInfo = () => async (dispatch) => {
  const config = {
    headers: {
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbSI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE1NjkyMTY4OTksImV4cCI6MTU2OTIxODY5OX0.C1irv2odCztIaKZ58tvelZTHp4783S9CqTD1xbX3CHo',
    },
  };
  await axios
    .get(`${process.env.REACT_APP_NODE_API_URL}/subs-info`,
      config
    )
    .then((res) => {
      dispatch({
        type: GET_SUBS,
        subsInfo: res.data.message,
      });
    })
    .catch((err) => {
      return err.response;
    });
};
