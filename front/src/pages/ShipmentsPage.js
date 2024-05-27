import React, {useEffect, useState} from "react";
import {PathForm} from "../components/PathForm";
import {createPath, getAllPathsPlanned} from "../services/pathService";
import {getDriversPaths} from "../services/pathService";
import {PathSmall} from "../components/PathSmall";
import {HubSmall} from "../components/HubSmall";
import Spinner from "../components/Spinner";
import {getVolunteerShipments} from "../services/shipmentService";
import {VolunteerShipment} from "../components/VolunteerShipment";
import {useLocation} from "react-router-dom";


export const ShipmentsPage = ({user}) => {
    const location = useLocation();
    const [error, setError] = useState("")
    const [futureShipments, setFutureShipments] = useState([])
    const [showFutureShipments, setShowFutureShipments] = useState(false)
    const [historyShipments, setHistoryShipments] = useState([])
    const [showHistoryShipments, setShowHistoryShipments] = useState(false)
    const [message, setMessage] = useState(location.state?.message)
    const [showShipment, setShowShipment] = useState("Future")

    useEffect(() => {
        getFutureShipments()
        getHistoryShipments()
    }, []);

    const getFutureShipments = () => {
        setShowFutureShipments(false)
        getVolunteerShipments("Future", (res) => {
            setFutureShipments(res.data)
            setShowFutureShipments(true)
        }, (err) => {
            setError(err)
        });
    }

    const getHistoryShipments = () => {
        setHistoryShipments(false)
        getVolunteerShipments("History", (res) => {
            setFutureShipments(res.data)
            setShowHistoryShipments(true)
        }, (err) => {
            setError(err)
        });
    }

    return <div>
        <div className="container-fluid bg-breadcrumb">
            <div className="container text-center py-5" style={{maxWidth: "900px"}}>
                <h3 className="text-white display-3 mb-4">Ваші посилки</h3>
                <p className="mb-3 text-white">На цій сторінці відображаються ваші посилки з допомогою</p>
                <p className="mb-3 text-white">Для додавання посилки до подорожі перейдіть на сторінку подорожей</p>
            </div>
        </div>
        <div className={"container-fluid destination py-5"}>
            <h5 className={"mb-1 text-dark"}>{message}</h5>
            <div className="tab-class text-center mt-1">
                <ul className="nav nav-pills d-inline-flex justify-content-center mb-5">
                    <li className="nav-item">
                        <a onClick={() => {
                            setShowShipment("History")
                        }} className="d-flex mx-3 py-2 border border-primary bg-light rounded-pill"
                           data-bs-toggle="pill">
                            <span className="text-dark" style={{width: "150px"}}>Історія</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => {
                            setShowShipment("Future")
                        }} className="d-flex mx-3 py-2 border border-primary bg-light rounded-pill active"
                           data-bs-toggle="pill">
                            <span className="text-dark" style={{width: "150px"}}>Активні</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className={"container py-5 pt-0"}>
                <div className="row g-4 justify-content-evenly">
                    {showShipment === "Future" ? <>{futureShipments.length > 0 ? <>
                        {futureShipments?.map((p) =>
                            <VolunteerShipment setReload={() => {getFutureShipments()}} key={p.id} shipmentInfo={p}/>)}
                    </> : <>{showFutureShipments ? "Активних посилок не існує" :
                        <Spinner/>}</>}</> : <>{historyShipments.length > 0 ? <>
                        {historyShipments?.map((p) =>
                            <VolunteerShipment setReload={() => {getHistoryShipments()}} key={p.id} shipmentInfo={p}/>)}
                    </> : <>{showHistoryShipments ? "Відправлених посилок не існує" : <Spinner/>}</>} </>}
                </div>
            </div>
        </div>
    </div>
}