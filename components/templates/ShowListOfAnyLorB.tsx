import { FC } from "react";
import { 
    Container,
    Box        
} from "@material-ui/core";
import { ApproveAndReject } from "../molecules";
import { OneDataDisplay } from '../molecules'
import { resObj } from "../../slices/lorbSlice/lorbSlice";
import { useEffect } from "react";

export interface buttonArray {
    textWillShow:string
    color:"inherit" | "primary" | "secondary" | "default"
    willDispatch?:any,
    id:number,
    propsPath?:string
}

interface Props {
    children:string,
    classes:any,
    items:resObj[],
    buttonArray:buttonArray[],
    reloadFunc?:any
}

const ShowListOfAnyLorB : FC<Props>= ({
    children,
    classes,
    items,
    buttonArray,
    reloadFunc
}) => {
    useEffect(() => {
        console.log(items)
    })

    return (
        <>  
            { items && (Array.isArray(items) && Boolean(items.length)) ?   
                (items?.map((item, index) => {
                    return (
                    <Container key={index} maxWidth='sm' >
                        <OneDataDisplay item={item} className={classes.approve}/>
                        <Box display="flex"  className={classes.box}>
                            {
                                buttonArray 
                                &&
                                buttonArray.map((property) => {
                                    return (
                                        <ApproveAndReject 
                                                textWillShow={property.textWillShow}
                                                className={classes.button}
                                                color={property.color}
                                                item={item}
                                                willDispatch={property.willDispatch}
                                                index={index}
                                                key={property.id}
                                                reloadFunc={reloadFunc}
                                        />
                                    )
                                })
                                
                            }
                        </Box>
                    </Container>
                    )
                })
                ):
                <Box>
                    {children}
                </Box>  
            }
        </>
    );
};

export default ShowListOfAnyLorB;