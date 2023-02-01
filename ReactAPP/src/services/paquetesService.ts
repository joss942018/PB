import { APIService } from "services";

export const getPaquetes = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPaquetes(pageNo,pageSize);
    }
    else{
        try {
            res = await searchPaquetes(search,pageNo,pageSize);
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


export const addPaquetes = (data) => {
return APIService.api().post(`/paquetes`,data)
}
export const updatePaquetes = (data) => {
return APIService.api().put(`/paquetes/${data.id}`,data)
}
export const getAllPaquetes = (page,paginator) => {
return APIService.api().get(`/paquetes/?page=${page}&paginator=${paginator}`)
}
export const getOnePaquetes = (id) => {
return APIService.api().get(`/paquetes/${id}`)
}
export const searchPaquetes = (searchKey,page,paginator) => {
return APIService.api().get(`/paquetes/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deletePaquetes = (id) => {
return APIService.api().delete(`/paquetes/${id}`)
}
