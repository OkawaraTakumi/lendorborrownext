import { 
  createAsyncThunk, 
  createSlice, 
  PayloadAction, 
  current
} from "@reduxjs/toolkit";
import { RootState } from "../../redux-app/store";
import axios from "axios";

//AsyncThuncのpayloadの型
export interface approveCreateAction<T> {
  userFrom:T,
  userTo:T,
  id:T
} 

export interface CreateLorBAction<T>{
title:T,
detailClass:T,
aboutDetail:T,
userTo:T,
userToName:T,
userFrom:T,
userFromName:T,
userForApprove:T
}

export interface updateNegotiateArgs {
  userFrom:string,
  userTo:string
  negotiateItem:string,
  negotiateDetail:string,
  id:string
}

//ThunkAPIの型
export interface ErrorResponse {
  success:boolean | string
  }

export interface resObj {
  LorBBox: {
      LorBState?: number, 
      negotiateItem?: string, 
      negotiateDetail?: string, 
      userForApprove?: string, 
      title:string
      detailClass: string
      aboutDetail:string
      _id?: string
  }
  createTime?: string
  userFrom?: string
  userFromName?:string
  userTo?: string
  userToName?:string
  _id?: string
}

export interface onMaking {
  onMaking:Array<resObj>,
  count:number
}

export interface onBeingSuggested {
  onBeingSuggested:Array<resObj>,
  count:number
}

export interface keepLorB {
  LKeepOn:Array<resObj>,
  LCount:number,
  BKeepOn:Array<resObj>,
  BCount:number
}

export interface AllLorB {
  allLorB:unknown
}

export interface AllLorBIhave {
  allLorB:unknown
}

export interface Completed {
  completed:{
      LCompleted:Array<resObj>
      BCompleted:Array<resObj>
  }
}




interface LorB {
  onMaking?:onMaking,
  onBeingSuggested?:onBeingSuggested,
  keepLorB?:keepLorB,
  AllLorB?:AllLorB,
  AllLorBIhave?:AllLorBIhave,
  Completed?:Completed,
  error?:ErrorResponse
}


const initialState:LorB = {
}

//ログイン処理しユーザーデータを取得
export const createLorB = createAsyncThunk<boolean, CreateLorBAction<string>,
{ state:RootState,
rejectValue:ErrorResponse 
}>(
'createSlice/createLorB',
async ({title,
      detailClass,
      aboutDetail,
      userTo,
      userToName,
      userFrom,
      userFromName,
      userForApprove},
      { getState ,rejectWithValue }) => {
 try {
     const res = await axios.post(`${process.env.POST_CREATE_LORB}`, {
       title,
       detailClass,
       aboutDetail,
       userTo,
       userToName,
       userFrom,
       userFromName,
       userForApprove
      })
      return res.data.success
 } catch(err) {
     return rejectWithValue({success:'作成に失敗'})
 }
}
)

//貸し借りテーブルに貸し借りテーブルの追加
export const updateLorBDetail = createAsyncThunk<boolean, CreateLorBAction<string>,
{ 
  state:RootState,
  rejectValue:ErrorResponse 
}>(
'createSlice/updateLorBDetail',
async ({
      title,
      detailClass,
      aboutDetail,
      userTo,
      userFrom,
      userForApprove
      },
      { getState ,rejectWithValue }) => {
const res = await axios.post(`${process.env.POST_UPDATE_LORB_DETAIL}`, {
  title,
  detailClass,
  aboutDetail,
  userTo,
  userFrom,
  userForApprove
 })
 return res.data.success
}
)

//貸し借りテーブルの作成または追加の承認
export const approveCreate = createAsyncThunk<boolean, approveCreateAction<string>,
{ 
  state:RootState,
  rejectValue:ErrorResponse 
}>(
'createSlice/approveCreate',
async (
      {
          userTo,
          userFrom,
          id        
      },
      { getState ,rejectWithValue }) => {
const res = await axios.put(`${process.env.PUT_APPROVE_CREATE}`, {
  userTo,
  userFrom,
  id
 })
 return res.data.success
}
)

//貸し借りテーブルの作成または追加の拒否
export const rejectCreate = createAsyncThunk<boolean, approveCreateAction<string>,
{ 
  state:RootState,
  rejectValue:ErrorResponse 
}>(
'createSlice/rejectCreate',
async ({
          userTo,
          userFrom,
          id        
      },
      { getState ,rejectWithValue }) => {
const res = await axios.put(`${process.env.PUT_REJECT_CREATE}`, {
  userTo,
  userFrom,
  id
 })
 return res.data.success
}
)

//作成中の貸し借りテーブルの取得
export const getOnMaking = createAsyncThunk<onMaking, void,
{ 
  state:RootState,
  rejectValue:ErrorResponse 
}>(
'createSlice/getOnMaking',
async () => {
try {
    const res = await axios.get(`${process.env.GET_GET_ONMAKING}`).catch(() => {console.log('通信エラー')})
    res && console.log(res.data.onMaking)
    return res && res.data.onMaking
} catch(err) {
  console.log('失敗')
}
console.log(9)
}
)

