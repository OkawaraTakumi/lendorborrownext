import { FC } from "react";
import { BottonAtom } from '../atoms'
import { resObj } from "../../slices/lorbSlice/lorbSlice";
import { useAppDispatch } from "../../redux-app/hooks";
import { approveCreateAction } from "../../slices/lorbSlice/lorbSlice";
import { NextPage } from "next";

interface Props {
    color?: "inherit" | "primary" | "secondary" | "default" ,
    onClick?: (...optionalParams:any[]) => void,
    textWillShow:string,
    className?:string
    item?:resObj
    willDispatch:any
    index?:number
    reloadFunc?:any
}

const ApproveAndReject: NextPage<Props> = ({
    color,
    textWillShow,
    className,
    item,
    willDispatch,
    index,
    reloadFunc
}) => {

    const dispatch = useAppDispatch();
    // const [buttonFlag, setButtonFlag] = useState<boolean>(true);
    const handleApproveOrDelete = () => {
        if(item?.userFrom !== undefined
            && item.userTo !== undefined
            && item.LorBBox._id !== undefined){
            const payload :approveCreateAction<string> = {
                userTo:item.userTo,
                userFrom:item.userFrom,
                id:item.LorBBox._id
            }
            console.log(willDispatch)
            console.log(payload)
            dispatch(willDispatch(payload)).then(() => {
                dispatch(reloadFunc())
            })
        }
        // setButtonFlag(prevState => {
        //     return !prevState
        // })
    }

    return (
        <BottonAtom 
        textWillShow={textWillShow}
        className={className}
        onClick={() => handleApproveOrDelete()}
        color={color} 
        // color={buttonFlag ? color:'secondary'} 
        />
    );
};

export default  ApproveAndReject;