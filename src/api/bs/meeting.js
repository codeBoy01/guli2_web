import request from '@/utils/request'
export default{
  //1.条件分页查询查询任务列表
  getMeetingListPage(current,limit,meetingQuery){
    return request({
        // url: '/eduservice/teacher/pageTeacherCondition/'+current+'/'+limit,
        // url:`/eduservice/bs-task/pageTeskCondition/${current}/${limit}`,
        url:`/eduservice/bs-meeting/pageMeetingCondition/`+current+'/'+limit,
        method: 'post',
        // params
        //taskQuery条件对象，后端使用RequestBody获取数据
        //data:c表示把对象转换成json进行传递到接口里面
        data:meetingQuery
      })
},

  //2.根据接受任务的学生编号来输出学生姓名
  getMeetingReceList(users){
    return request({
      url:`/eduservice/bs-meeting/queryNamesByIds/`+users,
      method:'get'
    })

  },
  //3.完成会议
  finishMeetingById(id){
    return request({
      url:`/eduservice/bs-meeting/finishMeeting/`+id,
      method:'post'
    })
},
  //4.根据会议id查询会议
  getMeetingInfo(id){
    return request({
      url:`/eduservice/bs-meeting/getMeeting/`+id,
      method:'get'
    })
  },
  //5.更新会议
    updateMeetingInfo(bsMeeting){
      return request({
          url:`/eduservice/bs-meeting/updateMeeting`,
          method:'post',
          data:bsMeeting
      })
  },
    //6.添加会议
    addMeeting(meeting){
      return request({
          url:`/eduservice/bs-meeting/addMeeting`,
          method:'post',
          data:meeting
      })
  },
   //7.删除会议（通过id值）
   deleteMeetingById(id){
    return request({
        // url: '/eduservice/teacher/pageTeacherCondition/'+current+'/'+limit,
        url:`/eduservice/bs-meeting/deleteMeeting/`+id,
        method: 'delete'
        // params
      })
},
}