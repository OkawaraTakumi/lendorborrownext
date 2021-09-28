import { FC } from "react";
import { Control, FieldErrors } from "react-hook-form";
import {
    BottonAtom,
    TextFieldAtom
} from '../atoms'
import { Box } from '@material-ui/core'
import { NextPage } from "next";

// import { Props as propsArray } from '../../component/atoms/TextFieldAtom'

export interface propsArray {
    label:string,
    name:string,
    errorText?:string,
    pattern?:RegExp,
}


interface Props {
    propsArray:propsArray[],
    control:Control,
    errors:FieldErrors,
    handleFunc:(...handleArgs:any[]) => void,
    onSubmit?:(...handleArgs:any[]) => any,
    handleSubmit?:(...handleArgs:any[]) => any
    textWillShow:string,
    className?:{
        [propsClass:string]:string
    }
    type?: "button" | "reset" | "submit"
}


const FormBuilder:NextPage<Props> = ({
    propsArray,
    control,
    errors,
    handleFunc,
    onSubmit,
    handleSubmit,
    textWillShow,
    className,
    type
}) => {

    

    return (
        <>
            <form onSubmit={handleSubmit && handleSubmit(onSubmit)}>
                {
                    propsArray.map((props, index) => (
                        <TextFieldAtom 
                                {...props} 
                                control={control} 
                                errors={errors} 
                                key={index}
                                className={className}
                        >
                        </TextFieldAtom>
                    ))
                }       
                    <Box className={className?.Box}>
                        <BottonAtom 
                            onClick={() => handleFunc()} 
                            color={"primary"} 
                            textWillShow={textWillShow} />      
                    </Box>
            </form>
        </>
    );
};

export default FormBuilder;