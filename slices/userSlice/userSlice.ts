import { createAsyncThunk, 
  createSlice, 
  } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../redux-app/store";
import axios from "axios";

export interface User {
name:string
_id:string
} 

export interface SearchUser {
  name?:string
  _id?:string
  } 

export interface ErrorResponse {
  name:string
  _id:string
}

interface UserState {
  followUser:User[],
  followERUser:User[],
  searchUser: SearchUser,
  errorStateFollow:string,
  errorStateFollowER:string
}

const initialState :UserState= {
  followUser:[],
  followERUser:[],
  searchUser: {},
  errorStateFollow:'',
  errorStateFollowER:''
} 

//メールアドレスからユーザーを検索
export const findOne = createAsyncThunk<SearchUser, string,
{ 
  state:RootState,
  rejectValue:SearchUser,
  dispatch:AppDispatch 
}>(
'UserSlice/findOne',
async (email,{ getState ,rejectWithValue }) => {

 try{
     axios.defaults.withCredentials = true;
     const  res  = await axios.get(`${process.env.NEXT_PUBLIC_GET_USER_NAME}/${email}`)
     if(res.data.success === false){
      return rejectWithValue({})
    }
    return res.data
    } catch (error) {
     return rejectWithValue({})
 }
}
)

//ユーザーをフォロー
export const FollowUser = createAsyncThunk<boolean, {[email:string]:string},
{ 
  state:RootState,
  rejectValue:string,
  dispatch:AppDispatch 
}>(
'UserSlice/FollowUser',
async (email,{ getState ,rejectWithValue }) => {
  if(window.confirm(`${getState().user.searchUser.name}をフォローします。`)){
      try{
          axios.defaults.withCredentials = true;
          const  res  = await axios.post(`${process.env.NEXT_PUBLIC_POST_FOLLOW_USER}`, email
          )
          if(res.data.success === false){
          return rejectWithValue('取得に失敗しました')
          }
          return res.data.success
      } catch (err:any) {
          return rejectWithValue('取得に失敗しました')
      }
    }
    return rejectWithValue('取得に失敗しました')
})

//フォローしているユーザーの情報を取得
export const getFollow = createAsyncThunk<User[], void,
{ state:RootState,
rejectValue:string 
}>(
'UserSlice/getFollow',
async (_,{ rejectWithValue }) => {
 try{
     axios.defaults.withCredentials = true;
     const  res  = await axios.get(`${process.env.NEXT_PUBLIC_GET_FOLLOW}`)
     if(res.data.success === false) {
      return rejectWithValue('取得に失敗しました')
     }
     return res.data.followData
 } catch (error) {
     return rejectWithValue('取得に失敗しました')
 }
}
)

//自分をフォローしているユーザー(フォロワー)の情報を取得
export const getFollower = createAsyncThunk<User[], void,
{ state:RootState,
rejectValue:string 
}>(
'UserSlice/getFollower',
async (_,{ getState ,rejectWithValue }) => {

 try{
     axios.defaults.withCredentials = true;
     const  res  = await axios.get(`${process.env.NEXT_PUBLIC_GET_GET_FOLOWER}`)
     return res.data.followerData
 } catch (error) {
     return rejectWithValue('取得に失敗しました')
 }
}
)




export const userSlice = createSlice({
name:'user',
initialState,
reducers:{
},
extraReducers: (builder) => {
 builder
 .addCase(findOne.fulfilled,(state, action) => {
  state.searchUser = action.payload
})
.addCase(findOne.rejected,(state, action) => {
  if(action.payload !== undefined){    
    state.searchUser = action.payload
}
})
 .addCase(getFollow.fulfilled,(state, action) => {
     state.followUser = action.payload
 })
 .addCase(getFollow.rejected, (state, action) => {
     if(action.payload !== undefined){
         state.errorStateFollow = action.payload    
     }
 })
 .addCase(getFollower.fulfilled,(state, action) => {
  state.followERUser = action.payload
 })
 .addCase(getFollower.rejected, (state, action) => {
  if(action.payload !== undefined){
      state.errorStateFollowER = action.payload    
  }
})
}
})


export const SelectFollowUser = (state:RootState) => state.user.followUser
export const SelectFollowERUser = (state:RootState) => state.user.followERUser
export const SelectorSearchUser = (state:RootState) => state.user.searchUser 

export default userSlice.reducer;