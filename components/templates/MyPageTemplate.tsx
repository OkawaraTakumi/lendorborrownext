import { MypageUser } from "../organisms";
import { useAppSelector, useAppDispatch } from "../../redux-app/hooks";
import { SelectUser } from "../../slices/loginSlice/loginSlice";
import { useForm, FieldValues } from "react-hook-form";
import { 
    SelectFollowUser,
    SelectFollowERUser,
    getFollow,
    getFollower,
    FollowUser
 } from "../../slices/userSlice/userSlice";
import { Container, Box } from "@material-ui/core";
import { buttonArray } from "./ShowListOfAnyLorB"; 
import { FC, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { ApproveAndReject, FormBuilder } from "../molecules";
import { propsArray } from "../molecules/FormBuilder";
import { ViewRouter } from "../organisms";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import React from 'react';

const useStyles = makeStyles((thema) => ({
    button:{
        margin:'0 0 0 10px'
    },
    ButtonsBox:{
        margin:'40px 0 0 0',
        justifyContent:"flex-start"
    },
    container:{
        margin:'10px 0 0 0'
    },
    Box:{
        margin:'10px 0 0 0'
    },
    SwitchBox:{
        border:"3px solid #3366CC",
        width:'40%'
    }
}))

const propsArrayFor :propsArray[] = [
    {
        label:'メールアドレス',
        name:'email',
        errorText:'入力が不正です',
        pattern:/.+@.+/
    }
]

interface Props {
    buttonArrays:buttonArray[],
    paths?: string[]
}

const MayPageTemplate :FC<Props>= React.forwardRef(({
    buttonArrays,
    paths
},ref) => {
    const user = useAppSelector(SelectUser);
    const classes = useStyles();
    const followUsers = useAppSelector(SelectFollowUser);
    const followERUsers = useAppSelector(SelectFollowERUser);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { formState:{errors} , control, getValues } = useForm<FieldValues>({
        mode:"all"
    })
    const [changeQuery, setchangeQuery] = useState<string>('');

    useEffect(() => {
        dispatch(getFollow())
        dispatch(getFollower())
    },[dispatch])

    const handleFunc = () => {
        const email = getValues();
        dispatch(FollowUser(email));
    }

    const handleRouterPush = (pathArg:string) => {
        router.push({
            pathname: `/mypage/${pathArg}`
        });
    } 

    return (
        <>  
          <Container className={classes.container}>
              <MypageUser user={user}/>
                      <Box>
                          <Box>
                              <FormBuilder
                                  propsArray={propsArrayFor}
                                  control={control}
                                  textWillShow={'フォローする'}
                                  errors={errors}
                                  handleFunc={handleFunc}
                                  className={classes}
                              />
                          </Box>

                          <Box display="flex"  className={classes.ButtonsBox}>
                              {
                                  buttonArrays 
                                  &&
                                  buttonArrays.map((property,index) => {
                                      return (
                                            <ApproveAndReject 
                                                    textWillShow={property.textWillShow}
                                                    className={classes.button}
                                                    color={property.color}
                                                    willDispatch={property.willDispatch}
                                                    handleRouterPush={handleRouterPush}
                                                    paths={property.propsPath}
                                                    key={property.propsPath}
                                            />
                                      )
                                  })
                              }
                          </Box>

                          <Box>
                              <ViewRouter 
                                  paths={paths? paths:[]}
                                  followUsers={followUsers}
                                  followERUsers={followERUsers}
                              />
                          </Box>
                      </Box>
          </Container>
        </>
    )
});



export default MayPageTemplate