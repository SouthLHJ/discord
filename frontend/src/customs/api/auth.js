/**정보 업그레이드 
 * 
 * data : require
 * 
 */
export const AuthUpdateAPI = async(data)=>{
    console.log(data);
    const rcv = await fetch(process.env.REACT_APP_SERVER_URI+"/auth/update",{
        method : "post",
        headers : {"content-type" : "application/json"},
        body : JSON.stringify(data)
    })
    const rst = await rcv.json();
    console.log(rst);
    return {data : rst , status : rcv.status}

}