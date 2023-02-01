import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICiudades {
id:number,
nombre:string,
codigo:string
}

interface ICiudadesData {
    list?: Array<ICiudades>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: ICiudadesData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const ciudadesSlice = createSlice({
    name: "ciudades",
    initialState,
    reducers: {
        setCiudadesList: (state, _action: PayloadAction<ICiudadesData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetCiudadesToInit: (state) => {
            state = initialState;
        },
        setCiudadesMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setCiudadesList, resetCiudadesToInit, setCiudadesMessage } = ciudadesSlice.actions;

export default ciudadesSlice.reducer;

