import {baseUrl} from "../utils/requestMiddleware";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {Need} from "./Need";
import {Shipment} from "./Shipment";
import {getHubShipments, setHubstopShipmentsShipped} from "../services/shipmentService";

export const Hubstop = ({hubstopInfo, state, setHubstopForShipment, user, setUpdate}) => {
    const nav = useNavigate()

    const setHubstopShipped = () => {
        setHubstopShipmentsShipped(hubstopInfo.id, (res) => {
            setUpdate()
        }, (err) => {
            console.log(err)
        });
    };

    return <div className="col-md-10">
        <div className="blog-item">
            <div className="justify-content-center border border-primary rounded p-4">
                {state === "path" && <><h4 className="text-primary mb-2"><i
                    className="fa fa-home fa-2x text-primary"></i> {hubstopInfo.hub?.name}</h4>
                    <h5 className="text-primary mb-4"> {hubstopInfo.hub?.region}, {hubstopInfo.hub?.city}, {hubstopInfo.hub?.address} </h5>
                    <div className="row gy-3 gx-4 mb-2">
                        <div className="col-sm-4">
                            <p className="mb-0"><i
                                className="fa fa-user text-primary me-2"></i> {hubstopInfo.hub?.admin?.name} {hubstopInfo.hub?.admin?.surname}
                            </p>
                        </div>
                        <div className="col-sm-4">
                            <p className="mb-0"><i className="fa fa-phone text-primary me-2"></i>
                                {hubstopInfo.hub?.phone}</p>
                        </div>
                        <div className="col-sm-4">
                            <p className="mb-0"><i
                                className="fa fa-clock text-primary me-2"></i>{hubstopInfo.hub?.startHour}:00
                                - {hubstopInfo.hub?.endHour}:00 </p>
                        </div>
                    </div>
                    <div className={"justify-content-center"}>
                        {user?.role === "VOLUNTEER" && <button onClick={() => {
                            setHubstopForShipment(hubstopInfo)
                        }} className="m-1 btn bg-primary text-white rounded-pill py-2 px-3">Додати
                            доставку
                        </button>}
                        {user?.role === "DRIVER" && <div className={"mt-5"}>
                            {hubstopInfo.shipments.length>0 && hubstopInfo.shipments[0]?.status !== "Shipped" && <button onClick={() => {
                                setHubstopShipped()
                            }} className="mb-1 btn bg-primary text-white rounded-pill py-2 px-3">Підтвердити забирання посилок з хабу
                            </button>}
                            {hubstopInfo.shipments.map((s) =>
                                <Shipment key={s.id} shipmentInfo={s}/>)}
                        </div>}
                        <button onClick={() => {
                            nav(`/hub/${hubstopInfo.hubId}`, {
                                state: {
                                    hub: hubstopInfo.hub,
                                }
                            })
                        }}
                                className="m-1 btn bg-primary text-white rounded-pill py-2 px-3">Детальніше про хаб
                        </button>
                    </div>
                </>}
            </div>
        </div>
    </div>
}