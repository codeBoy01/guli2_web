import request from '@/utils/request'

export default{
    //1.讲师列表（条件查询分页）
    //current为当前页 limit为每页记录数 teacherQuery为条件对象
    getTeacherListPage(current,limit,teacherQuery){
        return request({
            // url: '/eduservice/teacher/pageTeacherCondition/'+current+'/'+limit,
            url:`/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            // params
            //teacherQuery条件对象，后端使用RequestBody获取数据
            //data:c表示把对象转换成json进行传递到接口里面
            data:teacherQuery
          })
    },
      //2.删除讲师（通过id值）
    deleteTeacherById(id){
        return request({
            // url: '/eduservice/teacher/pageTeacherCondition/'+current+'/'+limit,
            url:`/eduservice/teacher/deleteTeacher/${id}`,
            method: 'delete'
            // params
          })
    },
    //3.添加讲师
    addTeacher(teacher){
        return request({
            url:`/eduservice/teacher/addTeacher`,
            method:'post',
            data:teacher
        })
    },
    //4.查询讲师信息
    getTeacherInfo(id){
        return request({
            url:`/eduservice/teacher/getTeacher/${id}`,
            method:'get'
        })
    },
    //5.修改讲师信息
   updateTeacherInfo(teacher){
        return request({
            url:`/eduservice/teacher/updateTeacher`,
            method:'post',
            data:teacher
        })
    }

}

