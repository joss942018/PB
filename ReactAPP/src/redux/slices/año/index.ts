import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAño {
id:number,
descripcion:string,
estado:string
}

interface IAñoData {
    list?: Array<IAño>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: IAñoData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const añoSlice = createSlice({
    name: "año",
    initialState,
    reducers: {
        setAñoList: (state, _action: PayloadAction<IAñoData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetAñoToInit: (state) => {
            state = initialState;
        },
        setAñoMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setAñoList, resetAñoToInit, setAñoMessage } = añoSlice.actions;

export default añoSlice.reducer;

