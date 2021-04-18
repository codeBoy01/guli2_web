<template>
    <div class="app-container">
      <el-form label-width="120px">
        <el-form-item label="信息描述">
          <el-tag type="info">excel模版说明</el-tag>
          <el-tag>
            <i class="el-icon-download"/>
            <a :href="'/static/学生表格样例.xlsx'">点击下载模版</a>
          </el-tag>
        </el-form-item>
        <el-form-item label="选择Excel">
          <el-upload
            ref="upload"
            :auto-upload="false"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :disabled="importBtnDisabled"
            :limit="1"
            :action="BASE_API+'/eduservice/bs-user/addStudent'"
            name="file"
            accept="application/vnd.ms-excel">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              :loading="loading"
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload">{{ fileUploadBtnText }}</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
  </template>
  <script>
import { getToken, setToken, removeToken } from '@/utils/auth'

  export default {
      data(){
          return{
              BASE_API:process.env.BASE_API,//接口API地址
              // OSS_PATH:process.env.OSS_PATH,//阿里云oss地址
              fileUploadBtnText:'上传到服务器',//按钮文字
              importBtnDisabled:false,//按钮是否禁用
              loading:false,
              token:null,
  
          }
      },
      created(){
        this.token = getToken();
        console.log(this.token)
    
      },
      methods:{
          //点击按钮上传文件到接口里面
        submitUpload(){
          this.fileUploadBtnText = '正在上传'
          this.importBtnDisabled = true
          this.loading = true
          this.$refs.upload.submit()
  
        },
        //上传成功
  
        fileUploadSuccess(){
            //提示信息
            this.loading = false
            this.$message({
                type:'success',
                message:'添加学生成功'
            }) 
            //路由跳转
            this.$router.push({path:'/student/table'})  
        },
        //上传失败
        fileUploadError(){
             //提示信息
            this.loading = false
            this.$message({
                type:'error',
                message:'添加学生失败'
            })   
  
        }

  
      }
  }
  </script>