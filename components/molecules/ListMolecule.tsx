import { FC, useEffect } from "react";
import { 
         List,
         ListItem,
         ListItemText
         } from '@material-ui/core';
import TypographyAtoms from "../atoms/TypographyAtoms";
import Link from 'next/link' 
import { NextPage } from "next";

interface classType {
    [classChild:string]:any
}

interface Props {
    willShows:any
    count?:number
    text:string
    className?:classType,
    root: string
}

const ListModule: NextPage<Props> = ({
    willShows,
    text,
    className,
    root
}) => {

    return (
        <div className={className?.list}>
                <TypographyAtoms 
                        variant={"body1"} 
                        align="center"
                        className={className?.box}>
                    {text}
                </TypographyAtoms>
            

            <List>
                {
                    willShows.map((willShow:any, index:number) => {
                       return (
                            <ListItem key={index} className={className?.box}>
                                <Link as={`/${root}/${index}`} href="/lend/[LendId]">
                                        <ListItemText 
                                                primary={willShow.LorBBox.title}
                                                className={className?.box}    
                                        />
                                </Link>
                            </ListItem>
                        )
                    })
                }

            </List>
            
        </div>
    );
};

export default  ListModule;