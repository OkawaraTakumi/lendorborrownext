import { MypageUser } from "../organisms";
import { User } from "../../slices/userSlice/userSlice";
import React, { FC } from "react";
import { 
    Box, 
    makeStyles,
    Divider
 } from '@material-ui/core'

interface Props {
    userInfo:User[]
}

const useStyles = makeStyles((thema) => ({
    SwitchBox:{
        border:"3px solid #3366CC",
        width:'40%',
        borderRadius:'5px'
    }
}))

const WrapMypageUser :FC<Props>= ({
    userInfo
}) => {
    const classes = useStyles();
    return (
        <>
            {
                        userInfo.length >= 1  &&
                        <Box className={classes.SwitchBox}>
                            {
                                    userInfo.map((user) => {
                                    return (
                                        <React.Fragment key={user._id}>
                                            <MypageUser 
                                                user={user}
                                            />
                                            <Divider/>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </Box>
            }
        </>
    )
}

export default WrapMypageUser;