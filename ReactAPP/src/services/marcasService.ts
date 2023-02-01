import { APIService } from "services";

export const getMarcas = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllMarcas(pageNo,pageSize);
    }
    else{
        try {
            res = await searchMarcas(search,pageNo,pageSize);
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


export const addMarcas = (data) => {
return APIService.api().post(`/marcas`,data)
}
export const updateMarcas = (data) => {
return APIService.api().put(`/marcas/${data.id}`,data)
}
export const getAllMarcas = (page,paginator) => {
return APIService.api().get(`/marcas/?page=${page}&paginator=${paginator}`)
}
export const getOneMarcas = (id) => {
return APIService.api().get(`/marcas/${id}`)
}
export const searchMarcas = (searchKey,page,paginator) => {
return APIService.api().get(`/marcas/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deleteMarcas = (id) => {
return APIService.api().delete(`/marcas/${id}`)
}
