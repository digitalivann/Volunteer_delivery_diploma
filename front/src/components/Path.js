import React, {useState} from "react";
import {Need} from "./Need";
import {Shipment} from "./Shipment";
import {HubstopShipment} from "./HubstopShipment";
import {Hubstop} from "./Hubstop";

export const Path = ({user, pathInfo, setHubstopForShipment, setDelete, setUpdate}) => {

    return <div className="col-md-10">
        <div className="blog-item">
            <div className="justify-content-center border border-primary rounded p-4">
                <h4 className="text-primary mb-4">Напрямок: {pathInfo.destination}</h4>
                <div className="row gy-3 gx-4 mb-4">
                    <div className="col-sm-3 "><i
                        className="fa fa-clock text-primary me-2"></i>{new Date(pathInfo.startTime).toLocaleString('en-GB')}
                    </div>
                    <div className="col-sm-3">
                        <p className="mb-0"><i className="fa fa-user text-primary me-2"></i>{pathInfo.driver.surname}
                            {pathInfo.driver.name}
                        </p>
                    </div>
                    <div className="col-sm-3">
                        <p className="mb-0"><i className="fa fa-phone text-primary me-2"></i>{pathInfo.driver.phone}
                        </p>
                    </div>
                    <div className="col-sm-3">
                        <p className="mb-0"><i className="fa fa-envelope text-primary me-2"></i>{pathInfo.driver.email}
                        </p>
                    </div>
                </div>
                <div className="service-content text-center">
                    <p>{pathInfo.notes}</p>
                    {pathInfo.needs.length > 0 && <><h5 className={"text-primary"}> Потреби: </h5>
                        {pathInfo.needs?.map((s) =>
                            <Need needInfo={s}/>)}
                    </>}
                </div>
                {user?.role === "DRIVER" && <div className={"justify-content-center"}>
                    {new Date(pathInfo.startTime) > new Date(Date.now()) &&  <button onClick={() => {
                        setDelete()}} className="m-1 btn bg-primary text-white rounded-pill py-2 px-3">Видалити подорож
                    </button>}
                </div>}
                <div className="mt-4 row g-4 justify-content-center">
                    <h4 className="text-primary mb-0">Зупинки: </h4>
                    {pathInfo.hubstops.map((s) =>
                        <Hubstop setHubstopForShipment={(h) => {
                            setHubstopForShipment(h)
                        }} state={"path"} user={user} setUpdate={() => {setUpdate()}} hubstopInfo={s}/>)}
                </div>
            </div>
        </div>
    </div>
}