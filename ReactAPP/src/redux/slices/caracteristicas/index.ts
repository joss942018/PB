import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICaracteristicas {
id:number,
nombre:string,
tipo_id:number,
estado:boolean
}

interface ICaracteristicasData {
    list?: Array<ICaracteristicas>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: ICaracteristicasData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const caracteristicasSlice = createSlice({
    name: "caracteristicas",
    initialState,
    reducers: {
        setCaracteristicasList: (state, _action: PayloadAction<ICaracteristicasData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetCaracteristicasToInit: (state) => {
            state = initialState;
        },
        setCaracteristicasMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setCaracteristicasList, resetCaracteristicasToInit, setCaracteristicasMessage } = caracteristicasSlice.actions;

export default caracteristicasSlice.reducer;

