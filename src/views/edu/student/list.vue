<template>
    <div class="app-container">
      学生列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="studentQuery.labName" placeholder="实验室名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="studentQuery.username" placeholder="姓名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="studentQuery.userclass" placeholder="班级" />
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="studentQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="studentQuery.end"
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
        prop="labName"
        label="实验室名称"
        width="400">
      </el-table-column>
        <el-table-column
          fixed
          prop="username"
          label="姓名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="userclass"
          label="班级"
          width="300">
        </el-table-column>
        <el-table-column
        fixed
        prop="account"
        label="账号"
        width="200">
      </el-table-column>
        <el-table-column
          prop="gmtCreate"
          label="创建时间"
          width="350">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
         
            <router-link :to="'/student/edit/' + scope.row.id">
            <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini">编辑</el-button>
            </router-link>
          
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeDataById(scope.row.id)">删除</el-button>
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
  import student from "@/api/bs/student";
      export default {
          data() {
              //定义变量和初始值
              return {
              list: null, //查询之后接口返回集合
              page: 1, //当前页
              limit: 10, //每页记录数
              total: 0, //总记录数
              studentQuery:{}//封装的查询对象
          };
       },
          created() {
              //页面渲染之前执行，一般调用methods中的方法
              this.getList();     
      },
          methods: {
         //删除任务方法
      removeDataById(id) {
        this.$confirm("此操作将永久删除该学生记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          //调用删除方法
          student.deleteStudentById(id)
          .then(response => {
            //删除成功
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //回到列表页面
            this.getList()
          })
        })
      },
          //根据查询对象得到数据
          getList(page = 1) {
              this.page = page;
               student
              .getStudentListPage(this.page, this.limit, this.studentQuery)
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
      }
  
            
      }
    
  }
    </script>