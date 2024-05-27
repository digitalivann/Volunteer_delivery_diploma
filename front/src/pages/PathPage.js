import React, {useEffect, useState} from "react";
import {getPath, deletePath} from "../services/pathService";
import {HubSmall} from "../components/HubSmall";
import {PathSmall} from "../components/PathSmall";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Path} from "../components/Path";
import {ShipmentForm} from "../components/ShipmentForm";
import Spinner from "../components/Spinner";
import {createShipment} from "../services/shipmentService";
import {createHub} from "../services/hubService";

export const PathPage = ({user}) => {
    const [error, setError] = useState("")
    const location = useLocation();
    const [pathInfo, setPathInfo] = useState(location.state?.path)
    const [hubstop, setHubstop] = useState()
    const {id} = useParams();
    const [showFormShipment, setShowFormShipment] = useState(false)
    const [showFormPath, setShowFormPath] = useState(false)
    const [showPath, setShowPath] = useState(false)
    const nav = useNavigate()

    useEffect(() => {
        getPathInfo()
    }, []);


    const getPathInfo = () => {
        getPath(id, (res) => {
            setError("")
            setPathInfo(res.data)
            setShowPath(true)
        }, (err) => {
            nav("/paths")
            console.log(err);
        })
    };

    const addShipmentToHubstop = (hubstop) => {
        setHubstop(hubstop)
        setShowFormShipment(true)
    }

    const handleShipmentSubmit = (shipmentNew) => {
        setError("")
        createShipment(shipmentNew, (res) => {
            setShowFormShipment(false)
            nav("/shipments")
        }, (err) => {
            setError(err)
        });
    };

    const handlePathDelete = (shipmentNew) => {
        setError("")
        deletePath(pathInfo.id, (res) => {
            nav("/paths")
        }, (err) => {
            setError(err)
        });
    };


    return <div>
        <div className="container-fluid bg-white service py-5">
            <div className="container py-5">
                {showFormShipment && <div className="d-flex align-items-center mt-4 mb-0 justify-content-center">
                    <button onClick={() => {
                        setShowFormShipment(!showFormShipment)
                    }} className="btn-hover-bg btn btn-primary rounded-pill text-white py-2 px-3"
                            type={"button"}>{"Повернутись до подорожі"}
                    </button>
                </div>}
                <div className="mt-4 row g-8 justify-content-evenly">
                    {showFormShipment ? <ShipmentForm path={pathInfo} error={error} setInfo={(shipment) => {
                            handleShipmentSubmit(shipment)
                        }} hubstop={hubstop}/> :
                        <>{showPath ? <Path user={user} setHubstopForShipment={(h) => {
                            addShipmentToHubstop(h)
                        }} user={user} setUpdate={() => {getPathInfo()}} setDelete={() => {handlePathDelete()}} pathInfo={pathInfo}/> : <Spinner/>}</>}
                </div>
            </div>
        </div>
    </div>
}