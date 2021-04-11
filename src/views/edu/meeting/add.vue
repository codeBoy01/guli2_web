<template>
    <div class="app-container">
      会议表单
      <el-form label-width="120px">

        <el-form-item label="会议标题">
          <el-input v-model="meeting.meetingName" />
        </el-form-item>

        <el-form-item label="会议内容">
          <el-input v-model="meeting.meetingContent"  
           type="textarea"
           :autosize="{ minRows: 8, maxRows: 10}"
          placeholder="请输入内容"
       >
        </el-input>
        </el-form-item>

        <el-form-item label="会议地点">
            <el-input v-model="meeting.meetingPlace" />
          </el-form-item>

          <el-form-item label="开始时间">
            <el-date-picker
            v-model="meeting.meetingStartTime"
            type="datetime"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
          />
          </el-form-item>
  

          <el-form-item label="会议时长(分钟)">
            <el-input v-model="meeting.meetingMinute" />
          </el-form-item>

        <el-form-item label="会议排序">
          <el-input-number
            v-model="meeting.sort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>

          <!-- 接收人 -->
          <el-form-item  label="选择参会人员" >
            <el-select v-model="meeting.meetingPersonId" multiple  placeholder="请选择参会人员" @change="onSelectedDrug($event)">
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
  import meetingApi from "@/api/bs/meeting";
  import ImageCropper from '@/components/ImageCropper';
  import PanThumb from '@/components/PanThumb';
  export default {
    components:{
           ImageCropper,PanThumb
    },
    data() {
      return {
        meeting: {
          meetingName: "",
          meetingContent:"",
          meetingLeaderId:"0000000000",
          meetingLeaderName:"wzz",
          meetingPersonId:"",
          meetingPersonName:"",
          meetingStartTime:"",
          meetingMinute:"",
          meetingPlace:"",
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
      let obj = [];
      var str="";
      for(var p=0;p<e.length;p++){
      obj[p] = this.task_users.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.id === e[p];//筛选出匹配数据
      });
    }
    str=obj[0].username;
    for(var m=1;m<obj.length;m++){
        str=str+","+obj[m].username;
    }
      this.meeting.meetingPersonName=str;
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
          this.meeting = {};
          this.meeting.meetingLeaderId="0000000000";
          this.meeting.meetingLeaderName="wzz";
        }
      },
       //根据任务id查询的方法
    getInfo(id) {
      meetingApi.getMeetingInfo(id).then((response) => {
        this.meeting = response.data.bsMeeting;
        let temp = response.data.bsMeeting.meetingPersonId.split(",");
        this.meeting.meetingPersonId = temp;

      });
    },
      saveOrUpdate() {
        //判断是添加还是修改
        //根据teacher是否有id值
        if (!this.meeting.id) {
          //添加时无id值
          this.saveMeeting();
        } else {
          //修改时有id值
          this.updateMeeting();
        }
      },
      //修改任务的方法
      updateMeeting() {
        var str4=this.meeting.meetingPersonId[0];
          for(var u=1;u<this.meeting.meetingPersonId.length;u++){
              str4=str4+","+this.meeting.meetingPersonId[u];
          }
          this.meeting.meetingPersonId="";
          this.meeting.meetingPersonId=str4;
        meetingApi
          .updateMeetingInfo(this.meeting)
          .then((response) => {
            //添加成功
            //提示信息
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            //回到列表，路由跳转
            this.$router.push({ path: "/meeting/table" });
          })
          .catch((response) => {
            this.$message({
              type: "error",
              message: "修改失败!",
            });
          });
      },
      //添加任务的方法
      saveMeeting() {
          var str2=this.meeting.meetingPersonId[0];
          for(var u=1;u<this.meeting.meetingPersonId.length;u++){
              str2=str2+","+this.meeting.meetingPersonId[u];
          }
          this.meeting.meetingPersonId="";
          this.meeting.meetingPersonId=str2;
        meetingApi
          .addMeeting(this.meeting)
          .then((response) => {
            //添加成功
            //提示信息
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            //回到列表，路由跳转
            this.$router.push({ path: "/meeting/table" });
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
  