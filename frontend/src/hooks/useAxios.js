import axios from "axios";
import { useState } from "react";

const useAxios = (url,method,requestData) => {
    const [data,setData] = useState([])

    const axiosRequest = async(id,filterDate,status)=>{
        let finalUrl = '';
        if (id){
            finalUrl = url.concat("?id=",id)
        }else if (filterDate){
            finalUrl = url.concat("?date=",filterDate)
        }
        else{
            finalUrl = url
        }
        let finalData = {}
        if (status){
            finalData = {status:status}
        }
        else{
            finalData = requestData
        }
        console.log('final url: ' + finalUrl)
        console.log('final data: '+ finalData)



        let response = await axios({
            method:method,
            url:finalUrl,
            data:finalData
        });
        setData(response.data)

    }
    return [data, axiosRequest];




}
 
export default useAxios;