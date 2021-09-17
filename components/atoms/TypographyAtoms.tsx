import { FC } from "react";
import { PropTypes,
         Typography
         } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography'
import { NextPage } from "next";

interface Props {
    children:string
    variant:Variant
    align?:PropTypes.Alignment
    className?:string 
    style?:object
}

const TypographyAtoms: NextPage<Props> = ({
    children,
    variant,
    align,
    style,
    className
}) => {
    return (
        <Typography
            variant={variant}
            align={align} 
            style={style}
            className={className}
        >
            {children}
        </Typography>
    );
};

export default  TypographyAtoms;