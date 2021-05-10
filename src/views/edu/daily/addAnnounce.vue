<template>
    <div class="app-container">
      公告表单
      <el-form label-width="120px">

        <el-form-item label="公告标题">
          <el-input v-model="message.title" />
        </el-form-item>

        <el-form-item label="公告内容">
          <el-input v-model="message.content"  
           type="textarea"
           :autosize="{ minRows: 8, maxRows: 10}"
          placeholder="请输入内容"
       >
        </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="save"
            >发布</el-button
          >
        </el-form-item>
      </el-form>
    </div>
</template>
    <script>
  import message from "@/api/bs/message";
  import { getToken, setToken, removeToken } from '@/utils/auth';
  import userApi from "@/api/bs/user";
      export default {
          data() {
              //定义变量和初始值
              return {
              list: null, //查询之后接口返回集合
              page: 1, //当前页
              limit: 10, //每页记录数
              total: 0, //总记录数
              message:{},//封装的查询对象
              token:""


  
          };
       },
          created() {
           
              
      },
          methods: {

            save(){
                this.token = getToken();
                userApi.getUserId(this.token).then((response)=>{
                this.$set(this.message,'isAnnounce',true)
                this.$set(this.message,'sendid',response.data.userId)
                message. addMessage(this.message)
                  .then((response) => {
                      this.$message({
                      type:'success',
                      message:'发布公告成功'
                    }) 

                this.$router.push({path:'/daily/announcement'})  

          }).catch((error) => {
            //请求失败
            console.log(error);
          });

      }).catch(err=>{
        console.log(err);
      })
      }
  
            
      }
    
  }
    </script>