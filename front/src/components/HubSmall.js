import {baseUrl} from "../utils/requestMiddleware";
import {Link, useNavigate} from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import {status_hubs} from "../utils/data";
import React from "react";

export const HubSmall = ({hubInfo}) => {
    const nav = useNavigate()

    return <div className="col-md-4">
        <div className="blog-item align-items-stretch">
            <div className="blog-img">
                <div className="blog-img-inner">
                    <img onClick={() => {
                        nav(`/hub/${hubInfo.id}`, {
                            state: {
                                hub: hubInfo,
                            }
                        })
                    }} className="img-fluid w-100 rounded-top" style={{height: "300px", objectFit: "cover"}}
                         src={`${baseUrl}${hubInfo.photoUrl}`} alt="Image"/>
                </div>
            </div>
            <div className="overflow-hidden border border-top-0 rounded-bottom p-4">
                <p style={{height: "45px", overflow: "hidden"}} >{hubInfo.region}, {hubInfo.city}, {hubInfo.address} </p>
                <h4 className="text-primary">{hubInfo.name}</h4>
                <p className="mb-3">{status_hubs.find(x => x.status === hubInfo.status)?.label } </p>
                <button onClick={() => {
                    nav(`/hub/${hubInfo.id}`, {
                        state: {
                            hub: hubInfo,
                        }
                    })
                }} className="btn btn-primary rounded-pill py-2 px-4">Детальніше
                </button>
            </div>
        </div>
    </div>
}