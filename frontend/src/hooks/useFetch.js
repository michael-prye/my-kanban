import React from "react";
import { useEffect, useState } from "react";


const useFetch = (url,method,formData) => {
    const [data, setData] = useState([])


    const fetchRequest = async (id, status,filterDate)=>{
        let finalUrl = ""
        if (id){
            finalUrl = url.concat("?id=",id)
        }else if (filterDate){
            finalUrl = url.concat("?date=",filterDate)
        }
        else{
            finalUrl = url
        }
        console.log(finalUrl)

        if(method=="DELETE"){ // if else statement to handle if request returns a body of json text
            const response = await fetch(finalUrl,{
                method: method,
                headers:{'Content-Type': 'application/json'},
                body: formData? JSON.stringify(formData) :null
                })
                .then((response)=>  response.text())
                .then((data)=>setData((data))
                 )
       
        }else if(status){
            let finalData = {status:status}
            console.log(finalData)
            const response = await fetch(finalUrl,{
                method: method,
                headers:{'Content-Type': 'application/json'},
                body: finalData? JSON.stringify(finalData) :null,
            
                })
                .then((response)=>  response.json())
                .then((data)=>setData((data))
                 )

        }else{
            const response = await fetch(finalUrl,{
                method: method,
                headers:{'Content-Type': 'application/json'},
                body: formData? JSON.stringify(formData) :null,
            
                })
                .then((response)=>  response.json())
                .then((data)=>setData((data))
                 )

        }

        


    }



        return [data, fetchRequest]
  
}
 
export default useFetch ;