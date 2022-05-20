import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {MenuItems} from "./models/Menu";
import App from "./App";
import Devices from "./views/Devices/Devices";
import Networks from "./views/Networks/Networks";
import EditDevice from "./views/Devices/EditDevice";
import AddDevice from "./views/Devices/AddDevice";
import {Typography} from "@mui/material";
import AddNetwork from "./views/Networks/AddNetwork";
import EditNetwork from "./views/Networks/EditNetwork";
import Login from "./views/Auth/Login";
import {ProtectedRoute} from "./components/PrivateRoute";
import {tokenVar} from "./Token";
import {useReactiveVar} from "@apollo/client";

export default function Router() {
    const isAuth = !!useReactiveVar(tokenVar);

    return <Routes>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"*"} key={"*"} element={<Navigate to={"/networks"}/>}></Route>
        <Route element={<ProtectedRoute allow={isAuth} fallback={"/login"}/>}>
            <Route path={"/devices"} element={<Devices/>}></Route>
            <Route path={"/devices/add"} element={<AddDevice/>}></Route>
            <Route path={"/devices/:deviceId"} element={<EditDevice/>}></Route>
            <Route path={"/networks"}
                   element={<div><Typography variant={"h3"}>Networks</Typography><Networks/></div>}></Route>
            <Route path={"/networks/add"} element={<AddNetwork/>}></Route>
            <Route path={"/networks/:networkId"} element={<EditNetwork/>}></Route>
            <Route path={"/users"} element={<App/>}></Route>
        </Route>
    </Routes>
}
