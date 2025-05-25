import React from 'react';
import { ChanelList,useChatContect } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChanelSearch,TeamChanelList,TeamChanelPreview } from './';
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'

const SideBar =()=>(
  <div className="channe-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icn1__inner">
        <img src={HospitalIcon} alt="Hospital" width="30"/>
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icn1__inner">
        <img src={LogoutIcon} alt="LogoutIcon" width="30"/>
      </div>
    </div>
  </div>
);

const CompanyHeader=()=>(
  <div className="channel-list__header">
    <p className="channel-list__header__text">Medical Pager</p>

  </div>
)

const  ChanelListContainer = () => {
  return (
    <div>
      <SideBar/>
      <div className="channel-list__list__wrapper">
        <CompanyHeader/>
      </div>

    </div>
  );
};

export default ChanelListContainer;

