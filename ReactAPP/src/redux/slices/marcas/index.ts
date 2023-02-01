import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IMarcas {
id:number,
nombre:string,
estado:boolean
}

interface IMarcasData {
    list?: Array<IMarcas>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: IMarcasData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const marcasSlice = createSlice({
    name: "marcas",
    initialState,
    reducers: {
        setMarcasList: (state, _action: PayloadAction<IMarcasData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetMarcasToInit: (state) => {
            state = initialState;
        },
        setMarcasMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setMarcasList, resetMarcasToInit, setMarcasMessage } = marcasSlice.actions;

export default marcasSlice.reducer;

