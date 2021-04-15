<template>
    <div class="block">
        <el-timeline>
          <el-timeline-item  v-for="(pro, index) in progress"
          :key="index"
          :timestamp="pro.gmtCreate">
            <el-card>
              <h4>{{pro.content}}</h4>
              <p>{{pro.username}} 提交于 {{pro.gmtCreate}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
</template>
<script>
import taskApi from "@/api/bs/task";
    export default {
      data() {
        return {
          progress:[],
          //获取dev.env.js端口号
          BASE_API:process.env.BASE_API,
          saveBtnDisabled: false, //保存按钮是否禁用
        };
      },
      created() {
        //页面渲染之前执行
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
        init() {
          //判断路径中是否有id值
          //有id值，做修改操作
          if (this.$route.params && this.$route.params.id) {
            //从路径中获取id值
            const id = this.$route.params.id;
            //调用根据id查询信息的方法
            this.getInfo(id);
            
          } 
        },
         //根据任务id查询的方法
      getInfo(id) {
        taskApi.getProgress(id).then((response) => {
        this.progress = response.data.bsTaskProgress;
      
        });
      }

    }
    };
    </script>
    