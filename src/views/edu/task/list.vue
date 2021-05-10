<template>
  <div class="app-container">
    任务列表
  <!--查询表单-->
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
      <el-input type="hidden" v-model=" taskQuery.sendid"/>
    </el-form-item>

    <el-form-item>
      <el-input v-model=" taskQuery.taskName" placeholder="任务标题" />
    </el-form-item>
    <el-form-item label="添加时间">
      <el-date-picker
        v-model="taskQuery.begin"
        type="datetime"
        placeholder="选择开始时间"
        value-format="yyyy-MM-dd HH:mm:ss"
        default-time="00:00:00"
      />
    </el-form-item>
    <el-form-item>
      <el-date-picker
        v-model="taskQuery.end"
        type="datetime"
        placeholder="选择截止时间"
        value-format="yyyy-MM-dd HH:mm:ss"
        default-time="00:00:00"
      />
    </el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="getList()"
      >查询</el-button
    >
    <el-button type="default" @click="resetData()">清空</el-button>
  </el-form>

    <el-table
      :data="list"
      border
      cell-style="font-weight:700;"
      style="width: 100%;font-weight:900;"
      :row-style="{height:'100px'}"
      :cell-style="{padding:'0px'}"
      :row-class-name="tableRowClassName">
      <el-table-column
      fixed
      prop="taskName"
      label="任务标题"
      width="150">
    </el-table-column>
      <el-table-column
        fixed
        prop="content"
        label="任务内容"
        width="350">
      </el-table-column>
      <el-table-column
        prop="sendname"
        label="发起人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="recename"
        label="接收人"
        width="120">
      </el-table-column>
      <el-table-column
      prop="taskStatus"
      label="任务状态"
      width="160">
      <template slot-scope="scope">
        {{ scope.row.taskStatus === true ? "已完成" : "进行中" }}
      </template>
    </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="发布时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="gmtFinish"
        label="结束时间"
        width="200">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
          type="success"
          size="mini"
          @click="handleFinish(scope.row.id)">完成</el-button>
       
          <router-link :to="'/task/edit/' + scope.row.id">
          <el-button
          type="primary"
          size="mini">编辑</el-button>
         
        </router-link>
          <el-button
            size="mini"
            type="danger"
            @click="removeDataById(scope.row.id)">删除</el-button>

          <router-link :to="'/task/progress/' + scope.row.id">
            <el-button
            size="mini"
            type="warning"
            >查看任务进展</el-button>
            </router-link>
        </template>
      </el-table-column>
    </el-table>

       <!-- 分页 -->
       <el-pagination
       :current-page="page"
       :page-size="limit"
       :total="total"
       style="padding: 30px 0; text-align: center"
       layout="total, prev, pager, next, jumper"
       @current-change="getList"
     />
  </div>
  </template>
  <style>
    .el-table .warning-row {
      background: oldlace;
    }
  
    .el-table .success-row {
      background: #f0f9eb;
    }
  
  </style>
  <script>
import message from "@/api/bs/message";
import task from "@/api/bs/task";
import userApi from "@/api/bs/user";
import { getToken, setToken, removeToken } from '@/utils/auth'
    export default {
        data() {
            //定义变量和初始值
            return {
            list: null, //查询之后接口返回集合
            page: 1, //当前页
            limit: 10, //每页记录数
            total: 0, //总记录数
            taskQuery:{
            },//封装的查询对象
            token:"",
            sendname:"",
            message:{},
            bsTask:{}
        };
     },
   created() {
            //页面渲染之前执行，一般调用methods中的方法
       
       this.getList();
           
    },
     methods: {
       //删除任务方法
    removeDataById(id) {
      this.$confirm("此操作将永久删除该任务记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        task.getTaskInfo(id)
          .then((response)=>{
            console.log(response);
            this.bsTask = response.data.bsTask;
            this.message.title = "任务取消";
            this.message.content = this.bsTask.sendname+"发布"+"内容为"+this.bsTask.content+"的任务已被删除";
            this.message.userid = this.bsTask.reid;
            console.log(this.message);
            message.addMessage(this.message);
        
          }) .then(()=>{
                //调用删除方法
          task.deleteTaskById(id)
        .then(response => {
          //删除成功
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //回到列表页面
          this.getList();
        
        })

          })
    
      })
    },
    //完成任务
    handleFinish(id){
      this.$confirm("点击完成任务记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        task.finishTaskById(id)
        .then(response => {
          this.$message({
            type: "success",
            message: "成功完成任务!",
          });
          //回到列表页面
          this.getList()
        })
      })

    },

        //根据查询对象得到数据
        getList(page = 1) {
            this.page = page;
            this.token = getToken();
            userApi.getUserId(this.token).then((response)=>{
            this.$set(this.taskQuery,'sendid',response.data.userId)
            task.getTaskListPage(this.page, this.limit, this.taskQuery)
              .then((response) => {
              //请求成功
              //  console.log(response)
              this.list = response.data.rows;
              this.total = response.data.total;
          })
          .catch((error) => {
            //请求失败
            console.log(error);
          });

      }).catch(err=>{
        console.log(err);
      })
          
    },
   tableRowClassName({row, rowIndex}) {
          if (row.taskStatus === true) {
              return 'warning-row';
              }         
         else {
                return 'success-row';
              }
               return '';
          },




  

          
    }
  
}
  </script>