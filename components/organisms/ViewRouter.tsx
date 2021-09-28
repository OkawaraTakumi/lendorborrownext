import { NextPage } from "next"
import { WrapMypageUser } from "../templates"

interface Props {
  paths:string[]
  followUsers:any
  followERUsers:any
}

const ViewRouter :NextPage<Props> = ({
  paths,
  followUsers,
  followERUsers
}) => {
  switch (paths[0]) {
    case "showfollow":
      return <WrapMypageUser userInfo={followUsers} />
    case "showfollower":
      return  <WrapMypageUser userInfo={followERUsers} />
    default:
      return <p>path is null</p>;
  }
}

export default ViewRouter;