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
}
}