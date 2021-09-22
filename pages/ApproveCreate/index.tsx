import React from "react";
import { useEffect, useState } from "react";
import { 
    makeStyles      
} from "@material-ui/core";
import { useAppSelector } from "../../redux-app/hooks";
import { 
    rejectCreate, 
    approveCreate,
    getOnMaking,
    SelectOnMaking,
    resObj
    } from "../../slices/lorbSlice/lorbSlice";
import { buttonArray } from "../../components/templates/ShowListOfAnyLorB";
import { ShowListOfAnyLorB } from "../../components/templates";

const useStyles = makeStyles({
    approve:{
        margin:'20px 0 0 0'
    },
    button:{
        margin:'0 0 0 10px'
    },
    box:{
        margin:'10px 0 0 0',
        justifyContent:"flex-end"
    }
})

const buttonProps :buttonArray[]=[ 
    {
        textWillShow:"拒否",
        color:"primary",
        willDispatch:rejectCreate,
        id:1
    },
    {
        textWillShow:"承認",
        color:"primary",
        willDispatch:approveCreate,
        id:2
    }
]

const ApproveCreate = () => {
    // const classes = useStyles();
    const classes = '';
    const [items, setItems] = useState<Array<resObj>>() 
    const onMaking = useAppSelector(SelectOnMaking)
    

    useEffect(() => {
        if(onMaking !== undefined ) {
            setItems(onMaking.onMaking)
        }
    },[onMaking])

    return (
        <>  
            <ShowListOfAnyLorB 
                    buttonArray={buttonProps} 
                    classes={classes} 
                    items={items as resObj[]}
                    reloadFunc={getOnMaking}
                    >
                作成依頼のものはありません
            </ShowListOfAnyLorB>
        </>
    );
};

export default ApproveCreate;