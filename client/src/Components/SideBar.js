import React from "react";

import ChannelList from "./Channel/ChannelList";
import "../Styles/Sidebar.css";
import ServerList from "./Server/ServerList";
export const SideBar = () => {
  return (
    <div className='main-SideBar'>
      <ServerList />
      <ChannelList />
    </div>
  );
};
