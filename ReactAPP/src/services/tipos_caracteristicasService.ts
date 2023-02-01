import { APIService } from "services";

export const getTipos_Caracteristicas = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTipos_Caracteristicas(pageNo,pageSize);
    }
    else{
        try {
            res = await searchTipos_Caracteristicas(search,pageNo,pageSize);
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


export const addTipos_Caracteristicas = (data) => {
return APIService.api().post(`/tipos_caracteristicas`,data)
}
export const updateTipos_Caracteristicas = (data) => {
return APIService.api().put(`/tipos_caracteristicas/${data.id}`,data)
}
export const getAllTipos_Caracteristicas = (page,paginator) => {
return APIService.api().get(`/tipos_caracteristicas/?page=${page}&paginator=${paginator}`)
}
export const getOneTipos_Caracteristicas = (id) => {
return APIService.api().get(`/tipos_caracteristicas/${id}`)
}
export const searchTipos_Caracteristicas = (searchKey,page,paginator) => {
return APIService.api().get(`/tipos_caracteristicas/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deleteTipos_Caracteristicas = (id) => {
return APIService.api().delete(`/tipos_caracteristicas/${id}`)
}
