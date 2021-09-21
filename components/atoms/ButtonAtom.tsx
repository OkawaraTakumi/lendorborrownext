import Button from '@material-ui/core/Button';
import { NextPage } from "next";

interface Props {
    color?: "inherit" | "primary" | "secondary" | "default" ,
    onClick?: (...optionalParams:any[]) => void,
    textWillShow:string,
    disabled?:boolean
    className?:string
    index?:string
    type?:"button" | "reset" | "submit"
}

const ButtonAtom: NextPage<Props> = ({
    color,
    onClick,
    textWillShow,
    disabled,
    className,
    index,
    type
}) => {
    return (
        <Button onClick={onClick} 
                disabled={disabled} 
                color={color} 
                variant={color === "primary"? "contained": "outlined"}
                className={className}
                type={type}>
                    {textWillShow}
        </Button>
    );
};

export default  ButtonAtom;