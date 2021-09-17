import { SelectkeepLorB } from "../../slices/lorbSlice/lorbSlice";
import { NegotiateTemplate } from "../../components/templates";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  id:string
}

export const Lend :NextPage<Props>= ({
  id
}) => {
    return (
        <>
            {
                <NegotiateTemplate
                        id={id}
                        willSelect={SelectkeepLorB}
                        KeeponProps="LKeepOn"
                />
            }
        </>
    );
};

export const getServerSideProps :GetServerSideProps = async (context) => {
  const { id } = context.query;
  console.log(context.query)
  return { 
    props:{
      id
  } }
}

export default Lend;