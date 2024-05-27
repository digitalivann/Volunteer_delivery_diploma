import React from "react";
import {status_shipments} from "../utils/data";
import {Need} from "./Need";
import {Good} from "./Good";

export const Shipment = ({shipmentInfo}) => {
    return <div className={"mb-2 bg-white border border-light rounded p-2 pe-0"}>
        <div className=" d-flex justify-content-center ">
            <div className="service-icon p-2">
                {shipmentInfo.status === "Created" && <i className="fa fa-truck fa-2x text-primary"></i>}
                {shipmentInfo.status === "Delivered" && <i className="fa fa-box fa-2x text-primary"></i>}
                {shipmentInfo.status === "Shipped" && <i className="fa fa-road fa-2x text-primary"></i>}
                <p>{status_shipments.find(x => x.status === shipmentInfo.status).label}</p>
            </div>
            <div className={" justify-content-center row gx-4 gy-2 text-start p-2"}>
                <div className="col-sm-6 w-auto">{shipmentInfo.status === "Created" ? <><i
                        className="fa fa-clock text-primary me-2"></i>{new Date(shipmentInfo.creationTime).toLocaleString('en-GB')}</> :
                    <><i
                        className="fa fa-check text-primary me-2"></i>{new Date(shipmentInfo.confirmTime).toLocaleString('en-GB')}</>}
                </div>
                <div className="col-sm-6 w-auto"><i
                    className="fa fa-user text-primary me-2"></i>{shipmentInfo.volunteer.surname} {shipmentInfo.volunteer.name}
                </div>
                <div className="col-sm-6 w-auto"><i
                    className="fa fa-phone text-primary me-2"></i>{shipmentInfo.volunteer.phone}
                </div>
                <div className="col-sm-6 w-auto"><i
                    className="fa fa-envelope text-primary me-2"></i>{shipmentInfo.volunteer.email}
                </div>
            </div>
        </div>
        <div className="col-sm-12">
            <p>{shipmentInfo.notes}</p>
            <h5 className={"text-primary"}> Посилка: </h5>
            {shipmentInfo.goods.map((s) =>
                <Good goodInfo={s}/>)}
        </div>
    </div>
}