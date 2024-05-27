import {baseUrl} from "../utils/requestMiddleware";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {Need} from "./Need";
import {Shipment} from "./Shipment";

export const HubstopShipment = ({hubstopInfo}) => {
    const nav = useNavigate()


    return <div className="col-md-10">
        <div className="blog-item">
            <div className="justify-content-center border border-primary rounded p-4">
                <h4 className="text-primary mb-4">Напрямок: {hubstopInfo.path?.destination}</h4>
                <div className="row gy-3 gx-4 mb-4">
                    <div className="col-sm-3 "><i
                        className="fa fa-clock text-primary me-2"></i>{new Date(hubstopInfo.path.startTime).toLocaleString('en-GB')}
                    </div>
                    <div className="col-sm-3">
                        <p className="mb-0"><i
                            className="fa fa-user text-primary me-2"></i>{hubstopInfo.path.driver.surname}
                            {hubstopInfo.path.driver.name}
                        </p>
                    </div>
                    <div className="col-sm-3">
                        <p className="mb-0"><i
                            className="fa fa-phone text-primary me-2"></i>{hubstopInfo.path.driver.phone}
                        </p>
                    </div>
                    <div className="col-sm-3">
                        <p className="mb-0"><i
                            className="fa fa-envelope text-primary me-2"></i>{hubstopInfo.path.driver.email}
                        </p>
                    </div>
                </div>
                <div className="service-content text-center">
                    <h5 className={"text-primary"}> Потреби: </h5>
                    {hubstopInfo.path?.needs.map((s) =>
                        <Need needInfo={s}/>)}
                </div>
                <div className={"mt-5"}>
                    {hubstopInfo.shipments.map((s) =>
                        <Shipment key={s.id} shipmentInfo={s}/>)}
                </div>
            </div>
        </div>
    </div>
}