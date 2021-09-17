import { FC, useState } from "react";
import { 
    Container,
    Box,
     } from "@material-ui/core";
import {  Control, FieldErrors } from "react-hook-form";
import { TextFieldAtom } from "../atoms";
import { User } from "../../slices/userSlice/userSlice";
import { NextPage } from "next";

interface propsForFieldType {
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

interface Props {
    propsFprField:propsForFieldType
    users?:User[]
}

const FollowMolecules :NextPage<Props>= ({
    propsFprField
}) => {
    return (
        <Container>
            <Box>
                <Box>
                    <Box>
                        <Box>ユーザーをフォロー</Box>
                    </Box>

                    <Box>
                        <Box>
                            <TextFieldAtom 
                                control={propsFprField.control}
                                label={propsFprField.label}
                                name={propsFprField.name}
                                errors={propsFprField.errors}
                                errorText={propsFprField.errorText}
                                pattern={propsFprField.pattern}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default FollowMolecules 