//交渉中の貸し借りテーブルの削除
export const getOnBeingSuggested = createAsyncThunk<onBeingSuggested, void,
{ 
  state:RootState,
  rejectValue:ErrorResponse 
}>(
'createSlice/getOnBeingSuggested',
async () => {
  try {
      const res = await axios.get(`${process.env.GET_GET_ONBEING_SUGGESTED}`)
      .catch(() => {console.log('通信エラー')})
      res && console.log(res.data.onBeingSuggested)
      return res && res.data.onBeingSuggested
  } catch(err) {
    console.log('失敗')
  }
  console.log(9)
}
)

//継続中の貸し借りテーブルの取得
export const getLorBKeepLorB = createAsyncThunk<keepLorB, void,
{ 
  state:RootState,
  rejectValue:ErrorResponse 
}>(
'createSlice/getLorBKeepLorB',
async () => {
  try {
      const res = await axios.get(`${process.env.GET_GET_LORB_KEEP_LORB}`)
      .catch(() => {console.log('通信エラー')})
      // res && console.log(res.data.keepLorB)
      return res &&  res.data.keepLorB
  } catch(err) {
    console.log('失敗')
  }
  console.log(9)
}
)

//自分だけでなくすべての貸し借りの取得
export const getAllLorB = createAsyncThunk<AllLorB, void,
{ 
  state:RootState,
  rejectValue:ErrorResponse 
}>(
'createSlice/getAllLorB',
async () => {
const res = await axios.get(`${process.env.GET_GET_ALL_LORB}`)
 return res.data
}
)

//自分の所持しているすべての状態の貸し借りテーブルを取得
export const getLorBIhave = createAsyncThunk<AllLorBIhave, void,
{ 
  state:RootState,
  rejectValue:ErrorResponse 
}>(
'createSlice/getLorBIhave',
async () => {
const res = await axios.get(`${process.env.GET_GET_LORB_IHAVE}`)
 return res.data
}
)


//貸し借りが完了している貸し借りデータの取得
export const getLorBCompleted = createAsyncThunk<Completed, void,
{ 
  state:RootState,
  rejectValue:ErrorResponse 
}>(
'createSlice/getLorBCompleted',
async () => {
const res = await axios.get(`${process.env.GET_LORB_COMPLETED}`)
 return res.data
}
)

//指定した貸し借りの交渉データを作成または更新
export const updateNogotiate = createAsyncThunk<boolean, updateNegotiateArgs,
{ 
  state:RootState,
  rejectValue:ErrorResponse 
}>(
'createSlice/updateNogotiate',
async ({ 
  userFrom,
  userTo,
  negotiateItem,
  negotiateDetail,
  id
}) => {
const res = await axios.put(`${process.env.PUT_UPDATE_NEGOTIATE}`,{ 
  userFrom,
  userTo,
  negotiateItem,
  negotiateDetail,
  id
})
 return res.data.success
}
)

//交渉を拒否
export const rejectNegotiate = createAsyncThunk<boolean, approveCreateAction<string>,
{ 
  state:RootState,
  rejectValue:ErrorResponse 
}>(
'createSlice/rejectCreate',
async ({
          userTo,
          userFrom,
          id        
      },
      { getState ,rejectWithValue }) => {
console.log('RejectNegotiateが呼び出されました')
const res = await axios.put(`${process.env.PUT_REJECT_NEGOTIATE}`, {
  userTo,
  userFrom,
  id
 })
 return res.data.success
}
)

//任意の貸し借りデータを論理削除
export const deleteLorBtable = createAsyncThunk<boolean, approveCreateAction<string>,
{ 
  state:RootState,
  rejectValue:ErrorResponse 
}>(
'createSlice/deleteLorBtable',
async ({
  userTo,
  userFrom,
  id
}) => {
const res = await axios.put(`${process.env.PUT_DELETE_LORB_TABLE}`,{
  userTo,
  userFrom,
  id
})
 return res.data.success
}
)


export const LorBSlice = createSlice({
name:'lorb',
initialState,
reducers:{
  setError:(state,action:PayloadAction<ErrorResponse>) => {
      state.error = action.payload;
  }
},
extraReducers: (builder) => {
  builder
  .addCase(getOnMaking.fulfilled, (state, action) =>{
      state.onMaking = action.payload
  })
  .addCase(getOnBeingSuggested.fulfilled, (state, action) =>{
      state.onBeingSuggested = action.payload
  })
  .addCase(getLorBKeepLorB.fulfilled, (state, action) =>{
      state.keepLorB = action.payload
  })
  .addCase(getAllLorB.fulfilled, (state, action) =>{
      state.AllLorB = action.payload
  })
  .addCase(getLorBIhave.fulfilled, (state, action) =>{
      state.AllLorBIhave = action.payload
  })
  .addCase(getLorBCompleted.fulfilled, (state, action) =>{
      state.Completed = action.payload
  })
  .addCase(createLorB.rejected, (state, action) => {
      state.error = action.payload
  })
}
})

// export const { updateOnMaking } = LorBSlice.actions;
export const { setError } = LorBSlice.actions

export const SelectOnMaking = (state:RootState) => state.lorb.onMaking
export const SelectonBeingSuggested = (state:RootState) => state.lorb.onBeingSuggested
export const SelectkeepLorB = (state:RootState) => state.lorb.keepLorB
export const SelectAllLorB = (state:RootState) => state.lorb.AllLorB
export const SelectAllLorBIhave = (state:RootState) => state.lorb.AllLorBIhave
export const SelectCompleted = (state:RootState) => state.lorb.Completed
export const SelectError = (state:RootState) => state.lorb.error

export default LorBSlice.reducer;