import { createAsyncThunk } from "@reduxjs/toolkit";
import { mockApi } from '../../mock/MockApi';
import { getData } from './DatabaseSlice';

export const getDatabase = createAsyncThunk("getDatabase", async  (payload, thunkAPI) => {
    try {
        const { data } = await mockApi.getDatabase();
        thunkAPI.dispatch(getData(data))
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});