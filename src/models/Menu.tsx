import React from "react";
import LanguageIcon from '@mui/icons-material/Language';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DevicesIcon from '@mui/icons-material/Devices';
import App from "../App";
import Devices from "../views/Devices/Devices";
import Networks from "../views/Networks/Networks";

export interface MenuItemInfo {
    name: string,
    path: string,
    icon: React.ReactNode,
    route: React.ReactNode
}

export const MenuItems: MenuItemInfo[] = [
    {
        name: 'Networks',
        path: '/networks',
        icon: <LanguageIcon/>,
        route: <Networks/>
    },
    {
        name: 'Devices',
        path: '/devices',
        icon: <DevicesIcon/>,
        route: <Devices/>
    },
    {
        name: 'Users',
        path: '/users',
        icon: <PersonOutlineIcon/>,
        route: <App/>
    }
]
