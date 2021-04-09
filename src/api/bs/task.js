import request from '@/utils/request'
export default{
  //1.条件分页查询查询任务列表
  getTaskListPage(current,limit,taskQuery){
    return request({
        // url: '/eduservice/teacher/pageTeacherCondition/'+current+'/'+limit,
        // url:`/eduservice/bs-task/pageTeskCondition/${current}/${limit}`,
        url:`/eduservice/bs-task/pageTaskCondition/`+current+'/'+limit,
        method: 'post',
        // params
        //taskQuery条件对象，后端使用RequestBody获取数据
        //data:c表示把对象转换成json进行传递到接口里面
        data:taskQuery
      })
},
  //2.添加任务
    addTask(task){
      return request({
          url:`/eduservice/bs-task/addTask`,
          method:'post',
          data:task
      })
  },
  //3.接收人列表
    getUserList(){
      return request({
        url:`/eduservice/bs-user/getAll`,
        method:'get'
      })

    },
 //4.删除任务（通过id值）
   deleteTaskById(id){
            return request({
                // url: '/eduservice/teacher/pageTeacherCondition/'+current+'/'+limit,
                url:`/eduservice/bs-task/deleteTask/`+id,
                method: 'delete'
                // params
              })
        },
  //5.完成任务（通过id值）
  finishTaskById(id){
          return request({
            url:`/eduservice/bs-task/finishTask/`+id,
            method:'post'
          })

  },
  //6.更新任务（通过id值）
  updateTaskInfo(bsTask){
    return request({
        url:`/eduservice/bs-task/updateTask`,
        method:'post',
        data:bsTask
    })
},
  //7.根据id获取任务信息
    getTaskInfo(id){
      return request({
          url:`/eduservice/bs-task/getTask/`+id,
          method:'get'
      })
  },
    getAllTask(){
        return request({
          // url: '/eduservice/teacher/pageTeacherCondition/'+current+'/'+limit,
          url: `/eduservice/bs-task/getAllTask`,
          method: 'get'
        })
      },

}