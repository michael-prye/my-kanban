import { useEffect, useState } from "react";


const useFetch = (url,method,formData) => {
    const [data, setData] = useState([])



    const fetchRequest = async (id,image)=>{
        if(method=="DELETE"){ // if else statement to handle if request returns a body of json text
            const response = await fetch(finalUrl,{
                method: method,
                headers:{Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'},
                body: formData? JSON.stringify(formData) :null
                })
                .then((response)=>  response.text())
                .then((data)=>setData((data))
                 )
        }else{
            const response = await fetch(finalUrl,{
                method: method,
                headers:{Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'},
                body: formData? JSON.stringify(formData) :null
                })
                .then((response)=>  response.json())
                .then((data)=>setData((data))
                 )

        }

        


    }



        return [data, fetchRequest]
  
}
 
export default useFetch ;