import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Server_URL } from '../../config/config';
import classes from './styles.module.css'
import _ from 'lodash';

import Graph from '../../Components/Chart/index';

export default function ChartsView() {

    const [dataByType, setDataByType] = useState({});
    const [catagoriesByType, setCatagoriesByType] = useState({});

    const [dataByCostumer, setDataByCostumer] = useState({});
    const [catagoriesByCostumer, setCatagoriesByCostumer] = useState({});

    useEffect(() => {
        axios.get(`${Server_URL}/orders`).then(result => {
            const groupedOrdersByType = _.groupBy(result.data.orders, function (order) { return order.type });
            const catagoriesByType = Object.keys(groupedOrdersByType)
            setCatagoriesByType(catagoriesByType);
            const dataByType = catagoriesByType.map(type => {
                return groupedOrdersByType[type].length;
            })
            setDataByType(dataByType);

            const groupedOrdersByCostumer = _.groupBy(result.data.orders, function (order) { return order.costumerName });
            const catagoriesByCostumer = Object.keys(groupedOrdersByCostumer);
            setCatagoriesByCostumer(catagoriesByCostumer);
            const dataByCostumer = catagoriesByCostumer.map(type => {
                return groupedOrdersByCostumer[type].length;
            })
            setDataByCostumer(dataByCostumer);

        })
            .catch(err => {
                console.log(err);
            })
    }, []);



    return (
        <div className={classes.container}>
            <Graph data={dataByType} catagories={catagoriesByType} text="חלוקת הזמנות לפי מוצר" />
            <Graph data={dataByCostumer} catagories={catagoriesByCostumer} text="חלוקת הזמנות לפי לקוח" />
        </div>


    )
}
