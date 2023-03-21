import axios from "axios";
import { useState } from "react";

const useAxios = (url,method,requestData) => {
    const [data,setData] = useState([])

    const axiosRequest = async(id, status, filterDate)=>{
        let finalUrl = '';
        if (id){
            finalUrl = url.concat("?id=",id)
        }else if (filterDate){
            finalUrl = url.concat("?date=",filterDate)
        }
        else{
            finalUrl = url
        }
        console.log(finalUrl)



        let response = await axios({
            method:method,
            url:finalUrl,
            data:requestData
        });
        setData(response.data)

    }
    return [data, axiosRequest];




}
 
export default useAxios;