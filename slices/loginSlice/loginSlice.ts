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
success?:boolean
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
},
success:true
}

//ログイン処理しユーザーデータを取得
export const loginAndFetchUser = createAsyncThunk<User, loginAction,
{ state:RootState,
rejectValue:ErrorResponse
}>(
'loginSlice/loginAndFetchUser',
async ({email, password},{ getState ,rejectWithValue }) => {
try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_POST_LOGIN_URL}`, {
         email,
         password
     })
     if(!data.success) {
        return rejectWithValue({success: false}) 
    }
} catch (err) {
    console.log('ログイン失敗')
    return rejectWithValue({success: false}) 
}
 try{
     axios.defaults.withCredentials = true;
     const  res  = await axios.get(`${process.env.NEXT_PUBLIC_GET_CURRENT_USER_URL}`)
     return res.data.user
 } catch (error) {
    return rejectWithValue({success: false})
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
         return {name:'', _id:''}
     }
     return res.data.user
 } catch (error) {
     return rejectWithValue({name:'',_id:''})
 }
}
)

export const logout = createAsyncThunk<User , void,
{ 
  state:RootState,
  rejectValue:void 
}>(
'loginSlice/logout',
async (_,{ rejectWithValue }) => {
 try{
     axios.defaults.withCredentials = true;
     const  res  = await axios.post(`${process.env.NEXT_PUBLIC_POST_LOGOUT_URL}`)
         return { name:'', _id:''}
 } catch (error) {
    console.log(9)
    return  rejectWithValue()
 }
}
)


export const loginSlice = createSlice({
name:'login',
initialState,
reducers:{
//  logout:(state) => {
//      state.user = {name:'',_id:''}
//  }
},
extraReducers: (builder) => {
 builder
 .addCase(loginAndFetchUser.fulfilled,(state, action) => {
     state.user = action.payload
 })
 .addCase(loginAndFetchUser.rejected,(state, action) => {
    if(action.payload !== undefined){
        state.success = action.payload.success    
    }
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
 builder
 .addCase(logout.fulfilled, (state, action) => {
     const { name, _id } = action.payload
     state.user = {name, _id}
 })
}
})

// export const { logout } = loginSlice.actions;
export const SelectUser = (state:RootState) => state.login.user 
export const SelectSuccess = (state:RootState) => state.login.success
export default loginSlice.reducer;