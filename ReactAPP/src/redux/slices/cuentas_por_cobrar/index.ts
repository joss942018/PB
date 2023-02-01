import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICuentas_Por_Cobrar {
id:number,
concepto:string,
saldo:number,
cliente_id:number,
credito:number,
debito:number,
comprobante_id:number,
fecha_vencimiento?:Date,
fecha_emision?:Date,
status?:number,
valor_comprobante?:number,
comprobante_img?:string,
fecha_comprobante?:Date,
num_factura?:string,
paquete_id:number
}

interface ICuentas_Por_CobrarData {
    list?: Array<ICuentas_Por_Cobrar>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: ICuentas_Por_CobrarData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const cuentas_por_cobrarSlice = createSlice({
    name: "cuentas_por_cobrar",
    initialState,
    reducers: {
        setCuentas_Por_CobrarList: (state, _action: PayloadAction<ICuentas_Por_CobrarData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetCuentas_Por_CobrarToInit: (state) => {
            state = initialState;
        },
        setCuentas_Por_CobrarMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setCuentas_Por_CobrarList, resetCuentas_Por_CobrarToInit, setCuentas_Por_CobrarMessage } = cuentas_por_cobrarSlice.actions;

export default cuentas_por_cobrarSlice.reducer;

