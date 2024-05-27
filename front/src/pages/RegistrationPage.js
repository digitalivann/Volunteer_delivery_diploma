import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {register} from "../services/authService";
import {UserForm} from "../components/UserForm";

export const RegistrationPage = ({user}) => {
    const nav = useNavigate()
    const [formError, setFormError] = useState("")


    useEffect(() => {

        if (user) {
            nav('/dashboard')
        }
    }, [])

    const handleSubmitRegistration = (userNew) => {
        register(userNew, (res) => {
            nav('/login')
        }, (err) => {
            setFormError(err)
        });
    };


    return (
        <div>
            <div className="container-fluid bg-white">
                <div className="container text-center py-5">
                    <div className="container text-center mt-4 py-5 ">
                        <UserForm setInfo={(info) => {
                            handleSubmitRegistration(info)
                        }} error={formError}/>
                        <div>Вже є акаунт? <Link to={"/login"}> Увійдіть </Link></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

