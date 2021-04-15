import request from '@/utils/request'
export default{
  //1.条件分页查询查询任务列表
  getStudentListPage(current,limit,studentQuery){
    return request({
        // url: '/eduservice/teacher/pageTeacherCondition/'+current+'/'+limit,
        // url:`/eduservice/bs-task/pageTeskCondition/${current}/${limit}`,
        url:`/eduservice/bs-user/pageStudentCondition/`+current+'/'+limit,
        method: 'post',
        // params
        //taskQuery条件对象，后端使用RequestBody获取数据
        //data:c表示把对象转换成json进行传递到接口里面
        data:studentQuery
      })  
},
  //2.通过id删除学生
  deleteStudentById(id){
    return request({
      url:`/eduservice/bs-user/deleteStudent/`+id,
      method:'delete'
  })
}
}