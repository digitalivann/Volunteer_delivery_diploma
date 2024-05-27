import {useEffect, useState} from "react";
import Multiselect from "multiselect-react-dropdown";
import {aid_types} from "../utils/data";

export const ShipmentForm = ({setInfo, error, shipment, hubstop, path}) => {
    const [shipmentNew, setShipmentNew] = useState(shipment ? shipment : {
        notes: "",
        hubstop: hubstop,
        goods: []
    })
    const [hubs, setHubs] = useState([])
    const [needsByType, setNeedsByType] = useState([])


    useEffect(() => {
        const hubs = []
        path.hubstops.map((s, index) => hubs.push({...s.hub, "index": index}))
        setHubs(hubs)

        const needs = []
        aid_types.map((t) => {needs.push({type: t.type, needs: path.needs.filter(x => x.type === t.type)})})
        setNeedsByType(needs)

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setInfo(shipmentNew)
    };

    const addGoodField = () => {
        const good = {
            name: '',
            type: '',
            needId: ''
        }

        setShipmentNew({...shipmentNew, goods: [...shipmentNew.goods, good]})
    }

    const removeGoodField = (index) => {
        let goods = [...shipmentNew.goods]
        goods.splice(index, 1)
        setShipmentNew({...shipmentNew, goods: goods})
    }

    const handleGoodChange = (value, index, name) => {
        let goods = [...shipmentNew.goods];

        if (name === "type") {
            goods[index][name] = value[0] ? value[0]?.type : ""
            if (!value[0]){
                goods[index]["needId"] = ""
            }
        } else if (name === "needId") {
            goods[index][name] = value[0] ? value[0]?.id : ""
        } else {
            goods[index][name] = value;
        }

        setShipmentNew({...shipmentNew, goods: goods})
    }


    return <div>
        <div>
            <div className="col-lg-5 mt-5 mx-auto text-center mb-5">
                <h3 className="mb-4 section-title px-3">Створіть нову посилку</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-12">
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
                                    placeholder={"Хаб *"}
                                    displayValue={"label"}
                                    onSelect={e => setShipmentNew({...shipmentNew, hubstop: path.hubstops[e[0].index]})}
                                    singleSelect={true}
                                    onRemove={e => setShipmentNew({...shipmentNew, hubstop: ""})}
                                    selectedValues={shipmentNew.hubstop !== "" && [shipmentNew.hubstop?.hub]}
                                    options={hubs}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-floating">
                                <input className="form-control border-2 bi-border-all"
                                       type="text"
                                       placeholder="Додаткова інформація про подорож"
                                       value={shipmentNew.notes}
                                       onChange={e => setShipmentNew({...shipmentNew, notes: e.target.value})}
                                />
                                <label>{shipmentNew.notes === "" ? "Введіть додаткову інформацію *" : "Додаткова інформація *"}</label>
                            </div>
                        </div>
                        {shipmentNew.goods.map((good, index) =>
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
                                            onSelect={e => handleGoodChange(e, index, "type")}
                                            onRemove={e => handleGoodChange(e, index, "type")}
                                            placeholder={"Тип потреби *"}
                                            displayValue={"label"}
                                            options={aid_types}
                                            singleSelect={true}
                                            selectedValues={good.type !== "" && [aid_types.find(x => x.type === good.type)]}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-floating">
                                        <input className="form-control border-2 bi-border-all"
                                               type="text"
                                               placeholder="Назва потреби *"
                                               value={good.name}
                                               onChange={e => handleGoodChange(e.target.value, index, "name")}
                                        />
                                        <label>Назва потреби</label>
                                    </div>
                                </div>
                                <button className={"btn btn-sm"} style={{width: "20px"}}
                                        onClick={() => removeGoodField(index)}>Видалити
                                </button>
                                {good.type !== "" && <div className="col-md-12">
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
                                            placeholder={"Відповідна потреба"}
                                            onSelect={e => handleGoodChange(e, index, "needId")}
                                            onRemove={e => {handleGoodChange(e, index, "needId")}}
                                            singleSelect={true}
                                            displayValue={"name"}
                                            selectedValues={good.needId !== "" && [path.needs.find(x => x.id === good.needId)]}
                                            options={needsByType.find(x => x.type === good.type).needs}
                                            emptyRecordMsg={"Немає потреб цього типу"}
                                        />
                                    </div>
                                </div>}
                            </>
                        )}
                        <button type="button" onClick={addGoodField}
                                className="btn w-100 py-3">
                            Додати ще позицію у посилці
                        </button>
                        <p style={{color: "maroon", marginTop: "8px"}}>{error}</p>
                        <div className="col-12">
                            <button className="rounded shadow-none border-0 btn-primary w-100 py-3"
                                    type="submit">Створити посилку
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
}