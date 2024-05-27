import React, {useState} from "react";


export const PasswordForm = ({setInfo, error, user}) => {
    const [passwordData, setPasswordData] = useState({password: "", newPassword: ""})
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        setInfo(passwordData)
    };


    return  <div>
        <div className="col-lg-6 mt-5 mx-auto text-center mb-5">
            <h3 className="mb-3 section-title px-3">{"Змініть пароль від акаунту"}</h3>
            {!user && <div className="col-md-12 text-end">
                <i onClick={() => {setShowPassword(!showPassword)}}
                   className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
            </div>}
            <form onSubmit={handleSubmit}>
                <div className="row g-4">
                    <div className="col-md-12">
                        <div className="form-floating">
                            <input className="form-control border-2 bi-border-all"
                                   placeholder="Введіть пароль"
                                   value={passwordData.password}
                                   type={showPassword ? "text" : "password"}
                                   onChange={e => setPasswordData({...passwordData, password: e.target.value})}
                                   required/>
                            <label>{passwordData.password === "" ? "Введіть ваш старий пароль*" : "Старий пароль*"}</label>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-floating">
                            <input className="form-control border-2 bi-border-all"
                                   placeholder="Введіть пароль"
                                   type={showPassword ? "text" : "password"}
                                   value={passwordData.newPassword}
                                   onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})}
                                   required/>
                            <label>{passwordData.newPassword === "" ? "Введіть ваш новий пароль*" : "Новий пароль*"}</label>
                        </div>
                    </div>

                    <p className={"mb-0 "} style={{color: "maroon", marginTop: "8px"}}>{error}</p>
                    <div className="col-12">
                        <button className=" mt-0 rounded shadow-none border-0 btn-primary w-100 py-3" type="submit">{"Змінити пароль"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
}

