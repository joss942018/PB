import { APIService } from "services";

export const getModelos = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllModelos(pageNo,pageSize);
    }
    else{
        try {
            res = await searchModelos(search,pageNo,pageSize);
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


export const addModelos = (data) => {
return APIService.api().post(`/modelos`,data)
}
export const updateModelos = (data) => {
return APIService.api().put(`/modelos/${data.id}`,data)
}
export const getAllModelos = (page,paginator) => {
return APIService.api().get(`/modelos/?page=${page}&paginator=${paginator}`)
}
export const getOneModelos = (id) => {
return APIService.api().get(`/modelos/${id}`)
}
export const searchModelos = (searchKey,page,paginator) => {
return APIService.api().get(`/modelos/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deleteModelos = (id) => {
return APIService.api().delete(`/modelos/${id}`)
}
