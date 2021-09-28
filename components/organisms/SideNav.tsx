import { 
  IconButton,
  Drawer,
  useTheme,
  Divider
  } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons"; 
import { useAppSelector } from "../../redux-app/hooks";
import { SelectUser } from "../../slices/loginSlice/loginSlice";
import { FC } from "react";
import { ListAtom } from '../atoms';
import { NextPage } from "next";
  
interface Props {
handleFrag:() => void,
open:boolean
}

const SideNav :NextPage<Props>= ({
handleFrag,
open
}) => {
const theme = useTheme();
const user = useAppSelector(SelectUser);

return (
 <>
     {user.name &&
     <Drawer
         variant="persistent"
         anchor="left"
         open={open}
     >
         <div>
             <IconButton onClick={handleFrag}>
                 {theme.direction === 'ltr' ? <ChevronLeft/>:<ChevronRight/>}
             </IconButton>
         </div>
         <Divider/>

         <ListAtom ListChild={[user.name]}/>

     </Drawer>
     }
 </>
)
}

export default SideNav;