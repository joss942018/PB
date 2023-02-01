import { APIService } from "services";

export const getPaquete_Caracteristica = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPaquete_Caracteristica(pageNo,pageSize);
    }
    else{
        try {
            res = await searchPaquete_Caracteristica(search,pageNo,pageSize);
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


export const addPaquete_Caracteristica = (data) => {
return APIService.api().post(`/paquete_caracteristica`,data)
}
export const updatePaquete_Caracteristica = (data) => {
return APIService.api().put(`/paquete_caracteristica/${data.id}`,data)
}
export const getAllPaquete_Caracteristica = (page,paginator) => {
return APIService.api().get(`/paquete_caracteristica/?page=${page}&paginator=${paginator}`)
}
export const getOnePaquete_Caracteristica = (id) => {
return APIService.api().get(`/paquete_caracteristica/${id}`)
}
export const searchPaquete_Caracteristica = (searchKey,page,paginator) => {
return APIService.api().get(`/paquete_caracteristica/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deletePaquete_Caracteristica = (id) => {
return APIService.api().delete(`/paquete_caracteristica/${id}`)
}
