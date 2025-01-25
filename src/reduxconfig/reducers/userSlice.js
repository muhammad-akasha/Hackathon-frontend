import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
  },

  reducers: {
    setUser: (state, action) => {
      state.user = {
        username: action.payload.name,
        email: action.payload.email,
        picture: action.payload.picture,
        role: action.payload.role,
      };
    },
    editUser: (state, action) => {
      state.todo[action.payload.index].title = action.payload.editVal;
    },
    deletingUser: (state, action) => {
      state.todo.splice(action.payload.index, 1);
    },
  },
});

export default userSlice.reducer;
export const { setUser, deletingUser, editUser } = userSlice.actions;
