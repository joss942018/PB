import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAdministradores {
id:number,
nombre:number,
apellido:number,
usuario_id:number,
estado:boolean
}

interface IAdministradoresData {
    list?: Array<IAdministradores>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: IAdministradoresData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const administradoresSlice = createSlice({
    name: "administradores",
    initialState,
    reducers: {
        setAdministradoresList: (state, _action: PayloadAction<IAdministradoresData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetAdministradoresToInit: (state) => {
            state = initialState;
        },
        setAdministradoresMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setAdministradoresList, resetAdministradoresToInit, setAdministradoresMessage } = administradoresSlice.actions;

export default administradoresSlice.reducer;

