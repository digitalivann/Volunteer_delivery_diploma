import React, {useEffect, useState} from "react";
import {getPathActive} from "../services/pathService";
import {HubSmall} from "../components/HubSmall";
import {PathSmall} from "../components/PathSmall";

export const MainPage = () => {
    const [paths, setPaths] = useState([])
    const [formError, setFormError] = useState("")
    const [error, setError] = useState("")
    const [msg, setMsg] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [showActivePath, setShowActivePath] = useState(true)

    useEffect(() => {
        getPaths()
    }, []);


    const getPaths = () => {
        getPathActive((res) => {
            setError("")
            setPaths(res.data)
        }, (err) => {
            setError(err)
            console.log(err);
        })
    };

    return <div>
        <div className="container-fluid bg-white service py-5">
            <div className="container py-5">
                <div className="mx-auto text-center mb-5" style={{maxWidth: "900px"}}>
                    <h1 className="mb-0">Майбутні подорожі</h1>
                </div>
                <div className="row g-8 justify-content-evenly">
                    {paths?.map((p) =>
                        <PathSmall key={p.id} pathInfo={p}/>)}
                </div>
            </div>
        </div>
    </div>
}