import {useEffect, useState} from "react";
import {login} from "../services/authService";
import {Link, useNavigate} from "react-router-dom";

function LoginPage({user}) {
    const [userNew, setUserNew] = useState({email: "", password: ""});
    const [errorLogin, setErrorLogin] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const nav = useNavigate()

    useEffect(() => {
        console.log(user)
        if (user) {
            nav('/dashboard')
        }
    }, [])

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        login(userNew, (res) => {
            window.localStorage.setItem("token", res.data.token)
            nav('/dashboard', {
                state: {
                    message: "Ви увійшли в свій профіль",
                }
            })
        }, (err) => {
            setErrorLogin(err)
            console.log(err);
        })

    };


    return (
        <div>
            <div className="container-fluid bg-white" style={{paddingTop: "150px"}}>
                <div className="container text-center py-5">
                    <div className="col-lg-5  mx-auto text-center mb-5">
                        <h3 className="mb-2 section-title px-3">Увійдіть в акаунт</h3>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="col-md-12 text-end">
                                <i onClick={() => {setShowPassword(!showPassword)}}
                                   className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="text" className="form-control border-2 bi-border-all"
                                               name="name"
                                               id="name"
                                               placeholder="Enter username"
                                               value={userNew.email}
                                               onChange={e => setUserNew({...userNew, email: e.target.value})}
                                               required
                                               autoComplete="off"
                                        ></input>
                                        <label>{userNew.email === "" ? "Введіть вашу пошту*" : "Пошта*"} </label>
                                    </div>
                                </div>
                                <div style={{paddingRight: "0px"}} className="col-md-6">
                                    <div className="form-floating">
                                        <input className="form-control border-2 bi-border-all"
                                               type={showPassword ? "text" : "password"}
                                               name="name"
                                               id="name"
                                               placeholder="Введіть ваш пароль"
                                               value={userNew.password}
                                               onChange={e => setUserNew({...userNew, password: e.target.value})}
                                               required
                                               autoComplete="off"></input>
                                        <label>{userNew.password === "" ? "Введіть ваш пароль*" : "Пароль*"} </label>
                                    </div>
                                </div>
                                <p style={{color: "maroon", marginTop: "8px"}}>{errorLogin}</p>
                                <div className="col-12">
                                    <button className="rounded shadow-none border-0 btn-primary w-50 py-3"
                                            type="submit">Вхід
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div>Немає акаунту? <Link to={"/registration"}> Зареєструйтесь </Link></div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;