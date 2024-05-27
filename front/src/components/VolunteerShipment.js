import React from "react";
import {status_shipments} from "../utils/data";
import {Need} from "./Need";
import {Good} from "./Good";
import {deleteShipment, setShipmentDelivered} from "../services/shipmentService";
import {useNavigate} from "react-router-dom";

export const VolunteerShipment = ({shipmentInfo, setReload}) => {
    const nav = useNavigate()

    const handleShipmentDelete = () => {
        deleteShipment(shipmentInfo.id, (res) => {
            setReload()
        }, (err) => {
            console.log(err)
        });
    };

    const handleShipmentDelivery = () => {
        setShipmentDelivered(shipmentInfo.id, (res) => {
            setReload()
        }, (err) => {
            console.log(err)
        });
    };

    return <div className={"mb-2 w-75 bg-white border border-primary rounded p-2 pe-0"}>
        <div className=" d-flex justify-content-center ">
            <div className="service-icon pt-3  p-1">
                {shipmentInfo.status === "Created" && <i className="fa fa-truck fa-2x text-primary"></i>}
                {shipmentInfo.status === "Delivered" && <i className="fa fa-box fa-2x text-primary"></i>}
                {shipmentInfo.status === "Shipped" && <i className="fa fa-road fa-2x text-primary"></i>}
                <p>{status_shipments.find(x => x.status === shipmentInfo.status).label}</p>
            </div>
            <div className={"row gx-4 gy-0 p-4"}>
                <div className="col-sm-6  mt-2 w-auto"><i
                    className="fa fa-clock text-primary me-2"></i>{new Date(shipmentInfo.creationTime).toLocaleString('en-GB')}
                </div>
                {shipmentInfo.status === "Delivered" && <div className="col-sm-6  mt-2 w-auto"><i
                    className="fa fa-check text-primary me-2"></i>{new Date(shipmentInfo.confirmTime).toLocaleString('en-GB')}
                </div>}
            </div>
            <div onClick={() => {nav(`/hub/${shipmentInfo.hubstop.hubId}`)}} className="service-icon pt-3 p-2">
                <i className="fa fa-home fa-2x text-primary"></i> {shipmentInfo.hubstop?.hub?.name}
                <p>Детальніше про хаб</p>
            </div>
            <div onClick={() => {nav(`/path/${shipmentInfo.hubstop.pathId}`)}}  className="service-icon pt-3 p-2">
                <i className="fa fa-car fa-2x text-primary"></i> {shipmentInfo.hubstop?.path.destination}
                <p>Детальніше про подорож</p>
            </div>
        </div>
        <div className="col-sm-12">
            <p>{shipmentInfo.notes}</p>
            <h5 className={"text-primary"}> Посилка: </h5>
            {shipmentInfo.goods.map((s) =>
                <Good goodInfo={s}/>)}
        </div>
        <div className={"justify-content-center"}>
            {shipmentInfo.status === "Created" && <button onClick={() => {handleShipmentDelivery()}}
                    className="m-2 btn bg-primary text-white rounded-pill py-2 px-4"> Підтвердити доставку посилки в хаб
            </button>}
            <button onClick={() => {handleShipmentDelete()}}
                className="m-2 btn bg-white text-primary border-primary rounded-pill py-2 px-4">Видалити посилку
            </button>
        </div>
    </div>
}