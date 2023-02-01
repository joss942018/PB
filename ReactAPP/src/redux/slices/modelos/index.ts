import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IModelos {
id:number,
nombre:string,
estado:number
}

interface IModelosData {
    list?: Array<IModelos>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: IModelosData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const modelosSlice = createSlice({
    name: "modelos",
    initialState,
    reducers: {
        setModelosList: (state, _action: PayloadAction<IModelosData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetModelosToInit: (state) => {
            state = initialState;
        },
        setModelosMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setModelosList, resetModelosToInit, setModelosMessage } = modelosSlice.actions;

export default modelosSlice.reducer;

