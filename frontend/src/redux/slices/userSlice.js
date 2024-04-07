import { createSlice } from '@reduxjs/toolkit'



export const userSlice = createSlice({
    name: 'user',
    initialState : {user: null, login: false},
    reducers: {
      setLogin: (state, action) => {
         state.user =  action.payload;
         state.login = true;
      },
      logout: (state) => {
        state.user = null;
        state.login = false;
      }
  }
})

export const { setLogin, logout} = userSlice.actions

export default userSlice.reducer