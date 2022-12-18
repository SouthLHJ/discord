const postMethod = {
    method : "post",
    headers : {"content-type" : "application/json"}
}

/** data : user2 값 보내기 */
export const RelationApplyAPI = async(token,data)=>{
    const rcv = await fetch(process.env.REACT_APP_SERVER_URI+"/relation/apply",{
        ...postMethod,
        body : JSON.stringify({token,...data})
    })
    const rst = await rcv.json();
    return {result : rst.result, data : rst.data , status : rcv.status}

}

/** data : user2 값 보내기 */
export const RelationCancelAPI = async(token,data)=>{
    const rcv = await fetch(process.env.REACT_APP_SERVER_URI+"/relation/cancel",{
        ...postMethod,
        body : JSON.stringify({token,...data})
    })
    const rst = await rcv.json();
    return {result : rst.result, status : rcv.status}

}


/** data : user2 값 보내기 */
export const RelationDenyAPI = async(token,data)=>{
    const rcv = await fetch(process.env.REACT_APP_SERVER_URI+"/relation/deny",{
        ...postMethod,
        body : JSON.stringify({token,...data})
    })
    const rst = await rcv.json();
    return {result : rst.result,status : rcv.status}

}