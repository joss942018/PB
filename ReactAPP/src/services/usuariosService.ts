import { APIService } from "services";

export const getUsuarios = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllUsuarios(pageNo,pageSize);
    }
    else{
        try {
            res = await searchUsuarios(search,pageNo,pageSize);
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


export const addUsuarios = (data) => {
return APIService.api().post(`/usuarios`,data)
}
export const updateUsuarios = (data) => {
return APIService.api().put(`/usuarios/${data.id}`,data)
}
export const getAllUsuarios = (page,paginator) => {
return APIService.api().get(`/usuarios/?page=${page}&paginator=${paginator}`)
}
export const getOneUsuarios = (id) => {
return APIService.api().get(`/usuarios/${id}`)
}
export const searchUsuarios = (searchKey,page,paginator) => {
return APIService.api().get(`/usuarios/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deleteUsuarios = (id) => {
return APIService.api().delete(`/usuarios/${id}`)
}
