import { APIService } from "services";

export const getCiudades = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCiudades(pageNo,pageSize);
    }
    else{
        try {
            res = await searchCiudades(search,pageNo,pageSize);
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


export const addCiudades = (data) => {
return APIService.api().post(`/ciudades`,data)
}
export const updateCiudades = (data) => {
return APIService.api().put(`/ciudades/${data.id}`,data)
}
export const getAllCiudades = (page,paginator) => {
return APIService.api().get(`/ciudades/?page=${page}&paginator=${paginator}`)
}
export const getOneCiudades = (id) => {
return APIService.api().get(`/ciudades/${id}`)
}
export const searchCiudades = (searchKey,page,paginator) => {
return APIService.api().get(`/ciudades/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deleteCiudades = (id) => {
return APIService.api().delete(`/ciudades/${id}`)
}
