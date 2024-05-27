import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {roles} from "../utils/data";
import {getUserFromToken} from "../services/userService";

export const ProfilePage = ({user}) => {
    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message)
    const [reload, setReload] = useState(location.state?.reload)
    const [userInfo, setUserInfo] = useState(user)
    const nav = useNavigate()

    useEffect(() => {
        if (reload){
            getUser()
          }
    }, []);

    const getUser = () => {
        getUserFromToken((res) => {
            setUserInfo(res.data)
        }, (err) => {
            console.log(err);
        })
    };

    useEffect(() => {
        setTimeout(() => {
            setMessage("");
        }, 7500);
    }, [message]);

    return <div className="container-fluid contact bg-light py-5">
        <div className="container py-5">
            <h5 className={"m-1 text-dark"}>{message}</h5>
            <div className="mx-auto text-center mt-5 mb-5" style={{maxWidth: "900px"}}>
                <h4 className="section-title px-3">{roles.find(x => x.role === userInfo.role).label}</h4>
                <div className="col-lg-8 mx-auto text-center ">
                    <div className="bg-white rounded p-4">
                        <div className="text-center mb-4">
                            <i className="fa fa-user fa-3x mb-3 text-primary"></i>
                            <h4 className="text-primary">{userInfo.name} {userInfo.surname}</h4>
                        </div>
                        <div className="text-center mb-4">
                            <i className="fa fa-phone-alt fa-3x text-primary mb-3"></i>
                            <h4 className="text-primary">{userInfo.phone}</h4>
                        </div>

                        <div className="text-center">
                            <i className="fa fa-envelope fa-3x text-primary mb-3"></i>
                            <h4 className="text-primary">{userInfo.email}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


