import { FC } from "react";
import { Button, PropTypes,
         Typography
         } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography'
import { NextPage } from "next";

interface Props {
    children:string
    variant:Variant
    align?:PropTypes.Alignment
    className?:string 
    style?:object,
    href?:string,
}

const TypographyAtoms: NextPage<Props> = ({
    children,
    variant,
    align,
    style,
    className,
    href
}) => {
    return (
        <a href={href}>
            <Typography
                variant={variant}
                align={align} 
                style={style}
                className={className}
            >
                {children}
            </Typography>
        </a>
    );
};

export default  TypographyAtoms;