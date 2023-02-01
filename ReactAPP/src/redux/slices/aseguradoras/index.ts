import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAseguradoras {
id:number,
nombre:number,
estado:boolean
}

interface IAseguradorasData {
    list?: Array<IAseguradoras>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: IAseguradorasData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const aseguradorasSlice = createSlice({
    name: "aseguradoras",
    initialState,
    reducers: {
        setAseguradorasList: (state, _action: PayloadAction<IAseguradorasData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetAseguradorasToInit: (state) => {
            state = initialState;
        },
        setAseguradorasMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setAseguradorasList, resetAseguradorasToInit, setAseguradorasMessage } = aseguradorasSlice.actions;

export default aseguradorasSlice.reducer;

