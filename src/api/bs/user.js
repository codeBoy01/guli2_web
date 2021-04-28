import request from '@/utils/request'
export default{
//1.通过token值来获取管理员id
getUserId(username){
    return request({
      url:`/eduservice/bs-user/getId/`+username,
      method:'get'
  })
},
//2.通过id来获取管理员信息
getManagerInfo(username){
    return request({
      url:`/eduservice/bs-user/getInfo/`+username,
      method:'get'
  })
},
//3，修改管理员信息
updateManagerInfo(bsUser){
  return request({
    url:`/eduservice/bs-user/updateManagerInfo`,
    method:'post',
    data:bsUser
  })

}
}