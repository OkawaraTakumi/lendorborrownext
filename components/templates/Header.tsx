import { BottonAtom } from "../atoms";
import { AppBar,
         makeStyles,
         Toolbar,
         Typography,
         CssBaseline
         } from "@material-ui/core";
import { IconButton } from "@material-ui/core";         
import { Menu } from "@material-ui/icons";
import  Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../../redux-app/hooks";
import { SelectUser, fetchUser, logout} from "../../slices/loginSlice/loginSlice";
import { useEffect, useState } from "react";
import SideNav from "../organisms/SideNav";
import { getLorBKeepLorB, getOnBeingSuggested, getOnMaking } from "../../slices/lorbSlice/lorbSlice";


const useStyles = makeStyles((thema) => ({
    root: {
        flexGrow: 1,
    },
    header: {
        backgroundColor:"orange"
    },
    button: {
        marginLeft: thema.spacing(2)
    },
    logo:{
        fontSize: "18px",
        flexGrow:1
    },
}))

const Header = () => {
    const classes = useStyles();
    const user = useAppSelector(SelectUser);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        dispatch(fetchUser())
        dispatch(getOnMaking())
        dispatch(getOnBeingSuggested())
        dispatch(getLorBKeepLorB())
    },[dispatch])

    const handleLogout = () => {
        dispatch(logout())
        router.push('/')
    }

    const handleFlag = () => {
        setOpen(prevState => {
            return !prevState
        })
    }
                        
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="static" className={classes.header}>
                <Toolbar>
                    <IconButton 
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleFlag}
                            >
                            <Menu />
                    </IconButton>
                    <Typography variant="h4" className={classes.logo}>
                        <Link href="/">
                            貸し借りDB
                        </Link>
                    </Typography> 

                    <div>
                        {user && user.name && <span>ようこそ{user.name}さん</span>}
                    </div>
                    
                        {
                            user.name &&
                            <BottonAtom 
                                    onClick={() => router.push('/createlorb')} 
                                    color={"primary"} 
                                    textWillShow={"貸し借り作成"}
                                    className={classes.button}
                            />
                        }

                        {
                            user.name &&
                            <BottonAtom 
                                    onClick={() => router.push('/completed')} 
                                    color={"primary"} 
                                    textWillShow={"貸し借り履歴"}
                                    className={classes.button}
                            />
                        }

                        {
                            user.name ? 
                            <BottonAtom 
                                    onClick={() => handleLogout()} 
                                    color={"primary"} 
                                    textWillShow={"ログアウト"}
                                    className={classes.button}
                            /> :
                            <BottonAtom 
                                    onClick={() => router.push('/login')} 
                                    color={"primary"} 
                                    textWillShow={"ログイン"}
                                    className={classes.button}
                            />
                                                
                        }
                </Toolbar>
            </AppBar>
            { user.name && <SideNav handleFrag={handleFlag} open={open}/> }
        </div>
    )
}

export default Header;