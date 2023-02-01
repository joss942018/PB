import { APIService } from "services";

export const getRoles = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllRoles(pageNo,pageSize);
    }
    else{
        try {
            res = await searchRoles(search,pageNo,pageSize);
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


export const addRoles = (data) => {
return APIService.api().post(`/roles`,data)
}
export const updateRoles = (data) => {
return APIService.api().put(`/roles/${data.id}`,data)
}
export const getAllRoles = (page,paginator) => {
return APIService.api().get(`/roles/?page=${page}&paginator=${paginator}`)
}
export const getOneRoles = (id) => {
return APIService.api().get(`/roles/${id}`)
}
export const searchRoles = (searchKey,page,paginator) => {
return APIService.api().get(`/roles/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deleteRoles = (id) => {
return APIService.api().delete(`/roles/${id}`)
}
