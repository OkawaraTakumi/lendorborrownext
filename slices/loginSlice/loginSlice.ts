import { createAsyncThunk, 
  createSlice, 
  } from "@reduxjs/toolkit";
import { RootState } from "../../redux-app/store";
import axios, { AxiosAdapter, AxiosResponse } from "axios";


export interface User {
name:string
_id:string
} 

export interface Login {
user:User
} 

export interface ErrorResponse {
success:boolean
}

export interface loginAction {
email:string
password:string
}

const initialState:Login = {
user:{
 name:'',
 _id:''
}
}

//ログイン処理しユーザーデータを取得
export const loginAndFetchUser = createAsyncThunk<User, loginAction,
{ state:RootState,
rejectValue:ErrorResponse 
}>(
'loginSlice/loginAndFetchUser',
async ({email, password},{ getState ,rejectWithValue }) => {
console.log(process.env.NEXT_PUBLIC_POST_LOGIN_URL)
const { data } = await axios.post(`${process.env.NEXT_PUBLIC_POST_LOGIN_URL}`, {
     email,
     password
 })
 console.log(data,'loginのデータです')
 if(!data.success) {
     return data.success
 }
 try{
     axios.defaults.withCredentials = true;
     const  res  = await axios.get(`${process.env.NEXT_PUBLIC_GET_CURRENT_USER_URL}`)
     console.log(res,'getcurrentuser')
     return res.data.user
 } catch (error) {
     console.log(9)
 }
}
)

//Homeロード時にユーザーデータを取得
export const fetchUser = createAsyncThunk<User, void,
{ state:RootState,
rejectValue:User 
}>(
'loginSlice/fetchUser',
async (_,{ rejectWithValue }) => {
 try{
     axios.defaults.withCredentials = true;
     const  res  = await axios.get(`${process.env.NEXT_PUBLIC_GET_CURRENT_USER_URL}`)
     if(res.data.success === false) {
         return {name:'',id:''}
     }
     return res.data.user
 } catch (error) {
     return rejectWithValue({name:'',_id:''})
 }
}
)


export const loginSlice = createSlice({
name:'login',
initialState,
reducers:{
 logout:(state) => {
     console.log(state)
     state.user = {name:'',_id:''}
 }
},
extraReducers: (builder) => {
 builder
 .addCase(loginAndFetchUser.fulfilled,(state, action) => {
     state.user = action.payload
 })

 builder
 .addCase(fetchUser.fulfilled, (state, action) => {
     const { name, _id } = action.payload
     state.user = {name, _id}
 })
 .addCase(fetchUser.rejected, (state, action) => {
     if(action.payload !== undefined){
         state.user = action.payload    
     }
 })
}
})

export const { logout } = loginSlice.actions;
export const SelectUser = (state:RootState) => state.login.user 

export default loginSlice.reducer;