import React, { useState,useEffect, FC } from "react";
import { useRouter } from "next/router";
import { OneDataDisplay } from "../molecules";
import { useAppSelector, useAppDispatch } from "../../redux-app/hooks";
import { 
    resObj, 
    updateNogotiate,
    keepLorB } from "../../slices/lorbSlice/lorbSlice";
import { RootState } from "../../redux-app/store";
import { Container, makeStyles } from "@material-ui/core";
import { FormBuilder } from "../molecules";
import { useForm, FieldValues } from "react-hook-form";

const useStyles = makeStyles({
    Container:{
        margin:'20px 0 0 0'
    },
    button:{
        margin:'0 0 0 10px'
    },
    TextFieldAtom:{
        margin:'10px 0 0 0',
        textAlign:"center"
    },
    Box:{
        textAlign:"right"
    }
})

interface PropsforChild {
    label:string,
    name:string,
    errorText?:string,
    pattern?:RegExp,
}

const propsArray:PropsforChild[] = [
    {
        label:'交渉アイテム',
        name:'negotiateItem',
        errorText:'交渉アイテムが未入力です'
    },
    {
        label:'交渉内容',
        name:'negotiateDetail',
        errorText:'交渉内容が未入力です'
    },
]

interface Props {
    id:string
    willSelect:(state: RootState) => keepLorB | undefined,
    KeeponProps:keyof keepLorB
}

export const NegotiateTemplate :FC<Props> = ({
    id,
    willSelect,
    KeeponProps
}) => {
    const classes = useStyles()
    const history = useRouter();
    const dispatch = useAppDispatch();
    const [KeepOnWillshow ,setKeepOnWill] = useState<resObj>()
    const [KeepId, setKeepId] = useState<string | undefined>('')
    const [userFrom , setUserFrom] = useState<string | undefined>('')
    const [userTo , setUserTo] = useState<string | undefined>('')
    const KeepOn:keepLorB|undefined = useAppSelector(willSelect)
    useEffect(() => {
        console.log(KeepOn)
        const KeepOnChild = KeepOn && (KeepOn[KeeponProps] as resObj[])
            KeepOnChild && setKeepOnWill(KeepOnChild[Number(id)])
    },[KeepOn, id, KeeponProps])
    useEffect(() => {
        setKeepId(KeepOnWillshow?.LorBBox?._id)
        setUserFrom(KeepOnWillshow?.userFrom)
        setUserTo(KeepOnWillshow?.userTo)
    }, [KeepOnWillshow])
    const { formState:{errors} , control, getValues} = useForm<FieldValues>({
        mode:"all"
    })

    const handleFunc = () => {
        const { negotiateItem, negotiateDetail} = getValues();
        const id = KeepId
        if(
            negotiateItem && 
            negotiateDetail&& 
            id&&
            userFrom&&
            userTo) {
                dispatch(updateNogotiate({ 
                    userFrom,
                    userTo,
                    negotiateItem,
                    negotiateDetail,
                    id
                  }))
            }
            history.push('/')
    }

    return (
        <>
            {
                KeepOnWillshow &&
                <Container maxWidth='sm'>
                    <OneDataDisplay item={KeepOnWillshow} className={classes.Container} />

                    <FormBuilder 
                         propsArray={propsArray} 
                         control={control} 
                         errors={errors} 
                         handleFunc={handleFunc}
                         textWillShow="交渉"
                         className={classes}/>
                </Container>
            }
        </>
    );
};

export default NegotiateTemplate;