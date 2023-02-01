import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRoles {
id:number,
nombre:string,
estado:boolean
}

interface IRolesData {
    list?: Array<IRoles>;
    pageNo: number;
    pageSize: number;
    searchKey?: string;
    totalCount?: number;
    message?: string;
}

const initialState: IRolesData = {
    pageNo: 1,
    pageSize: 20,
    searchKey: '',
    list: [],
    totalCount: 0,
    message: '',
};

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        setRolesList: (state, _action: PayloadAction<IRolesData>) => {
            state.list = _action.payload.list;
            state.pageNo = _action.payload.pageNo;
            state.pageSize = _action.payload.pageSize;
            state.totalCount = _action.payload.totalCount;
        },
        resetRolesToInit: (state) => {
            state = initialState;
        },
        setRolesMessage: (state, _action: PayloadAction<string>) => {
            state.message = _action.payload;
        },
    },
});

export const { setRolesList, resetRolesToInit, setRolesMessage } = rolesSlice.actions;

export default rolesSlice.reducer;

