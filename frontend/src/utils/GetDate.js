const GetDate = () => {



    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return (`${year}-${month}-${date}`)


};
 
export default GetDate ;