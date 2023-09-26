import React, { useEffect } from "react";
import {Tabs, TabsHeader, TabsBody, Tab, TabPanel,} from "@material-tailwind/react";
import {PencilSquareIcon, UserCircleIcon, BookmarkIcon,} from "@heroicons/react/24/solid";
import { RenderMeTab } from "./EditProfile";
import { userDetails } from "../redux/UserSlice";
import { useSelector } from "react-redux";
// import { selectAllPosts } from "../redux/PostsSlice";
import Subscriber from "./Subscriber";
import UserPost from "./UserPost";
import Posts from "./Posts";
import { useNavigate } from "react-router-dom";
import { user } from "../redux/UserDataSlice";

export default function Profiles({accessToken}) {
  const userData = useSelector(user)
  const userdetails = useSelector(userDetails)
  // const postArray = useSelector(selectAllPosts)
  const navigateTo = useNavigate()
  useEffect(()=>{
    if(!accessToken){
      navigateTo('/login')
    }
   })
 
  const tabData = [
    {
      label: "My Posts",
      value: "my posts",
      icon: PencilSquareIcon,
      desc: userData && userData.role !=='subscriber' ? <Subscriber /> : 
      <UserPost accessToken={accessToken}
      />,
    },
    {
        label: "Bookmarks",
        value: "Bookmarks",
        icon: BookmarkIcon,
        desc: "You have not bookmarked any post",
      },
    {
      label: "Settings",
      value: "settings",
      icon: UserCircleIcon,
      desc: <RenderMeTab />,
    },
  ];
   
  return (
    <div className=" z-0">
      {
        !accessToken ? 
        <p>login</p>
        :
        <div>
          <Tabs value="dashboard">
          <TabsHeader>
              {tabData.map(({ label, value, icon }) => (
              <Tab key={value} value={value}>
                  <div className="flex items-center gap-2">
                  {React.createElement(icon, { className: "w-5 h-5 md:w-7 md:h-7" })}
                  <span className="md:text-lg">{label}</span>
                  </div>
              </Tab>
              ))}
          </TabsHeader>
          <TabsBody className="">
              {tabData.map(({ value, desc }) => (
              <TabPanel key={value} value={value} className=' '>
                    <div>{desc}</div>
                </TabPanel>
              ))}
          </TabsBody>
          </Tabs>
        </div>
      }
    </div>
  );
}