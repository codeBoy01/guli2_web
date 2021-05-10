<template>
    <div class="app-container">
      <!--查询表单-->
      <!-- <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="messageQuery.content" placeholder="内容" />
        </el-form-item>
        
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form> -->
      <!-- 表格 -->
      <router-link :to="'/daily/addAnnounce'">
      <el-button
      type="primary"
      >发布公告</el-button>
      </router-link>

      <el-table
        :data="list"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="序号" width="70" align="center">
          <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="140"   align="center"/>
        <el-table-column prop="content" label="内容" width="1275"   align="center"/>
        <el-table-column prop="gmtCreate" label="添加时间" width="210"   align="center"/>
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
  <script>
  import message from "@/api/bs/message";
  import { getToken, setToken, removeToken } from '@/utils/auth';
  import userApi from "@/api/bs/user";
  export default {
    //写核心代码位置
    // data:{
  
    // },
    data() {
      //定义变量和初始值
      return {
        list: null, //查询之后接口返回集合
        page: 1, //当前页
        limit: 10, //每页记录数
        total: 0, //总记录数
        token:""
      };
    },
    created() {
      //页面渲染之前执行，一般调用methods中的方法
      this.getList();
    },
    methods: {
         //根据查询对象得到数据
         getList(page = 1) {
            message.getAnnounceList(this.page, this.limit)
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
          
    },

      //删除讲师方法
      removeDataById(id) {
        this.$confirm("此操作将永久删除该讲师记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          //调用删除方法
          teacher.deleteTeacherById(id)
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
      }
    }
  };
  </script>