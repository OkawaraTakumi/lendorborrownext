import { FC } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import {TextField} from '@material-ui/core';
import { NextPage } from "next";

export interface Props {
    label:string,
    name:string,
    errorText?:string,
    pattern?:RegExp,
    control:Control,
    errors:FieldErrors,
    fullwidth?:boolean
    className?:{
        [propsClass:string]:string
    }
}


const TextFieldAtom: NextPage<Props> = ({
    label,
    errorText,
    name,
    pattern,
    control,
    errors,
    fullwidth,
    className
}) => {


    return (
        <div className={className?.TextFieldAtom}>
            <Controller
                control={control}
                defaultValue=''
                name={name}
                rules={{
                    required:true,
                    pattern:pattern
                }}
                render={({ field }) => (
                    <TextField
                            {...field}
                            fullWidth={fullwidth}
                            label={label}
                            error={Boolean(errors[name])}
                            helperText={(errors[name] !== undefined) && 
                                                        (
                                                            (errors[name].type === "required" ? '入力して下さい':'')||
                                                            (errors[name].type === "pattern" ? `${errorText}`:'')
                                                        )}
                  />           
                  )}
                  />
        </div>
        
    );
};

export default  TextFieldAtom;