import { APIService } from "services";

export const getPolizas = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPolizas(pageNo,pageSize);
    }
    else{
        try {
            res = await searchPolizas(search,pageNo,pageSize);
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


export const addPolizas = (data) => {
return APIService.api().post(`/polizas`,data)
}
export const updatePolizas = (data) => {
return APIService.api().put(`/polizas/${data.id}`,data)
}
export const getAllPolizas = (page,paginator) => {
return APIService.api().get(`/polizas/?page=${page}&paginator=${paginator}`)
}
export const getOnePolizas = (id) => {
return APIService.api().get(`/polizas/${id}`)
}
export const searchPolizas = (searchKey,page,paginator) => {
return APIService.api().get(`/polizas/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deletePolizas = (id) => {
return APIService.api().delete(`/polizas/${id}`)
}
