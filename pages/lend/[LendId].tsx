import { SelectkeepLorB } from "../../slices/lorbSlice/lorbSlice";
import { NegotiateTemplate } from "../../components/templates";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useEffect } from "react";

interface Props {
  LendId:string
}

export const Lend :NextPage<Props>= ({
  LendId
}) => {
  useEffect(() => {
    console.log(LendId)
  },[])

    return (
        <>
            {
                <NegotiateTemplate
                        id={LendId}
                        willSelect={SelectkeepLorB}
                        KeeponProps="LKeepOn"
                />
            }
        </>
    );
};

export const getServerSideProps :GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { LendId } = context.query;
  return { 
    props:{
      LendId
  } }
}

export default Lend;