import { buttonArray } from "../../components/templates/ShowListOfAnyLorB";
import { MyPageTemplate } from "../../components/templates";
import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";

const buttonProps :buttonArray[]=[ 
    {
        textWillShow:"フォロー",
        color:"primary",
        id:1,
        propsPath:'showfollow'
    },
    {
        textWillShow:"フォロワー",
        color:"default",
        id:2,
        propsPath:'showfollower'
    }
]

interface Props {
    paths?: string[]
}

export const Mypage:NextPage<Props> = ({paths}) => {
    return (
        <>
            <MyPageTemplate buttonArrays={buttonProps} paths={paths}/>
        </>
    );
};

export const getServerSideProps :GetServerSideProps = async (req) => {
    const query = req.query 
    return {
      props: {
        paths: query.slug ?? []
      }
    }
  }

export default Mypage;