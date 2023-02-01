import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPaquetes {
id:number,
nombre:string,
descripcion:string,
aseguradora_id:number,
estado:boolean
}

interface IPaquetesData {
    list?: Array<IPaquetes>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: IPaquetesData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const paquetesSlice = createSlice({
    name: "paquetes",
    initialState,
    reducers: {
        setPaquetesList: (state, _action: PayloadAction<IPaquetesData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetPaquetesToInit: (state) => {
            state = initialState;
        },
        setPaquetesMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setPaquetesList, resetPaquetesToInit, setPaquetesMessage } = paquetesSlice.actions;

export default paquetesSlice.reducer;

