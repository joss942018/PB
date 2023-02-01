import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IClientes {
id:number,
identificacion:string,
celular:string,
nombres:string,
apellidos:string,
estado_civil_id:number,
ciudad_id:number,
edad:number,
genero:string,
terminos_condiciones:boolean
}

interface IClientesData {
    list?: Array<IClientes>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: IClientesData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const clientesSlice = createSlice({
    name: "clientes",
    initialState,
    reducers: {
        setClientesList: (state, _action: PayloadAction<IClientesData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetClientesToInit: (state) => {
            state = initialState;
        },
        setClientesMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setClientesList, resetClientesToInit, setClientesMessage } = clientesSlice.actions;

export default clientesSlice.reducer;

