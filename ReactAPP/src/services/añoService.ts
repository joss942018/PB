import { APIService } from "services";

export const getAño = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllAño(pageNo,pageSize);
    }
    else{
        try {
            res = await searchAño(search,pageNo,pageSize);
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


export const addAño = (data) => {
return APIService.api().post(`/año`,data)
}
export const updateAño = (data) => {
return APIService.api().put(`/año/${data.id}`,data)
}
export const getAllAño = (page,paginator) => {
return APIService.api().get(`/año/?page=${page}&paginator=${paginator}`)
}
export const getOneAño = (id) => {
return APIService.api().get(`/año/${id}`)
}
export const searchAño = (searchKey,page,paginator) => {
return APIService.api().get(`/año/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deleteAño = (id) => {
return APIService.api().delete(`/año/${id}`)
}
