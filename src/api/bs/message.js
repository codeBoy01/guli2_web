import request from '@/utils/request'
export default{
  //1.条件分页查询查询任务列表
  getMessageListPage(current,limit,message){
    return request({
        // url: '/eduservice/teacher/pageTeacherCondition/'+current+'/'+limit,
        // url:`/eduservice/bs-task/pageTeskCondition/${current}/${limit}`,
        url:`/eduservice/bs-message/pageMessageCondition/`+current+'/'+limit,
        method: 'post',
        // params
        //taskQuery条件对象，后端使用RequestBody获取数据
        //data:c表示把对象转换成json进行传递到接口里面
        data:message
      })
},
  //2.发送信息
  addMessage(message){
      return request({
          url:"/eduservice/bs-message/addMessage",
          method:'post',
          data:message
      })

  },
  //3.查询公告
  getAnnounceList(current,limit){
    return request({
      url:"/eduservice/bs-message/getAnnounce/"+current+'/'+limit,
      method:'get'
    })
  }
}