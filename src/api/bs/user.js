import request from '@/utils/request'
export default{
//1.通过token值来获取管理员id
getUserId(username){
    return request({
      url:`/eduservice/bs-user/getId/`+username,
      method:'get'
  })
}
}