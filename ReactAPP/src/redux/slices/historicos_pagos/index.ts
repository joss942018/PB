import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IHistoricos_Pagos {
id:number,
cuentacobrar_id:number,
observacion:string,
valor:number,
formapago_id:number,
imagen:string,
concepto:string,
fecha:Date,
fecha_vencimiento:Date,
num_factura?:string
}

interface IHistoricos_PagosData {
    list?: Array<IHistoricos_Pagos>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: IHistoricos_PagosData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const historicos_pagosSlice = createSlice({
    name: "historicos_pagos",
    initialState,
    reducers: {
        setHistoricos_PagosList: (state, _action: PayloadAction<IHistoricos_PagosData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetHistoricos_PagosToInit: (state) => {
            state = initialState;
        },
        setHistoricos_PagosMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setHistoricos_PagosList, resetHistoricos_PagosToInit, setHistoricos_PagosMessage } = historicos_pagosSlice.actions;

export default historicos_pagosSlice.reducer;

