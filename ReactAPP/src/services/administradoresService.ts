import { APIService } from "services";

export const getAdministradores = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllAdministradores(pageNo,pageSize);
    }
    else{
        try {
            res = await searchAdministradores(search,pageNo,pageSize);
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


export const addAdministradores = (data) => {
return APIService.api().post(`/administradores`,data)
}
export const updateAdministradores = (data) => {
return APIService.api().put(`/administradores/${data.id}`,data)
}
export const getAllAdministradores = (page,paginator) => {
return APIService.api().get(`/administradores/?page=${page}&paginator=${paginator}`)
}
export const getOneAdministradores = (id) => {
return APIService.api().get(`/administradores/${id}`)
}
export const searchAdministradores = (searchKey,page,paginator) => {
return APIService.api().get(`/administradores/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deleteAdministradores = (id) => {
return APIService.api().delete(`/administradores/${id}`)
}
