import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {updateProfile} from "../services/userService";
import {updatePassword} from "../services/authService";
import {UserForm} from "../components/UserForm";
import {PasswordForm} from "../components/PasswordForm";

export const RedactProfilePage = ({user}) => {
    const [formError, setFormError] = useState("")
    const [showFormPassword, setShowFormPassword] = useState(false)
    const nav = useNavigate()

    const handleRedactSubmit = (userNew) => {
        setFormError("")
        updateProfile(userNew, () => {
            nav('/dashboard', {
                    state: {
                        message: "Ви змінили дані акаунту",
                        reload: true
                    }
                })
        }, (err) => {
            setFormError(err)
        });
    };

    const handleRedactPasswordSubmit = (userNew) => {
        setFormError("")
        updatePassword(userNew, () => {
            nav('/dashboard', {
                state: {
                    message: "Ви змінили пароль акаунту",
                }
            })
        }, (err) => {
            setFormError(err)
        });
    };

    return <div>
        <div className="container-fluid contact bg-light py-5">
            <div className="container py-5">
                <div className="mx-auto text-center mt-5 mb-5" style={{maxWidth: "900px"}}>
                    <div className="mb-4 d-flex align-items-center justify-content-center">
                        <button onClick={() => {
                            setShowFormPassword(!showFormPassword)
                        }} className="btn bg-light border-1 border-primary rounded-pill text-primary py-3 px-5"
                                type={"button"}>{showFormPassword ? "Редагувати дані акаунту" : "Змінити пароль від акаунту"}
                        </button>
                    </div>
                    {showFormPassword ? <PasswordForm error={formError} setInfo={(userNew) => {
                            handleRedactPasswordSubmit(userNew)
                        }}/> :
                        <UserForm error={formError} setInfo={(userNew) => {
                            handleRedactSubmit(userNew)
                        }} user={user}/>}
                </div>
            </div>
        </div>
    </div>
}
