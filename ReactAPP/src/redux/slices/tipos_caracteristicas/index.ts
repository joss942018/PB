import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITipos_Caracteristicas {
id:number,
nombre:string,
estado:boolean
}

interface ITipos_CaracteristicasData {
    list?: Array<ITipos_Caracteristicas>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: ITipos_CaracteristicasData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const tipos_caracteristicasSlice = createSlice({
    name: "tipos_caracteristicas",
    initialState,
    reducers: {
        setTipos_CaracteristicasList: (state, _action: PayloadAction<ITipos_CaracteristicasData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetTipos_CaracteristicasToInit: (state) => {
            state = initialState;
        },
        setTipos_CaracteristicasMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setTipos_CaracteristicasList, resetTipos_CaracteristicasToInit, setTipos_CaracteristicasMessage } = tipos_caracteristicasSlice.actions;

export default tipos_caracteristicasSlice.reducer;

