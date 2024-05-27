import {Link, useLocation, useNavigate} from "react-router-dom";

export const Header = ({user}) => {
    const pageName = useLocation().pathname.trim().substring(1)
    const navigation = useNavigate()

    const logOut = () => {
        window.localStorage.setItem("token", "")
        navigation('/login', {
            state: {
                msg: "Ви вийшли з вашого профілю",
            }
        })
    };

    return <div>
        <div className="container-fluid position-relative p-0">
            <nav className="navbar bg-breadcrumb navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                <a href="" className="navbar-brand p-0">
                    <h1 className="m-0"><i className="fa fa-map-marker-alt me-3"></i>Гуманітарна Допомога</h1>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse">
                    <span className="fa fa-bars"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-0">
                        <Link to={"/hubs"}
                              className={pageName === "hubs" ? "nav-item nav-link active" : "nav-item nav-link"}>Хаби</Link>
                        <Link to={"/paths"}
                              className={pageName === "paths" ? "nav-item nav-link active" : "nav-item nav-link"}>Подорожі</Link>
                        {user?.role === "VOLUNTEER" &&
                            <Link to={"/shipments"}
                            className={pageName === "shipments" ? "nav-item nav-link active" : "nav-item nav-link"}>Посилки</Link>
                        }
                    </div>
                    {!user && <div className="btn bg-primary rounded-pill mt-1 mb-1 py-2 px-4 ms-lg-4">
                        <div>
                                <Link to={"/login"} className="text-white"><i
                                    className="fas fa-sign-in-alt me-2"></i>Увійти в профіль</Link>
                        </div>
                    </div>}
                    {user && <div className="btn bg-primary rounded-pill mt-1 mb-1 py-2 px-4 ms-lg-4">
                        <div className="dropdown">
                            <div className="dropdown-toggle text-light" data-bs-toggle="dropdown"><small><i
                                className="fa fa-home me-2"></i> Мій акаунт </small></div>
                            <div className="dropdown-menu rounded">
                                <Link to={"/dashboard"} className="dropdown-item"><i
                                    className="fas fa-user-alt me-2"></i> Мій профіль</Link>
                                <Link to={"/settings"} className="dropdown-item"><i
                                    className="fas fa-cog me-2"></i> Змінити дані</Link>
                                <button onClick={logOut} className="dropdown-item"><i
                                    className="fas fa-power-off me-2"></i> Вийти з акаунту
                                </button>
                            </div>
                        </div>
                    </div>}

                </div>
            </nav>
        </div>
    </div>
}