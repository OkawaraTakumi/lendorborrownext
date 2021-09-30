import { SelectkeepLorB } from "../../slices/lorbSlice/lorbSlice";
import { NegotiateTemplate } from "../../components/templates";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  id:string
}
export const Borrow:NextPage<Props> = ({
  id
}) => {
    const router = useRouter();

    return (
        <>
                <NegotiateTemplate
                        id={id}
                        willSelect={SelectkeepLorB}
                        KeeponProps="BKeepOn"/>
        </>
    );
};

export const getServerSideProps :GetServerSideProps = async (context) => {
    const { id } = context.query;

    return { 
      props:{
        id
    } }
}

export default Borrow;