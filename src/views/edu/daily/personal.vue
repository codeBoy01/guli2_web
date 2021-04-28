<template>
    <div class="app-container">
      <el-form label-width="120px">
        <el-form-item label="账号">
           <el-col :span="5">
             <el-input v-model="manager.account" :disabled="true"/>
           </el-col>
        </el-form-item>

        <el-form-item label="更改密码">
          <el-col :span="5">
          <el-input placeholder="请输入新密码" v-model="manager.password" show-password  maxlength="30"/>
          </el-col>
        </el-form-item>

        <el-form-item label="更改班级">
          <el-col :span="5">
          <el-input  v-model="manager.userclass" maxlength="30"/>
          </el-col>
        </el-form-item>

        <el-form-item label="更改实验室">
          <el-col :span="5">
          <el-input  v-model="manager.labName" maxlength="30"/>
          </el-col>
        </el-form-item>

    
    
  <el-form-item label="头像">
      <!-- 头衔缩略图 -->
      <pan-thumb :image="manager.avatar"/>
      <!-- 文件上传按钮 -->
      <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
      </el-button>
      <!--
  v-show：是否显示上传组件
  :key：类似于id，如果一个页面多个图片上传控件，可以做区分
  :url：后台上传的url地址
  @close：关闭上传组件
  @crop-upload-success：上传成功后的回调 -->
      <image-cropper
                     v-show="imagecropperShow"
                     :width="300"
                     :height="300"
                     :key="imagecropperKey"
                     :url="BASE_API+'/eduoss/fileoss'"
                     field="file"
                     @close="close"
                     @crop-upload-success="cropSuccess"/>
  </el-form-item>
  
        <el-form-item>
          <el-button
            :disabled="saveBtnDisabled"
            type="primary"
            @click="Update"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </template>
  <script>
import userApi from "@/api/bs/user";
import { getToken, setToken, removeToken } from '@/utils/auth'
import ImageCropper from '@/components/ImageCropper';
import PanThumb from '@/components/PanThumb';
  export default {
    components:{
           ImageCropper,PanThumb
    },
    data() {
      return {
          manager:{
            account:"",
            userclass:"",
            labName:"",
            avatar:""
          }, 
          token:"",
        //上传弹框组件是否显示
        imagecropperShow:false,
        //上传组件的唯一标识
        imagecropperKey:0,
        //获取dev.env.js端口号
        BASE_API:process.env.BASE_API,
        saveBtnDisabled: false, //保存按钮是否禁用
      };
    },
    created() {
      //页面渲染之前执行
      this.token = getToken();
      this.init();
    },
    methods: {
      //关闭上传弹框的方法
      close(){
        this.imagecropperShow=false
         //上传组件初始化
         this.imagecropperKey=this.imagecropperKey+1
  
      },
      //上传成功的方法
      cropSuccess(data){
         this.imagecropperShow=false
         //上传组件初始化
         this.imagecropperKey=this.imagecropperKey+1
        //上传之后接口返回图片地址
       this.manager.avatar = data.url
      },
    init() {
        userApi.getManagerInfo(this.token)
        .then((response)=>{
          this.manager = response.data.manager
        }).catch(err=>{
        console.log(err);
      });     
      }
      ,
      Update() {
        userApi
          .updateManagerInfo(this.manager)
          .then((response) => {
            //添加成功
            //提示信息
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            //回到列表，路由跳转
            this.$router.push({ path: "daily/personal" });
          })
          .catch((response) => {
            this.$message({
              type: "error",
              message: "修改失败!",
            });
          });
      }
    },
  };
  </script>
  