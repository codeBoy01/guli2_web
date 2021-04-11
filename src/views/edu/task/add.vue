<template>
    <div class="app-container">
      任务表单
      <el-form label-width="120px">

        <el-form-item label="任务标题">
          <el-input v-model="task.taskName" />
        </el-form-item>

        <el-form-item label="任务内容">
          <el-input v-model="task.content"  
           type="textarea"
           :autosize="{ minRows: 8, maxRows: 10}"
          placeholder="请输入内容"
       >
        </el-input>
        </el-form-item>

        <el-form-item label="任务排序">
          <el-input-number
            v-model="task.sort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>

          <!-- 接收人 -->
          <el-form-item  label="选择接收人" >
            <el-select v-model="task.reid"  placeholder="请选择接收人" @change="onSelectedDrug($event)">
                <el-option
                    v-for="item in task_users"
                    :key="item.id"
                    :label="item.username"
                    :value="item.id"
                    >
                </el-option>
            </el-select>
        </el-form-item>

  
  
        <el-form-item>
          <el-button
            :disabled="saveBtnDisabled"
            type="primary"
            @click="saveOrUpdate"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </template>
  <script>
  import taskApi from "@/api/bs/task";
  import ImageCropper from '@/components/ImageCropper';
  import PanThumb from '@/components/PanThumb';
  export default {
    components:{
           ImageCropper,PanThumb
    },
    data() {
      return {
        task: {
          taskName: "",
          content:"",
          sendid:"0000000000",
          sendname:"wzz",
          reid:"",
          recename:"",
          gmtCreate:"",
          sort: 0,
        },
        task_users:[],
        //获取dev.env.js端口号
        BASE_API:process.env.BASE_API,
        saveBtnDisabled: false, //保存按钮是否禁用
      };
    },
    created() {
      //页面渲染之前执行
      this.getUserList();
      this.init();
    },
    watch: {
      //监听
      //路由变化方式，路由发生变化，方法就会执行
      $route(to, from) {
        this.init();
      },
    },
    methods: {
    // 获取下拉的值
    onSelectedDrug(e){
      let obj = {};
      obj = this.task_users.find((item)=>{
          return item.id === e;//筛选出匹配数据
      });
      this.task.recename=obj.username;
    },
      getUserList() {
      taskApi.getUserList().then((response) => {
        this.task_users = response.data.list;
      }).catch(err => {
        console.log(err);
      });
    },
      init() {
        //判断路径中是否有id值
        //有id值，做修改操作
        if (this.$route.params && this.$route.params.id) {
          //从路径中获取id值
          const id = this.$route.params.id;
          //调用根据id查询信息的方法
          this.getInfo(id);
          
        } //无id值，做添加操作
        else {
          this.task = {};
          this.task.sendid="0000000000";
          this.task.sendname="wzz";
        }
      },
       //根据任务id查询的方法
    getInfo(id) {
      taskApi.getTaskInfo(id).then((response) => {
        this.task = response.data.bsTask;
      });
    },
      saveOrUpdate() {
        //判断是添加还是修改
        //根据teacher是否有id值
        if (!this.task.id) {
          //添加时无id值
          this.saveTask();
        } else {
          //修改时有id值
          this.updateTeacher();
        }
      },
      //修改任务的方法
      updateTask() {
        taskApi
          .updateTeacherInfo(this.task)
          .then((response) => {
            //添加成功
            //提示信息
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            //回到列表，路由跳转
            this.$router.push({ path: "/teacher/table" });
          })
          .catch((response) => {
            this.$message({
              type: "error",
              message: "修改失败!",
            });
          });
      },
      //添加任务的方法
      saveTask() {
        taskApi
          .addTask(this.task)
          .then((response) => {
            //添加成功
            //提示信息
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            //回到列表，路由跳转
            this.$router.push({ path: "/task/table" });
          })
          .catch((response) => {
            console.log(response)
            this.$message({
              type: "error",
              message: "添加失败!",
            });
          });
      },
    },
  };
  </script>
  