import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAutos {
id:number,
marca_id:number,
modelo_id:number,
año_id:number,
cliente_id:number
}

interface IAutosData {
    list?: Array<IAutos>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: IAutosData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const autosSlice = createSlice({
    name: "autos",
    initialState,
    reducers: {
        setAutosList: (state, _action: PayloadAction<IAutosData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetAutosToInit: (state) => {
            state = initialState;
        },
        setAutosMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setAutosList, resetAutosToInit, setAutosMessage } = autosSlice.actions;

export default autosSlice.reducer;

