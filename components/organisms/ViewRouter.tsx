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
  const path = paths.join("/")
  switch (path) {
    case "showfollow":
      return <WrapMypageUser userInfo={followUsers} />
    case "showfollower":
      return  <WrapMypageUser userInfo={followERUsers} />
    default:
      return null;
  }
}

export default ViewRouter;