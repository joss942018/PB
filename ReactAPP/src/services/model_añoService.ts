import { APIService } from "services";

export const getModel_Año = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllModel_Año(pageNo,pageSize);
    }
    else{
        try {
            res = await searchModel_Año(search,pageNo,pageSize);
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


export const addModel_Año = (data) => {
return APIService.api().post(`/model_año`,data)
}
export const updateModel_Año = (data) => {
return APIService.api().put(`/model_año/${data.id}`,data)
}
export const getAllModel_Año = (page,paginator) => {
return APIService.api().get(`/model_año/?page=${page}&paginator=${paginator}`)
}
export const getOneModel_Año = (id) => {
return APIService.api().get(`/model_año/${id}`)
}
export const searchModel_Año = (searchKey,page,paginator) => {
return APIService.api().get(`/model_año/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deleteModel_Año = (id) => {
return APIService.api().delete(`/model_año/${id}`)
}
