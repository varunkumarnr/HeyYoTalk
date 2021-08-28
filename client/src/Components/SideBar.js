import React from "react";

import ChannelList from "./Channel/ChannelList";
import "../Styles/Sidebar.css";
import ServerList from "./Server/ServerList";
import MessagesList from "./Message/Message";
import Members from "./Members/Members";
export const SideBar = () => {
  return (
    <div className='main-SideBar'>
      <ServerList />
      <ChannelList />
      <MessagesList />
      <Members />
    </div>
  );
};
