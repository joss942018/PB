import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IEstados_Civil {
id:number,
nombre:string,
estado:boolean
}

interface IEstados_CivilData {
    list?: Array<IEstados_Civil>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: IEstados_CivilData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const estados_civilSlice = createSlice({
    name: "estados_civil",
    initialState,
    reducers: {
        setEstados_CivilList: (state, _action: PayloadAction<IEstados_CivilData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetEstados_CivilToInit: (state) => {
            state = initialState;
        },
        setEstados_CivilMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setEstados_CivilList, resetEstados_CivilToInit, setEstados_CivilMessage } = estados_civilSlice.actions;

export default estados_civilSlice.reducer;

