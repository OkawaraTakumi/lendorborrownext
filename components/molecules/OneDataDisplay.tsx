import { FC } from "react";
import { 
        Table,
        TableBody,
        TableCell,
        TableContainer,
        TableRow,
        Paper  } from "@material-ui/core";
import { resObj } from "../../slices/lorbSlice/lorbSlice";
import { NextPage } from "next";

interface Props {
    item:resObj,
    className?:string
}



const OneDataDisplay :NextPage<Props> = ({
    item,
    className
}) => {




    return (
        <>
            { item && 
                    <div className={className}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">
                                            タイトル
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.LorBBox.title}
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell rowSpan={2} align="center">
                                            貸し借り内容
                                        </TableCell>
                                        <TableCell align="center">
                                            種類：{item.LorBBox.detailClass}
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell align="center">
                                            貸し借り詳細：{item.LorBBox.aboutDetail}
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    

                                    <TableRow>
                                        <TableCell align="center">
                                            貸し借り関係
                                        </TableCell>
                                        <TableCell align="center">
                                            貸し人：{item.userFromName}
                                        </TableCell>
                                        <TableCell align="center">
                                            ⇒
                                        </TableCell>
                                        <TableCell align="center">
                                            借り人：{item.userToName}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
            }
        </>
    );
};

export default OneDataDisplay;