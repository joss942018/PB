import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPaquete_Caracteristica {
id:number,
paquete_id:number,
caracteristica_id:number
}

interface IPaquete_CaracteristicaData {
    list?: Array<IPaquete_Caracteristica>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: IPaquete_CaracteristicaData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const paquete_caracteristicaSlice = createSlice({
    name: "paquete_caracteristica",
    initialState,
    reducers: {
        setPaquete_CaracteristicaList: (state, _action: PayloadAction<IPaquete_CaracteristicaData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetPaquete_CaracteristicaToInit: (state) => {
            state = initialState;
        },
        setPaquete_CaracteristicaMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setPaquete_CaracteristicaList, resetPaquete_CaracteristicaToInit, setPaquete_CaracteristicaMessage } = paquete_caracteristicaSlice.actions;

export default paquete_caracteristicaSlice.reducer;

