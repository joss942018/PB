import { APIService } from "services";

export const getCuentas_Por_Cobrar = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCuentas_Por_Cobrar(pageNo,pageSize);
    }
    else{
        try {
            res = await searchCuentas_Por_Cobrar(search,pageNo,pageSize);
        } catch(err) {
             return { records:[], total_count:0 }
        }
    }
    if(res && res.data && res.data.data){
    return { records:res.data.data.data, total_count:res.data.data.total }
    }else{
    return { records:[], totalCount:0 }
    }
    
}


export const addCuentas_Por_Cobrar = (data) => {
return APIService.api().post(`/cuentas_por_cobrar`,data)
}
export const updateCuentas_Por_Cobrar = (data) => {
return APIService.api().put(`/cuentas_por_cobrar/${data.id}`,data)
}
export const getAllCuentas_Por_Cobrar = (page,paginator) => {
return APIService.api().get(`/cuentas_por_cobrar/?page=${page}&paginator=${paginator}`)
}
export const getOneCuentas_Por_Cobrar = (id) => {
return APIService.api().get(`/cuentas_por_cobrar/${id}`)
}
export const searchCuentas_Por_Cobrar = (searchKey,page,paginator) => {
return APIService.api().get(`/cuentas_por_cobrar/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deleteCuentas_Por_Cobrar = (id) => {
return APIService.api().delete(`/cuentas_por_cobrar/${id}`)
}
