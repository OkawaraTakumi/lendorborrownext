import { FC } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import {Select, MenuItem} from '@material-ui/core';
import { User } from "../../slices/loginSlice/loginSlice"; 
import { NextPage } from "next";

export interface Props {
    label:string,
    name:string,
    pattern?:RegExp,
    control:Control,
    errors:FieldErrors,
    fullwidth?:boolean
    className?:{
        [propsClass:string]:string
    }
    selectItems:User[]
}


const SelectAtom: NextPage<Props> = ({
    label,
    name,
    pattern,
    control,
    errors,
    fullwidth,
    className,
    selectItems
}) => {


    return (
        <div className={className?.TextFieldAtom}>
            <Controller
                control={control}
                name={name}
                defaultValue=''
                render={({ field }) => (
                    <Select
                            {...field}
                    >
                        {
                            selectItems.map((item, index) => {
                                return (
                                    <MenuItem  value={item._id} key={index}>{item.name}</MenuItem>
                                )
                            })
                        }
                    </Select>           
                  )}
                  />
        </div>
    );
};

export default  SelectAtom;