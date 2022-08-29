import { createSlice } from "@reduxjs/toolkit";
import {LAST_DAY,
    LAST_WEEK,
    LAST_MONTH,
    LAST_YEAR,
    GAS_PRICE,
    GAS_VALUE,
    AVERAGE,
    MAX_GAS_PRICE,
    MEDIA_GAS_PRICE 
} from '../../components/constans/consValues';

const moment = require('moment');
moment.locale('eu');

const initialState = {
    selectValues: [],
    selectTime: [],
    lastDayDate: null,
    selectValueName: "",
    selectTimeName: "",
    db: [],
    actualDateValues: [],
    data: { labels: [] },
};

export const DatabaseSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        getData: (state, action) => {
            state.actualDateValues = action.payload;
            state.db = action.payload;
        },
        getLastDay: (state) => {
            state.lastDayDate = moment(state.db[state.db.length - 1].time).format('MM/DD/YYYY');

            state.actualDateValues = state.db.filter((elem) =>
                moment(elem.time).format('MM/DD/YYYY') == state.lastDayDate
            );

            state.data.labels = state.actualDateValues.map((elem) =>
              moment(elem.time).format('LT')
            )

            state.selectTime = state.lastDay;
            state.selectTimeName = LAST_DAY
        },
        getLasWeek: (state) => {

            const endDate = moment(state.lastDayDate).add(-8, 'days').format('D MMM YY');
            let uniqueDate = [];

            state.actualDateValues = state.db.filter((elem) => {
                const currentTime = moment(elem.time).format('D MMM YY')
                return moment(currentTime).isBetween(endDate, state.lastDayDate)
            })
            
            for ( let i = 0; i < state.actualDateValues.length-1; i++) {
                if (moment(state.actualDateValues[i].time).format('D MMM YY') !=
                    moment(state.actualDateValues[i+1].time).format('D MMM YY')
                ) {
                    uniqueDate.push(state.actualDateValues[i])
                }
            }
            state.actualDateValues = uniqueDate;

            state.data.labels = state.actualDateValues.map((elem) => 
                moment(elem.time).format("D MMM YY")
            ).filter( (item, pos, arr) => !pos || item !== arr[pos - 1] )

            state.selectTime = state.lastWeek;
            state.selectTimeName = LAST_WEEK
        },
        getLastMonth: (state) => {
            let uniqueDate = [];

            const endDate = moment(state.lastDayDate).add(-32, 'days').format('D MMM YY');

            state.actualDateValues = state.db.filter((elem) => {
                const currentTime = moment(elem.time).format('D MMM YY')
                return moment(currentTime).isBetween(endDate, state.lastDayDate)
            });
            for ( let i = 0; i < state.actualDateValues.length-1; i++) {
                if (moment(state.actualDateValues[i].time).format('D MMM YY') !=
                    moment(state.actualDateValues[i+1].time).format('D MMM YY')
                ) {
                    uniqueDate.push(state.actualDateValues[i])
                }
            }
            state.actualDateValues = uniqueDate;

            state.data.labels = state.actualDateValues.map((elem) =>
               moment(elem.time).format("D MMM YY")
            ).filter( (item, pos, arr) => !pos || item !== arr[pos - 1])

            state.selectTime = state.lastMonth;
            state.selectTimeName = LAST_MONTH
        },
        getLastYear: (state) => {
            let uniqueDate = [];
            const endDate = moment(state.lastDayDate).add(-366, 'days').format('MM/DD/YYYY');

            state.actualDateValues = state.db.filter((elem) => {
                const currentTime = moment(elem.time).format('MM/DD/YYYY')
                return moment(currentTime).isBetween(endDate, state.lastDayDate)
            });

            for ( let i = 0; i < state.actualDateValues.length-1; i++) {
                if (moment(state.actualDateValues[i].time).format('MMM YY') !=
                    moment(state.actualDateValues[i+1].time).format('MMM YY')
                ) {
                    uniqueDate.push(state.actualDateValues[i])
                }
            }
            state.actualDateValues = uniqueDate;

            state.data.labels = state.actualDateValues.map((elem) => 
                moment(elem.time).format("MMM YY"))
                    .filter( (item, pos, arr) => !pos || item !== arr[pos - 1])

            state.selectTime = state.lastYear;
            state.selectTimeName = LAST_YEAR
        },
        getMedianGasPrice: (state) => {
            state.selectValues = state.actualDateValues.map((elem) =>
               elem.medianGasPrice
            );
            state.selectValueName = MEDIA_GAS_PRICE
        },
        getGasPrice: (state) => {
            state.selectValues = state.actualDateValues.map((elem) => 
               elem.gasPrice
            );
            state.selectValueName = GAS_PRICE
        },
        getGasValue: (state) => {
            state.selectValues = state.actualDateValues.map((elem) =>
               elem.gasValue
            );
            state.selectValueName = GAS_VALUE
        },
        getAverage: (state) => {
            state.selectValues = state.actualDateValues.map((elem) =>
              elem.average
            );
            state.selectValueName = AVERAGE
        },
        getMaxGasPrice: (state) => {
            state.selectValues = state.actualDateValues.map((elem) =>
              elem.maxGasPrice
            );
            state.selectValueName = MAX_GAS_PRICE
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
    getLastYear,
    getData
} = DatabaseSlice.actions;