import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import LoginPage from "./pages/LoginPage";
import {Navigate, Route, Routes} from "react-router-dom";
import {ProfilePage} from "./pages/ProfilePage";
import {RegistrationPage} from "./pages/RegistrationPage";
import PrivateRoute from "./components/PrivateRoute";
import {ShipmentsPage} from "./pages/ShipmentsPage";
import {HubsPage} from "./pages/HubsPage";
import PublicRoute from "./components/PublicRoute";
import {Header} from "./components/Header";
import {PathsPage} from "./pages/PathsPage";
import {MainPage} from "./pages/MainPage";
import {PathPage} from "./pages/PathPage";
import {RedactProfilePage} from "./pages/RedactProfilePage";
import {HubPage} from "./pages/HubPage";


function App() {
    const [info, setInfo] = useState()

    return (
        <div className="App">
            <Header user={info}/>
            <Routes>
                <Route path="*" element={<Navigate to={"/login"}/>}/>
                <Route path="/" element={<Navigate to={"/login"}/>}/>
                <Route path="/main" element={<PublicRoute setInfo={(info) => {
                    setInfo(info)}} > <MainPage user={info}/></PublicRoute>}/>
                <Route path="/path/:id" element={<PublicRoute setInfo={(info) => {
                    setInfo(info)}} > <PathPage user={info}/></PublicRoute>}/>
                <Route path="/login" element={<PublicRoute setInfo={(info) => {
                    setInfo(info)}} > <LoginPage user={info}/></PublicRoute>}/>
                <Route path="/registration" element={<PublicRoute setInfo={(info) => {
                    setInfo(info)}} >  <RegistrationPage user={info}/></PublicRoute>}/>
                <Route path="/dashboard" element={<PrivateRoute setInfo={(info) => {
                    setInfo(info)
                }}  role={"ANY"}><ProfilePage user={info}/></PrivateRoute>}/>
                <Route path="/settings" element={<PrivateRoute setInfo={(info) => {
                    setInfo(info)
                }}  role={"ANY"}><RedactProfilePage user={info}/></PrivateRoute>}/>

                <Route path="/shipments" element={<PrivateRoute setInfo={(info) => {
                    setInfo(info)
                }}  role={"VOLUNTEER"}><ShipmentsPage user={info}/></PrivateRoute>}/>

                <Route path="/hubs" element={<PublicRoute setInfo={(info) => {
                    setInfo(info)
                }}><HubsPage user={info}/></PublicRoute>}/>
                <Route path="/paths" element={<PublicRoute setInfo={(info) => {
                    setInfo(info)
                }}><PathsPage user={info}/></PublicRoute>}/>
                <Route path="/hub/:id" element={<PublicRoute setInfo={(info) => {
                    setInfo(info)
                }}><HubPage user={info}/></PublicRoute>}/>
            </Routes>
        </div>
    );
}

export default App;
