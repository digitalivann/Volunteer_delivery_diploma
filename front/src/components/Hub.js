import {baseUrl} from "../utils/requestMiddleware";
import Multiselect from "multiselect-react-dropdown";
import {aid_types, regions, status_hubs} from "../utils/data";
import {getHubShipments} from "../services/shipmentService";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {HubSmall} from "./HubSmall";
import Spinner from "./Spinner";
import {HubstopShipment} from "./HubstopShipment";
import {PathSmall} from "./PathSmall";


export const Hub = ({hubInfo, setStatus, setRedact, setDelete, error, user}) => {
    const [activeShipments, setActiveShipments] = useState([])
    const [historyShipments, setHistoryShipments] = useState([])
    const [plannedShipments, setPlannedShipments] = useState([])
    const [showActiveShipments, setShowActiveShipments] = useState(false)
    const [showHistoryShipments, setShowHistoryShipments] = useState(false)
    const [showPlannedShipments, setShowPlannedShipments] = useState(false)
    const [shipmentsShow, setShipmentsShow] = useState("")
    const [errorHub, setErrorHub] = useState(error)


    useEffect(() => {
        window.scrollTo(0, 0);
        if (user?.role === "ADMIN") {
            getActiveShipments()
            getPlannedShipments()
            getHistoryShipments()
        }
    }, []);

    useEffect(() => {
        setErrorHub(error)
    }, [error]);


    const getActiveShipments = () => {
        setShowActiveShipments(false)
        getHubShipments(hubInfo.id, "Active", (res) => {
            setActiveShipments(res.data)
            setShowActiveShipments(true)
        }, (err) => {
            setErrorHub(err)
        });
    };

    const getHistoryShipments = () => {
        setShowHistoryShipments(false)
        getHubShipments(hubInfo.id, "History", (res) => {
            setHistoryShipments(res.data)
            setShowHistoryShipments(true)
        }, (err) => {
            setErrorHub(err)
        });
    };

    const getPlannedShipments = () => {
        setShowPlannedShipments(false)
        getHubShipments(hubInfo.id, "Plans", (res) => {
            setPlannedShipments(res.data)
            setShowPlannedShipments(true)
        }, (err) => {
            setErrorHub(err)
        });
    };

    return <div>
        <div className="container py-5 mt-5">
            <div className="row g-5 align-items-center">
                <div className="col-lg-5">
                    <div className="h-100"
                         style={{border: "50px solid", borderColor: "transparent #13357B"}}>
                        <img src={`${baseUrl}${hubInfo.photoUrl}`} className="img-fluid w-100 "
                             style={{height: "300px", objectFit: "cover"}} alt=""/>
                    </div>
                </div>
                <div className="col-lg-7"
                     style={{background: "linear-gradient(rgba(255, 255, 255, .8), rgba(255, 255, 255, .8))"}}>
                    <h5 className="section-title pe-3">Хаб для збору волонтерської допомоги</h5>
                    <h1 className="text-primary mb-4">{hubInfo.name}</h1>
                    <h5 className="text-primary mb-4">{hubInfo.region}, {hubInfo.city}, {hubInfo.address}</h5>
                    <div className="row gy-3 gx-4 mb-4">
                        <div className="col-sm-4">
                            <p className="mb-0"><i className="fa fa-clock text-primary me-2"></i>{hubInfo.startHour}:00
                                - {hubInfo.endHour}:00 </p>
                        </div>
                        <div className="col-sm-4">
                            <p className="mb-0"><i className="fa fa-phone text-primary me-2"></i>{hubInfo.phone}
                            </p>
                        </div>
                        <div className="col-sm-4">
                            <p className="mb-0"><i
                                className="fa fa-user text-primary me-2"></i> {hubInfo?.admin.name} {hubInfo?.admin.surname}
                            </p>
                        </div>
                    </div>
                    {user?.role === "ADMIN" ? <div className="justify-content-center row gy-3 gx-4 mb-4">
                        <div className="col-6">
                            <div className="form-floating">
                                <select style={hubInfo.status === "" ? {
                                    paddingTop: "10px",
                                    height: "60px",
                                    backgroundColor: "white"
                                } : {paddingTop: "24px", height: "60px", backgroundColor: "white"}}
                                        className="form-control border-2 bi-border-all"
                                        required
                                        value={hubInfo.status}
                                        onChange={(e) => {setStatus(e.target.value)}}
                                >
                                    <option className="form-control border-2 bi-border-all" value="" disabled selected
                                            hidden>Виберіть cтатус хабу*
                                    </option>
                                    {status_hubs?.map((r) => <option
                                        key={status_hubs.indexOf(r)} value={r.status}>
                                        {r.label}</option>)}
                                </select>
                                <label>{hubInfo.status !== "" && "Статус хабу*"}</label>
                            </div>
                        </div>
                    </div> : <p className="mb-4">{status_hubs.find(x => x.status === hubInfo.status)?.label}</p>}
                    {user?.role === "ADMIN" && <>
                        <button className="btn btn-primary rounded-pill py-2 px-4 mt-1" onClick={() => {
                            setRedact()
                        }}>Редагувати дані хаба
                        </button>
                        <br/>
                    </>}
                </div>
            </div>
        </div>
        {user?.role === "ADMIN" && <div className="container-fluid destination py-5">
            <div className="container py-5">
                <div className="mx-auto text-center mb-5">
                    <h5 className="section-title px-3">Доставки</h5>
                </div>
                <div className="tab-class text-center">
                    <ul className="nav nav-pills d-inline-flex justify-content-center mb-5">
                        <li className="nav-item">
                            <a onClick={() => {
                                setShipmentsShow("History")
                            }} className="d-flex mx-3 py-2 border border-primary bg-light rounded-pill"
                               data-bs-toggle="pill">
                                <span className="text-dark" style={{width: "150px"}}>Проведені</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a onClick={() => {
                                setShipmentsShow("Active")
                            }} className="d-flex mx-3 py-2 border border-primary bg-light rounded-pill"
                               data-bs-toggle="pill">
                                <span className="text-dark" style={{width: "150px"}}>Активні</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a onClick={() => {
                                setShipmentsShow("Planned")
                            }} className="d-flex py-2 mx-3 border border-primary bg-light rounded-pill"
                               data-bs-toggle="pill">
                                <span className="text-dark" style={{width: "150px"}}>Заплановані</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="row g-4 justify-content-center">
                    { shipmentsShow === "History" && <>{historyShipments.length > 0 ? <>
                        {historyShipments?.map((h) =>
                            <HubstopShipment key={h.id}
                                             hubstopInfo={h}/>)}</> : <>{showHistoryShipments ? "Проведних доставок не існує" :
                        <Spinner/>}</>}</>}
                    { shipmentsShow === "Planned" && <>{plannedShipments.length > 0 ? <>
                        {plannedShipments?.map((h) =>
                            <HubstopShipment key={h.id}
                                             hubstopInfo={h}/>)}</> : <>{plannedShipments ? "Запланованих доставок не існує" :
                        <Spinner/>}</>}</>}
                    { shipmentsShow === "Active" && <>{activeShipments.length > 0 ? <>
                        {activeShipments?.map((h) =>
                            <HubstopShipment key={h.id}
                                             hubstopInfo={h}/>)}</> : <>{activeShipments ? "Активних доставок не існує" :
                        <Spinner/>}</>}</>}
                </div>

            </div>
        </div>}
    </div>
}