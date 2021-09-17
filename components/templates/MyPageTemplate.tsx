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
import { FC, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { ApproveAndReject, FormBuilder } from "../molecules";
import { propsArray } from "../molecules/FormBuilder";
import { WrapMypageUser } from ".";
import { 
    Switch,
    Route,
    useRouteMatch,
   } from 'react-router-dom';
import Link from "next/link";

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
    buttonArrays:buttonArray[]
}

const MayPageTemplate :FC<Props>= ({
    buttonArrays
}) => {
    const user = useAppSelector(SelectUser);
    const classes = useStyles();
    const followUsers = useAppSelector(SelectFollowUser);
    const followERUsers = useAppSelector(SelectFollowERUser);
    const dispatch = useAppDispatch();
    const match = useRouteMatch();
    const { formState:{errors} , control, getValues } = useForm<FieldValues>({
        mode:"all"
    })

    useEffect(() => {
        dispatch(getFollow())
        dispatch(getFollower())
    },[dispatch])

    const handleFunc = () => {
        const email = getValues();
        console.log(email)
        dispatch(FollowUser(email));
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
                                        buttonArrays.map((property) => {
                                            return (
                                                <Link 
                                                    href={`${property.propsPath}`} 
                                                    key={property.id}
                                                >
                                                    <ApproveAndReject 
                                                            textWillShow={property.textWillShow}
                                                            className={classes.button}
                                                            color={property.color}
                                                            willDispatch={property.willDispatch}
                                                    />
                                                </Link>
                                            )
                                        })
                                    }
                                </Box>

                                <Box>
                                        <Switch>
                                            <Route 
                                                path={`${match.path}/showfollow`}   
                                            >
                                                <WrapMypageUser userInfo={followUsers} />
                                            </Route>

                                            <Route 
                                                path={`${match.path}/showfollower`}  
                                            >
                                                <WrapMypageUser userInfo={followERUsers} />
                                            </Route>
                                        </Switch>                                                       
                                </Box>
                        </Box>
            </Container>
        </>
    )
}

export default MayPageTemplate