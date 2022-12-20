const postMethod = {
    method : "post",
    headers : {"content-type" : "application/json"}
}
const serverURL = process.env.REACT_APP_SERVER_URI;

/** 계정과 친구 사이에 다이렉트가 있는지 체크
 *  
 *  return {result : , datas : }
 */
export const IsDirectAPI = async(token)=>{
    const rcv =  await fetch(serverURL+"/channels/isdirect",{
        ...postMethod,
        body : JSON.stringify({
            token : token
        })
    })

    return await rcv.json();
}

/** 계정과 친구 새로운 채팅 채널 생성
 *  
 *  return {result : , datas : }
 */
export const NewChannelAPI = async(token,user2)=>{
    const rcv = await fetch(serverURL+"/channels/new",{
        ...postMethod,
        body : JSON.stringify({
            token : token,
            user2 : user2
        })
    })

    return await rcv.json();
}