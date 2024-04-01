import { createSlice } from '@reduxjs/toolkit'



export const userSlice = createSlice({
    name: 'user',
    initialState : {user: null, login: false},
    reducers: {
      login: (state, action) => {
         state.user =  action.payload;
      },
      getUser: (state) => {
          console.log(state.user?.user)
    }
  }
})

export const { login, getUser } = userSlice.actions

export default userSlice.reducer