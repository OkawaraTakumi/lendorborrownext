import { 
  Container,
  Box,
  makeStyles 
} from "@material-ui/core";
import { 
      BottonAtom,
      TextFieldAtom
       } from "../../components/atoms";
import { useForm, FieldValues } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../redux-app/hooks";
import { SelectUser } from "../../slices/loginSlice/loginSlice";
import { 
  SelectFollowUser, 
  getFollow,
  User
 } from "../../slices/userSlice/userSlice";
import { 
  createLorB, 
  SelectError, 
  setError 
} from "../../slices/lorbSlice/lorbSlice";
import { SelectAtom } from "../../components/atoms";
import { useEffect, useState } from "react";


const useStyles = makeStyles({
  title:{
      margin:'20px 0 0 0'
  },
  inputFlex:{
      display:"flex"
  },
  TextFieldAtom:{
      margin:'0 0 0 20px'
  }
})



const CreateLorB = () => {
  const user = useAppSelector(SelectUser);
  const error = useAppSelector(SelectError);
  const followUser = useAppSelector(SelectFollowUser)
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [selectItemsFollow, setselectItemsFollow] = useState<Array<User>>([])

  useEffect(() => {
      dispatch(getFollow());
  },[])

  useEffect(() => {
      if(user && Array.isArray(followUser)){
          const newUserArray = [user];
          const newFollowArray = newUserArray.concat(followUser)
          setselectItemsFollow(newFollowArray)
      }
  },[user, followUser])

  const { formState:{errors} , control, getValues, handleSubmit} = useForm<FieldValues>({
      mode:"all"
  })
  const onSubmit = (data:any, e:any) => {
      dispatch(setError({success:''}))
      const { title, select, about, userFrom, userTo } = getValues() 
      let userFromName = '';
      let userToName = '';
      let userForApprove :string= '';
      if(userFrom === userTo){
          dispatch(setError({success:'貸し人と借り人は一致することはありません'}))
      }else {
          console.log(1)
          if(userFrom === user._id) {
              userForApprove = userFrom;
              userFromName = user.name;
              const userToNamePrepare = followUser.find((user:any) => {
                  return user._id === String(userTo)
              })?.name
              userToNamePrepare && (userToName = userToNamePrepare)
              console.log(userToName,'To')
          } else if (userTo === user._id) {
              console.log(2)
              userForApprove = userTo;
              userToName = user.name;
              const userFromNamePrepare = followUser.find((user:any) => {
                  return user._id === String(userFrom)
              })?.name
              console.log(userFromNamePrepare,'準備')
              userFromNamePrepare && (userFromName = userFromNamePrepare)
              console.log(userFromName,'From')
          }
          console.log(userFromName,'From')
          console.log(userToName,'To')
          dispatch(createLorB({
              title,
              detailClass:select,
              aboutDetail:about,
              userTo,
              userToName,
              userFrom,
              userFromName,
              userForApprove
          }))
      }
  }
  const onError = (errors:any,e:any) => {
      dispatch(setError({success:'不正な入力が存在します'}))
  }

  return (
      <>
          <Container maxWidth="sm">
                  <form onSubmit={handleSubmit(onSubmit, onError)}>

                  <Box textAlign="center">
                      <div className={classes.title}>
                              {error?.success}
                              <TextFieldAtom 
                                      control={control} 
                                      errors={errors} 
                                      name='title'　
                                      label='タイトル'
                                      fullwidth={true}/>
                              
                      </div>

                      <div>   
                              <TextFieldAtom 
                                      control={control} 
                                      errors={errors} 
                                      name='select'
                                      label='種類'
                                      fullwidth={true}/>
                      </div>

                      <div>
                              <TextFieldAtom 
                                      control={control} 
                                      errors={errors} 
                                      name='about'
                                      label='内容'
                                      fullwidth={true}/>
                      </div>


                      <div className={classes.inputFlex}>
                              <SelectAtom 
                                      selectItems={selectItemsFollow}
                                      control={control} 
                                      errors={errors} 
                                      name='userFrom'
                                      label='貸し人ID'
                                      fullwidth={true}/>

                              {/* <TextFieldAtom 
                                      className={classes}
                                      control={control} 
                                      errors={errors} 
                                      name='userFromName'
                                      label='貸し人名'
                                      fullwidth={true}/> */}
                      </div>

                      <div className={classes.inputFlex}>
                              <SelectAtom 
                                      selectItems={selectItemsFollow}
                                      control={control} 
                                      errors={errors} 
                                      name='userTo'
                                      label='借り人'
                                      fullwidth={true}/>
                              
                              {/* <TextFieldAtom 
                                      className={classes}
                                      control={control} 
                                      errors={errors} 
                                      name='userFromName'
                                      label='借り人名'
                                      fullwidth={true}/> */}
                              
                      </div>

                      <Box display="flex" justifyContent="flex-end">
                          <BottonAtom 
                                  textWillShow='作成' 
                                  color={"primary"} 
                                  type="submit"/>
                      </Box>
                  </Box>
                  </form>
                  

          </Container>
      </>
  );
};

export default CreateLorB;