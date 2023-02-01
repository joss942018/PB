import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IModel_Año {
id:number,
año_id:number,
modelo_id:number,
estado:boolean
}

interface IModel_AñoData {
    list?: Array<IModel_Año>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: IModel_AñoData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const model_añoSlice = createSlice({
    name: "model_año",
    initialState,
    reducers: {
        setModel_AñoList: (state, _action: PayloadAction<IModel_AñoData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetModel_AñoToInit: (state) => {
            state = initialState;
        },
        setModel_AñoMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setModel_AñoList, resetModel_AñoToInit, setModel_AñoMessage } = model_añoSlice.actions;

export default model_añoSlice.reducer;

