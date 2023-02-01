import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUsuarios {
id:number,
email:string,
contrasena:string,
rol:string,
es_activo:boolean
}

interface IUsuariosData {
    list?: Array<IUsuarios>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: IUsuariosData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const usuariosSlice = createSlice({
    name: "usuarios",
    initialState,
    reducers: {
        setUsuariosList: (state, _action: PayloadAction<IUsuariosData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetUsuariosToInit: (state) => {
            state = initialState;
        },
        setUsuariosMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setUsuariosList, resetUsuariosToInit, setUsuariosMessage } = usuariosSlice.actions;

export default usuariosSlice.reducer;

