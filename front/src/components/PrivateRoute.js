import React, {useEffect, useState} from "react";
import {Route, Navigate, useNavigate} from "react-router-dom";
import Spinner from "./Spinner";
import {getUserFromToken} from "../services/userService";
import {cloneElement} from "react";

export const PrivateRoute = ({children, role, setInfo}) => {
    const [user, setUser] = useState();
    const [auth, setAuth] = useState(false);
    const navigation = useNavigate()

    useEffect(() => {
        getUser()
    }, [])


    const getUser = () => {
        getUserFromToken((res) => {
            setUser(res.data)
            setAuth(role === "ANY" ? true : (res.data?.role === role))
            setInfo(res.data)
        }, (err) => {
            console.log(err);
            navigation('/login')
        })
    };

    return user ? (auth ? children : <Navigate to="/login"/>) : <Spinner position={"absolute"}/>;
}

export default PrivateRoute;