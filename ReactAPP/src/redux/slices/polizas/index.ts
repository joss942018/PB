import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPolizas {
id:number,
valor:number,
fecha_vigencia:Date,
paquete_id:number,
auto_id:number
}

interface IPolizasData {
    list?: Array<IPolizas>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: IPolizasData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const polizasSlice = createSlice({
    name: "polizas",
    initialState,
    reducers: {
        setPolizasList: (state, _action: PayloadAction<IPolizasData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetPolizasToInit: (state) => {
            state = initialState;
        },
        setPolizasMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setPolizasList, resetPolizasToInit, setPolizasMessage } = polizasSlice.actions;

export default polizasSlice.reducer;

