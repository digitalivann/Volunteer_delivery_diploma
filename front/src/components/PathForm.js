import {useState, useRef, useEffect} from "react";
import {aid_types} from "../utils/data";
import Multiselect from 'multiselect-react-dropdown';
import {getHubsActive} from "../services/hubService";



export const PathForm = ({setInfo, error, path}) => {

    const [pathNew, setPathNew] = useState(path ? path : {
        destination: "",
        startTime: "",
        stops: [],
        notes: "",
        needs: []
    })
    const [formError, setFormError] = useState(error)
    const [hubs, setHubs] = useState([])


    useEffect(() => {
        getHubs()
    }, []);


    useEffect(() => {
        setFormError(error)
    }, [error]);


    const getHubs = () => {
        getHubsActive((res) => {
            setFormError("")
            const hubsData = res.data.map((h) => {
                return {
                    ...h,
                    label: h.name + ", " + h.region + ', ' + h.city + ", " + h.address,
                };

            });
            setHubs(hubsData)
        }, (err) => {
            setFormError(err)
            console.log(err);
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setInfo(pathNew)
    };

    const addNeedField = () => {
        const need = {
            name: '',
            type: ''
        }

        setPathNew({...pathNew, needs: [...pathNew.needs, need]})
    }

    const removeNeedField = (index) => {
        let needs = [...pathNew.needs]
        needs.splice(index, 1)
        setPathNew({...pathNew, needs: needs})
    }

    const handleNeedsChange = (value, index, name) => {
        let needs = [...pathNew.needs];
        if (name === "type") {
            needs[index][name] = value[0] ? value[0]?.type : ""
        } else
            needs[index][name] = value;
        setPathNew({...pathNew, needs: needs})
    }


    return (
        <div>
            <div className="col-lg-5 mt-5 mx-auto text-center mb-5">
                <h3 className="mb-4 section-title px-3">Створіть нову подорож</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input type="text" className="form-control border-2 bi-border-all"
                                       placeholder="Введіть приблизний пункт призначення подорожі"
                                       value={pathNew.destination}
                                       onChange={e => setPathNew({...pathNew, destination: e.target.value})}
                                       required/>
                                <label>{pathNew.destination === "" ? "Введіть пункт призначення подорожі *" : "Пункт призначення подорожі *"}</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input type="datetime-local" className="form-control border-2 border"
                                       placeholder="Введіть дату та час подорожі"
                                       value={pathNew.startTime}
                                       onChange={e => setPathNew({...pathNew, startTime: e.target.value})}
                                       required/>
                                <label>{pathNew.startTime === "" ? "Введіть дата та час початку подорожі *" : "Дата та час початку подорожі *"}</label>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-floating">
                                <Multiselect
                                    className="form-control border-2 border bg-white"
                                    style={{
                                        chips: {
                                            background: "#13357b"
                                        },
                                        multiselectContainer: {
                                            color: '#13357b'
                                        },
                                        option: {
                                            background: "#13357b",
                                            color: "white"
                                        },
                                        searchBox: {
                                            background: 'white',
                                            border: "0px"
                                        },

                                    }}
                                    isObject={true}
                                    onSearch={function noRefCheck() {
                                    }}
                                    emptyRecordMsg={"Вибрані всі вільні хаби"}
                                    selectionLimit={3}
                                    onSelect={e => setPathNew({...pathNew, stops: e})}
                                    onRemove={e => setPathNew({...pathNew, stops: e})}
                                    placeholder={pathNew.stops.length > 0 ? "Зупинки у хабах *": "Оберіть зупинки в хабах *"}
                                    displayValue={"label"}
                                    selectedValues={pathNew.stops}
                                    options={hubs}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-floating">
                                <input className="form-control border-2 bi-border-all"
                                       type="text"
                                       placeholder="Додаткова інформація про подорож"
                                       value={pathNew.notes}
                                       onChange={e => setPathNew({...pathNew, notes: e.target.value})}
                                />
                                <label>{pathNew.notes === "" ? "Введіть додактову інформацію *" : "Додаткова інформація *"}</label>
                            </div>
                        </div>
                        {pathNew.needs.map((need, index) =>
                            <>
                                <div className="col-md-5">
                                    <div className="form-floating">
                                        <Multiselect
                                            className="form-control border-2 border bg-white"
                                            style={{
                                                chips: {
                                                    background: "#13357b",
                                                    color: "white"
                                                },
                                                multiselectContainer: {
                                                    color: '#13357b'
                                                },
                                                option: {
                                                    background: "#13357b",
                                                    color: "white"
                                                },
                                                searchBox: {
                                                    background: 'white',
                                                    border: "0px"
                                                },

                                            }}
                                            isObject={true}
                                            onSearch={function noRefCheck() {
                                            }}
                                            selectionLimit={1}
                                            onSelect={e => handleNeedsChange(e, index, "type")}
                                            onRemove={e => handleNeedsChange(e, index, "type")}
                                            placeholder={"Тип потреби"}
                                            displayValue={"label"}
                                            options={aid_types}
                                            singleSelect={true}
                                            selectedValues={need.type !== "" && [aid_types.find(x => x.type === need.type)]}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-floating">
                                        <input className="form-control border-2 bi-border-all"
                                               type="text"
                                               placeholder="Назва потреби"
                                               value={need.name}
                                               onChange={e => handleNeedsChange(e.target.value, index, "name")}
                                        />
                                        <label>Назва потреби</label>
                                    </div>
                                </div>
                                <button className={"btn btn-sm"} style={{width: "20px"}}
                                        onClick={() => removeNeedField(index)}>Видалити
                                </button>
                            </>
                        )}
                        <button type="button" onClick={addNeedField}
                                className="btn w-100 py-3">
                            Додати ще потребу
                        </button>
                    </div>
                    <p style={{color: "maroon", marginTop: "8px"}}>{formError}</p>
                    <div className="col-12">
                        <button className="rounded shadow-none border-0 btn-primary w-100 py-3"
                                type="submit">Створити подорож
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

