import React, {useEffect, useState} from "react";
import {Route, Navigate, useNavigate} from "react-router-dom";
import Spinner from "./Spinner";
import {getUserFromToken} from "../services/userService";
import {cloneElement} from "react";

export const PublicRoute = ({children, setInfo}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        getUser()
    }, [])

    const getUser = () => {
        getUserFromToken((res) => {
            setInfo(res.data)
            setUser(res.data)
        }, (err) => {
            setUser("Unauthorized")
            setInfo()
            console.log(err);
        })
    };


    return user ? children : <Spinner position={"absolute"}/>;
}

export default PublicRoute;