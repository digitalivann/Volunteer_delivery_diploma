import React, {useEffect, useState} from "react";
import {PathForm} from "../components/PathForm";
import {createPath, getAllPathsPlanned} from "../services/pathService";
import {getDriversPaths} from "../services/pathService";
import {PathSmall} from "../components/PathSmall";
import {HubSmall} from "../components/HubSmall";
import Spinner from "../components/Spinner";
import Multiselect from "multiselect-react-dropdown";
import {useNavigate} from "react-router-dom";


export const PathsPage = ({user}) => {
    const [activePaths, setActivePaths] = useState([])
    const [showActivePaths, setShowActivePaths] = useState(false)
    const [historyPaths, setHistoryPaths] = useState([])
    const [showHistoryPaths, setShowHistoryPaths] = useState(false)
    const [plannedPaths, setPlannedPaths] = useState([])
    const [showPlannedPaths, setShowPlannedPaths] = useState(false)
    const [formError, setFormError] = useState("")
    const [error, setError] = useState("")
    const [msg, setMsg] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [showPathDriver, setShowPathDriver] = useState("Active")
    const [showPaths, setShowPaths] = useState(false)
    const [filterData, setFilterData] = useState("")
    const [paths, setPaths] = useState([])
    const nav = useNavigate()


    useEffect(() => {
        if (user?.role === "DRIVER") {
            getPlansPaths()
            getActivePaths()
            getHistoryPaths()
        }
    }, []);

    useEffect(() => {
        if (user?.role !== "DRIVER" && !filterData) {
            getPathsMain()
        }
    }, [filterData]);



    const handlePathSubmit = (pathNew) => {
        createPath(pathNew, (res) => {
            setFormError("")
            setMsg(`Ви створили подорож до '${res.data.destination}'`)
            getPlansPaths()
            setShowForm(false)
        }, (err) => {
            setFormError(err)
        });
    };

    const getPathsMain = () => {
        setShowPaths(false)
        getAllPathsPlanned(filterData, (res) => {
            setError("")
            setPaths(res.data)
            setShowPaths(true)
        }, (err) => {
            setError(err)
            console.log(err);
        })
    };

    const getHistoryPaths = () => {
        setShowHistoryPaths(false)
        getDriversPaths("History", (res) => {
            setHistoryPaths(res.data)
            setShowHistoryPaths(true)
        }, (err) => {
            setError(err)
        });
    };

    const getPlansPaths = () => {
        setShowPlannedPaths(false)
        getDriversPaths("Plans", (res) => {
            setPlannedPaths(res.data)
            setShowPlannedPaths(true)
        }, (err) => {
            setError(err)
        });
    };

    const getActivePaths = () => {
        setShowActivePaths(false)
        getDriversPaths("Active", (res) => {
            setActivePaths(res.data)
            setShowActivePaths(true)
        }, (err) => {
            setError(err)
        });
    };

    const getBack = () => {
        setShowForm(!showForm)
        setShowPathDriver("Active")
    };

    return <div>
        <div className="container-fluid bg-breadcrumb">
            <div className="container text-center py-5" style={{maxWidth: "900px"}}>
                <h3 className="text-white display-3 mb-4">{user?.role === "DRIVER" ? "Ваші подорожі" : 'Подорожі'}</h3>
                <p className="mb-3 text-white">{user?.role === "DRIVER" ? "На цій сторінці відображаються тільки ваші подорожі" :
                    "На цій сторінці відображаються майбутні подорожі водіїв"} </p>
                {user?.role === "DRIVER" && <div className="d-flex align-items-center justify-content-center">
                    <button onClick={() => {
                        getBack()
                    }} className="btn-hover-bg btn btn-primary rounded-pill text-white py-2 px-4"
                            type={"button"}>{showForm ? "Повернутись до списку подорожей" : "Додати нову подорож"}
                    </button>
                </div>}
            </div>
        </div>
        <div className={"container-fluid destination py-5"}>
            <h5 className={"mb-4 text-dark"}>{error}{msg}</h5>
            {showForm ?
                <>{user?.role === "DRIVER" && <PathForm setInfo={(info) => {
                    handlePathSubmit(info)
                }} error={formError}/>}</> : <>
                    {user?.role === "DRIVER" && <div className="tab-class text-center mt-1">
                        <ul className="nav nav-pills d-inline-flex justify-content-center mb-5">
                            <li className="nav-item">
                                <a onClick={() => {
                                    setShowPathDriver("History")
                                }} className="d-flex mx-3 py-2 border border-primary bg-light rounded-pill"
                                   data-bs-toggle="pill">
                                    <span className="text-dark" style={{width: "150px"}}>Проведені</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a onClick={() => {
                                    setShowPathDriver("Active")
                                }} className="d-flex mx-3 py-2 border border-primary bg-light rounded-pill active"
                                   data-bs-toggle="pill">
                                    <span className="text-dark" style={{width: "150px"}}>Активні</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a onClick={() => {
                                    setShowPathDriver("Planned")
                                }} className="d-flex py-2 mx-3 border border-primary bg-light rounded-pill"
                                   data-bs-toggle="pill">
                                    <span className="text-dark" style={{width: "150px"}}>Заплановані</span>
                                </a>
                            </li>
                        </ul>
                    </div>}
                    <div className={"container py-5 pt-0"}>
                        {user?.role !== "DRIVER" && <div className="position-relative mb-5 w-75 mx-auto">
                            <input value={filterData} onChange={(e) => {
                                setFilterData(e.target.value)
                            }} className="form-control border-primary rounded-pill py-3 ps-4 pe-5" type="text"
                                   placeholder="Введіть назву пункту призначення подорожі, назву, місто або регіон хабу"/>
                            <div className={" position-absolute top-0 end-0 "}>
                                <button type="button" onClick={getPathsMain}
                                        className="btn bg-primary text-white rounded-pill py-2 px-4 mt-2 me-2">Пошук
                                </button>
                                <button type="button" onClick={() => {
                                    setFilterData("")
                                }}
                                        className="btn bg-primary text-white rounded-pill py-2 px-4 mt-2 me-2">x
                                </button>
                            </div>
                        </div>}
                        <div className="row g-4 justify-content-evenly">
                            {user?.role !== "DRIVER" && <>{paths.length > 0 ? <>
                                {paths?.map((p) =>
                                    <PathSmall key={p.id} pathInfo={p}/>)}
                            </> : <>{showPaths ? "Таких подорожей не існує" : <Spinner/>}</>}</>}
                            {user?.role === "DRIVER" && showPathDriver === "Active" && <>{activePaths.length > 0 ? <>
                                {activePaths?.map((p) =>
                                    <PathSmall key={p.id} pathInfo={p}/>)}
                            </> : <>{showActivePaths ? "Активних подорожей не існує" : <Spinner/>}</>}</>}
                            {user?.role === "DRIVER" && showPathDriver === "Planned" && <>{plannedPaths.length > 0 ? <>
                                {plannedPaths?.map((p) =>
                                    <PathSmall key={p.id} pathInfo={p}/>)}
                            </> : <>{showPlannedPaths ? "Запланованих подорожей не існує" : <Spinner/>}</>}</>}
                            {user?.role === "DRIVER" && showPathDriver === "History" && <>{historyPaths.length > 0 ? <>
                                {historyPaths?.map((p) =>
                                    <PathSmall key={p.id} pathInfo={p}/>)}
                            </> : <>{showHistoryPaths ? "Проведених подорожей не існує" : <Spinner/>}</>}</>}
                        </div>
                    </div>
                </>}
        </div>
    </div>
}