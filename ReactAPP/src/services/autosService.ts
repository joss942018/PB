import { APIService } from "services";

export const getAutos = async (pageNo,pageSize,search, clientId) => {
    let res;
    if(search.length===0) {
        res = await getAllAutos(pageNo,pageSize, clientId);
    }
    else{
        try {
            res = await searchAutos(search,pageNo,pageSize);
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


export const addAutos = (data) => {
return APIService.api().post(`/autos`,data)
}
export const updateAutos = (data) => {
return APIService.api().put(`/autos/${data.id}`,data)
}
export const getAllAutos = (page,paginator, clientId) => {
return APIService.api().get(`/autos/?page=${page}&paginator=${paginator}&clientId=${clientId}`)
}
export const getOneAutos = (id) => {
return APIService.api().get(`/autos/${id}`)
}
export const searchAutos = (searchKey,page,paginator) => {
return APIService.api().get(`/autos/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deleteAutos = (id) => {
return APIService.api().delete(`/autos/${id}`)
}
