import { createSlice } from "@reduxjs/toolkit";
import db from '../../database.json';

const moment = require('moment');
moment.locale('eu');

const initialState = {
    selectValues: [],
    selectTime: [],
    lastDayDate: null,
    selectValueName: "",
    selectTimeName: "",
    db: db.ethereum.transactions,
    actualDateValues: db.ethereum.transactions,
    data: { labels: [] },
};

export const DatabaseSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        getLastDay: (state) => {

            state.lastDayDate = moment('20' + state.db[state.db.length - 1].time).format('MM/DD/YYYY');

            state.actualDateValues = state.db.filter((elem) => {
                return moment('20' + elem.time).format('MM/DD/YYYY') == state.lastDayDate
            });

            state.data.labels = state.actualDateValues.map((elem) => {
                return moment('20' + elem.time).format('LT')
            })

            state.selectTime = state.lastDay;
            state.selectTimeName = "last day"
        },
        getLasWeek: (state) => {

            const endDate = moment(state.lastDayDate).add(-8, 'days').format('D MMM YY');
            let uniqueDate = [];

            state.actualDateValues = state.db.filter((elem) => {
                const currentTime = moment('20' + elem.time).format('D MMM YY')
                return moment(currentTime).isBetween(endDate, state.lastDayDate)
            })
            
            for ( let i = 0; i < state.actualDateValues.length-1; i++) {
                if (moment('20' + state.actualDateValues[i].time).format('D MMM YY') !=
                    moment('20' + state.actualDateValues[i+1].time).format('D MMM YY')
                ) {
                    uniqueDate.push(state.actualDateValues[i])
                }
            }
            state.actualDateValues = uniqueDate;

            state.data.labels = state.actualDateValues.map((elem) => {
                return moment('20' + elem.time).format("D MMM YY")
            }).filter( (item, pos, arr) => !pos || item !== arr[pos - 1] )

            state.selectTime = state.lastWeek;
            state.selectTimeName = "last week"
        },
        getLastMonth: (state) => {
            let uniqueDate = [];

            const endDate = moment(state.lastDayDate).add(-32, 'days').format('D MMM YY');

            state.actualDateValues = state.db.filter((elem) => {
                const currentTime = moment('20' + elem.time).format('D MMM YY')
                return moment(currentTime).isBetween(endDate, state.lastDayDate)
            });
            for ( let i = 0; i < state.actualDateValues.length-1; i++) {
                if (moment('20' + state.actualDateValues[i].time).format('D MMM YY') !=
                    moment('20' + state.actualDateValues[i+1].time).format('D MMM YY')
                ) {
                    uniqueDate.push(state.actualDateValues[i])
                }
            }
            state.actualDateValues = uniqueDate;

            state.data.labels = state.actualDateValues.map((elem) => {
                return moment('20' + elem.time).format("D MMM YY")
            }).filter( (item, pos, arr) => !pos || item !== arr[pos - 1])

            state.selectTime = state.lastMonth;
            state.selectTimeName = "last month"
        },
        getLastYear: (state) => {
            let uniqueDate = [];
            const endDate = moment(state.lastDayDate).add(-366, 'days').format('MM/DD/YYYY');

            state.actualDateValues = state.db.filter((elem) => {
                const currentTime = moment('20' + elem.time).format('MM/DD/YYYY')
                return moment(currentTime).isBetween(endDate, state.lastDayDate)
            });

            for ( let i = 0; i < state.actualDateValues.length-1; i++) {
                if (moment('20' + state.actualDateValues[i].time).format('MMM YY') !=
                    moment('20' + state.actualDateValues[i+1].time).format('MMM YY')
                ) {
                    uniqueDate.push(state.actualDateValues[i])
                }
            }
            state.actualDateValues = uniqueDate;

            state.data.labels = state.actualDateValues.map((elem) => {
                return moment('20' + elem.time).format("MMM YY")
            }).filter( (item, pos, arr) => !pos || item !== arr[pos - 1])

            state.selectTime = state.lastYear;
            state.selectTimeName = "last year"
        },
        getMedianGasPrice: (state) => {
            state.selectValues = state.actualDateValues.map((elem) => {
                return elem.medianGasPrice
            });
            state.selectValueName = "medianGasPrice"
        },
        getGasPrice: (state) => {
            state.selectValues = state.actualDateValues.map((elem) => {
                return elem.gasPrice
            });
            state.selectValueName = "gasPrice"
        },
        getGasValue: (state) => {
            state.selectValues = state.actualDateValues.map((elem) => {
                return elem.gasValue
            });
            state.selectValueName = "gasValue"
        },
        getAverage: (state) => {
            state.selectValues = state.actualDateValues.map((elem) => {
                return elem.average
            });
            state.selectValueName = "average"
        },
        getMaxGasPrice: (state) => {
            state.selectValues = state.actualDateValues.map((elem) => {
                return elem.maxGasPrice
            });
            state.selectValueName = "maxGasPrice"
        },
    },
});

export const databaseReducer = DatabaseSlice.reducer;
export const { 
    getMedianGasPrice, 
    getGasPrice, 
    getGasValue, 
    getAverage, 
    getMaxGasPrice,
    getLastDay,
    getLasWeek,
    getLastMonth,
    getLastYear
} = DatabaseSlice.actions;