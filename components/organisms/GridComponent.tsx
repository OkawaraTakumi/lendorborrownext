import { FC } from "react";
import { 
    Grid, GridSpacing
 } from "@material-ui/core";
import { NextPage } from "next";

interface Props {
    children:any
    spacing:GridSpacing
}

export const GridComponent :NextPage<Props> = ({
    children,
    spacing
}) => {


    return (
        <Grid container spacing={spacing}>
            {children}
        </Grid>
        
    );
};


export default GridComponent;