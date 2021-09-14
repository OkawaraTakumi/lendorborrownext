import { TypographyAtoms } from "../atoms";
import { makeStyles, Box } from "@material-ui/core"; 
import { User } from "../../slices/loginSlice/loginSlice"; 
import { FC } from "react";
import { NextPage } from "next";

const useStyles = makeStyles((thema) => ({
    TypoBox: {
        margin:'25px 0 0 25px'
    },
    TypoName:{
        fontSize:"20px",
        fontWeight:"bold"
    },
    approve:{
        margin:'20px 0 0 0'
    },
    button:{
        margin:'0 0 0 10px'
    },
    box:{
        margin:'10px 0 0 0',
        justifyContent:"flex-start"
    }
}))

interface Props {
    user:User
}



const MypageUser :NextPage<Props>= ({
    user
}) => {
    
    const classes = useStyles()
    return (
        <>
            <Box>

                <TypographyAtoms 
                            variant={"body1"} 
                            align="left"
                            className={classes.TypoName}
                            >
                        {`userName：${user.name}`}
                </TypographyAtoms>

                <TypographyAtoms 
                            variant={"subtitle2"} 
                            align="left"
                            >
                        {`ID：${user._id}`}
                </TypographyAtoms>
            </Box>
        </>
    )
}

export default MypageUser