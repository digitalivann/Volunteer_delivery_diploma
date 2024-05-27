import React, {useEffect, useState} from "react";
import {regions, roles} from "../utils/data";
import Multiselect from "multiselect-react-dropdown";

export const UserForm = ({setInfo, error, user}) => {
    const [userNew, setUserNew] = useState(user ? user : {
        email: "",
        password: "",
        phone: "",
        name: "",
        surname: "",
        role: ""
    });
    const [showPassword, setShowPassword] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        setInfo(userNew)
    };

    return <div>
        <div className="col-lg-6 mt-5 mx-auto text-center mb-5">
            <h3 className={user ? "mb-4 section-title px-3" : "mb-3 section-title px-3"}>{user ? "Змініть свої дані" : "Створіть новий акаунт"}</h3>
            {!user && <div className="col-md-12 text-end">
                <i onClick={() => {
                    setShowPassword(!showPassword)
                }}
                   className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
            </div>}
            <form onSubmit={handleSubmit}>
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className="form-control border-2 bi-border-all"
                                   placeholder="Введіть пошту"
                                   value={userNew.email}
                                   onChange={e => setUserNew({...userNew, email: e.target.value})}
                                   required/>
                            <label>{userNew.email === "" ? "Введіть вашу пошту*" : "Пошта*"}</label>
                        </div>
                    </div>
                    {!user && <div className="col-md-6">
                        <div className="form-floating">
                            <input className="form-control border-2 bi-border-all"
                                   placeholder="Введіть пароль"
                                   type={showPassword ? "text" : "password"}
                                   value={userNew.password}
                                   onChange={e => setUserNew({...userNew, password: e.target.value})}
                                   required/>
                            <label>{userNew.password === "" ? "Введіть ваш пароль*" : "Пароль*"} </label>
                        </div>
                    </div>}
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className="form-control border-2 bi-border-all"
                                   placeholder="Введіть ім'я"
                                   value={userNew.name}
                                   onChange={e => setUserNew({...userNew, name: e.target.value})}
                                   required/>
                            <label> {userNew.name === "" ? "Введіть ваше ім'я*" : "Ім'я*"} </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className="form-control border-2 bi-border-all"
                                   placeholder="Введіть прізвище"
                                   value={userNew.surname}
                                   onChange={e => setUserNew({...userNew, surname: e.target.value})}
                                   required/>
                            <label>{userNew.surname === "" ? "Введіть ваше прізвище*" : "Прізвище*"}</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className="form-control border-2 bi-border-all"
                                   placeholder="Введіть прізвище"
                                   value={userNew.phone}
                                   onChange={e => setUserNew({...userNew, phone: e.target.value})}
                                   required/>
                            <label>{userNew.phone === "" ? "Введіть ваш номер телефону*" : "Номер телефона*"}</label>
                        </div>
                    </div>
                    {!user && <div className="col-6">
                        <div className="form-floating">
                            <select style={userNew.role === "" ? {
                                paddingTop: "10px",
                                height: "60px",
                                backgroundColor: "white"
                            } : {paddingTop: "24px", height: "60px", backgroundColor: "white"}}
                                    className="form-control border-2 bi-border-all"
                                    required
                                    value={userNew.role}
                                    onChange={e => setUserNew({...userNew, role: e.target.value})}
                            >
                                <option className="form-control border-2 bi-border-all" value="" disabled selected
                                        hidden>Виберіть роль*
                                </option>
                                {roles?.map((r) => <option
                                    key={roles.indexOf(r)} value={r.role}>
                                    {r.label}</option>)}
                            </select>
                            <label>{userNew.role !== "" && "Роль*"}</label>
                        </div>
                    </div>}
                    <p className={"mb-0 "} style={{color: "maroon", marginTop: "8px"}}>{error}</p>
                    <div className="col-12">
                        <button className=" mt-0 rounded shadow-none border-0 btn-primary w-100 py-3"
                                type="submit">{user ? "Редагувати дані" : "Зареєструватись"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
}

