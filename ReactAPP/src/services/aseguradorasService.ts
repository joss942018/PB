import { APIService } from "services";

export const getAseguradoras = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllAseguradoras(pageNo,pageSize);
    }
    else{
        try {
            res = await searchAseguradoras(search,pageNo,pageSize);
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


export const addAseguradoras = (data) => {
return APIService.api().post(`/aseguradoras`,data)
}
export const updateAseguradoras = (data) => {
return APIService.api().put(`/aseguradoras/${data.id}`,data)
}
export const getAllAseguradoras = (page,paginator) => {
return APIService.api().get(`/aseguradoras/?page=${page}&paginator=${paginator}`)
}
export const getOneAseguradoras = (id) => {
return APIService.api().get(`/aseguradoras/${id}`)
}
export const searchAseguradoras = (searchKey,page,paginator) => {
return APIService.api().get(`/aseguradoras/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
export const deleteAseguradoras = (id) => {
return APIService.api().delete(`/aseguradoras/${id}`)
}
