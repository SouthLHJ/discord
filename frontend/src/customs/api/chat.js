const postMethod = {
    method : "post",
    headers : {"content-type" : "application/json"}
}
const serverURL = process.env.REACT_APP_SERVER_URI;

/** 작성한 사람 토큰(db 저장용), 채널 아이디(socket 통신용), 보낸 내용 (db 저장용)
 * 
 *  return {result : , datas : {_id, channel, author, content, timeStamp}}
 */
export const NewMessageAPI = async(token,channelId,content)=>{
    const rcv = await fetch(serverURL+`/channels/${channelId}/message`,{
        ...postMethod,
        body : JSON.stringify({
            token,
            content,
        })
    })
    return await rcv.json()
}


export const MessageLogAPI = async()=>{
    
}