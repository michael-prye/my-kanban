import axios from "axios";
import { useState } from "react";

const useAxios = (url,method,data) => {
    const [data,setData] = useState()

    const axiosRequest = async(id)=>{
        let response = await axios({
            method:method,
            url:url,
            data:data
        });
        setData(response.data)

    }




}
 
export default useAxios;