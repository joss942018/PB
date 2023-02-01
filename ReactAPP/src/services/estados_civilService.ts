import { APIService } from "services";

export const getEstados_Civil = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllEstados_Civil(pageNo,pageSize);
    }
    else{
        try {
            res = await searchEstados_Civil(search,pageNo,pageSize);
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


export const addEstados_Civil = (data) => {
return APIService.api().post(`/estados_civil`,data)
}
export const updateEstados_Civil = (data) => {
return APIService.api().put(`/estados_civil/${data.id}`,data)
}
export const getAllEstados_Civil = (page,paginator) => {
return APIService.api().get(`/estados_civil/?page=${page}&paginator=${paginator}`)
}
export const getOneEstados_Civil = (id) => {
return APIService.api().get(`/estados_civil/${id}`)
}
export const searchEstados_Civil = (searchKey,page,paginator) => {
return APIService.api().get(`/estados_civil/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deleteEstados_Civil = (id) => {
return APIService.api().delete(`/estados_civil/${id}`)
}
