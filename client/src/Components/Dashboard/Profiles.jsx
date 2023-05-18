import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Tabs, TabsHeader, TabsBody, Tab, TabPanel,} from "@material-tailwind/react";
import {Card, CardBody,CardFooter,Typography,Button,CardHeader, Avatar, Popover,PopoverHandler,PopoverContent,} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import blog1Img from '../../Assets/Images/blog.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faBookmark, faComment, faHeart, faEllipsis, } from '@fortawesome/free-solid-svg-icons';
import userAvatar from '../../Assets/Images/emma.jpg'
import {PencilSquareIcon, UserCircleIcon, BookmarkIcon,} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import TopMenu from "../TopMenu";
// import { RenderMeTab } from "./Profile";
import { RenderMeTab } from "./EditProfile";
import { handleLikeButton } from "../redux/UserPostSlice";
import { allUserPosts } from "../redux/UserPostSlice";
import { UserPosts } from "./UserPosts";

// const user = useSelector((state)=>state.user.user)



export default function Profiles() {

  const tabData = [
    {
      label: "My Posts",
      value: "my posts",
      icon: PencilSquareIcon,
      desc: <UserPosts/>,
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
    <div>
        <Tabs value="dashboard">
        <TabsHeader>
            {tabData.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
                <div className="flex items-center gap-2">
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}
                </div>
            </Tab>
            ))}
        </TabsHeader>
        <TabsBody>
            {tabData.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
                {desc}
            </TabPanel>
            ))}
        </TabsBody>
        </Tabs>
    </div>
  );
}