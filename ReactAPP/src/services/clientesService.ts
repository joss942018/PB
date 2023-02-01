import { APIService } from "services";

export const getClientes = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllClientes(pageNo,pageSize);
    }
    else{
        try {
            res = await searchClientes(search,pageNo,pageSize);
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


export const addClientes = (data) => {
return APIService.api().post(`/clientes`,data)
}
export const updateClientes = (data) => {
return APIService.api().put(`/clientes/${data.id}`,data)
}
export const getAllClientes = (page,paginator) => {
return APIService.api().get(`/clientes/?page=${page}&paginator=${paginator}`)
}
export const getOneClientes = (id) => {
return APIService.api().get(`/clientes/${id}`)
}
export const searchClientes = (searchKey,page,paginator) => {
return APIService.api().get(`/clientes/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deleteClientes = (id) => {
return APIService.api().delete(`/clientes/${id}`)
}
