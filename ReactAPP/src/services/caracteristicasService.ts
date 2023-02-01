import { APIService } from "services";

export const getCaracteristicas = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCaracteristicas(pageNo,pageSize);
    }
    else{
        try {
            res = await searchCaracteristicas(search,pageNo,pageSize);
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


export const addCaracteristicas = (data) => {
return APIService.api().post(`/caracteristicas`,data)
}
export const updateCaracteristicas = (data) => {
return APIService.api().put(`/caracteristicas/${data.id}`,data)
}
export const getAllCaracteristicas = (page,paginator) => {
return APIService.api().get(`/caracteristicas/?page=${page}&paginator=${paginator}`)
}
export const getOneCaracteristicas = (id) => {
return APIService.api().get(`/caracteristicas/${id}`)
}
export const searchCaracteristicas = (searchKey,page,paginator) => {
return APIService.api().get(`/caracteristicas/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deleteCaracteristicas = (id) => {
return APIService.api().delete(`/caracteristicas/${id}`)
}
