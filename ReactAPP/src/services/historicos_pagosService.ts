import { APIService } from "services";

export const getHistoricos_Pagos = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllHistoricos_Pagos(pageNo,pageSize);
    }
    else{
        try {
            res = await searchHistoricos_Pagos(search,pageNo,pageSize);
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


export const addHistoricos_Pagos = (data) => {
return APIService.api().post(`/historicos_pagos`,data)
}
export const updateHistoricos_Pagos = (data) => {
return APIService.api().put(`/historicos_pagos/${data.id}`,data)
}
export const getAllHistoricos_Pagos = (page,paginator) => {
return APIService.api().get(`/historicos_pagos/?page=${page}&paginator=${paginator}`)
}
export const getOneHistoricos_Pagos = (id) => {
return APIService.api().get(`/historicos_pagos/${id}`)
}
export const searchHistoricos_Pagos = (searchKey,page,paginator) => {
return APIService.api().get(`/historicos_pagos/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deleteHistoricos_Pagos = (id) => {
return APIService.api().delete(`/historicos_pagos/${id}`)
}
