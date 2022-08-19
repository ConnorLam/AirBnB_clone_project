import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const DELETE_USER = "session/deleteUser";




const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const removeUser = (user) => {
  return {
    type: DELETE_USER,
  };
};




export const login = (user) => async (dispatch) => {
    const {credential, password} = user
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential, password
        })
    })
    console.log('this is my response', res)
    if (res.ok){
        const data = await res.json()
        console.log('this is my data', data)
        dispatch(setUser(data))
    }
}

export const restoreUser = () => async(dispatch) => {

  const res = await csrfFetch('/api/session')

  if(res.ok){
    const user = await res.json()
    dispatch(setUser(user))
    return user
  }
}

export const logout = () => async(dispatch) => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE'
  })
  if (res.ok){
    dispatch(removeUser())
  }
}

export const signUp = (user) => async(dispatch) => {
  // const {username, email, password} = user
  const res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(
      user
    )
  })

  
    if(res.ok){
      const data = await res.json()
      dispatch(setUser(data))
      return data
    }
  
}




const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = { ...state };
      newState.user = action.user;
      return newState;
    case DELETE_USER:
      newState = { ...state };
      newState.user = null;
      // delete newState['user']
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
