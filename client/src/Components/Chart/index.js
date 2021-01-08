import React from 'react';
import classes from './styles.module.css';

import Chart from 'react-apexcharts';
import Spinner from '../UI/Spinner/index';

export default function Graph(props) {

    const chartConfig = {
        options: {
            chart: {
                background: '#f4f4f4',
                foreColor: '#333',
                fontFamily: 'unset'
            },
            xaxis: {
                type: 'category',
                categories: props.catagories
            },
            yaxis: {
                labels: {
                    show: false
                }
            },
            fill: {
                colors: ['rgb(245, 232, 177)']
            },
            dataLabels: {
                enabled: true,
                style: {
                    colors: ['rgb(1,1,1)'],
                    fontSize: '10px'
                }
            },
            title: {
                text: props.text,
                align: 'center',
                margin: 50,
                offsetY: 20,
                style: {
                    fontSize: '30px'
                }
            }
        },
        series: [
            {
                name: 'Numbers of orders of This Type',
                data: props.data
            }
        ]
    }

    let chart = <Spinner />;

    if (props.data.length > 0 && props.catagories.length > 0) {
        chart =
            <Chart
                options={chartConfig.options}
                series={chartConfig.series}
                type="bar"
                height="300"
                width="680"
            />
    }


    return (
        <div className={classes.chartWrapper}>
            {chart}
        </div>
    )
}

