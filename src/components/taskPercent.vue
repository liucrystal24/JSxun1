<template>
  <div>
    <div class="searchcontainer">
      <el-row class="searchtitle">
        <el-col :span="3">
          <div>
            <img src="../assets/back.png" width="40px" @click="history" class="backbutton" />
          </div>
        </el-col>
        <el-col :span="4" style="textAlign:right;">
          <div class>
            <img src="../assets/calendar.png" width="40px" />
          </div>
        </el-col>
        <el-col :span="15">
          <div class="titletext">测流任务进度</div>
        </el-col>
      </el-row>
      <div class="timecontainer">
        <el-timeline>
          <!-- <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >{{activity.content}}</el-timeline-item>-->
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <h4>任务发布</h4>
              <p>林东 2018/4/3 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/5" placement="top">
            <el-card>
              <h4>一审已完成</h4>
              <p>林东 2018/4/5 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/10" placement="top">
            <el-card>
              <h4>二审已完成</h4>
              <p>林东 2018/4/10 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <h4>任务已完成</h4>
              <p>林东 2018/4/12 20:46</p>
              <el-button type="primary" size="small" class="routeButton" @click="taskRoute">查看任务轨迹</el-button>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <div class="resultcontainer">
      <el-row class="searchtitle">
        <el-col :span="4" style="textAlign:right;">
          <div class>
            <img src="../assets/taskdetail.png" width="40px" />
          </div>
        </el-col>
        <el-col :span="20">
          <div class="titletext">测流任务详情</div>
        </el-col>
      </el-row>
      <div class="tableContainer">
        <el-form ref="form" :model="form" label-width="30%" class="leftcontent" size="mini">
          <el-form-item label="发布时间">
            <el-input v-model="form.publishTime" placeholder="请填写测流地址" disabled></el-input>
          </el-form-item>
          <el-form-item label="执行时间">
            <el-input v-model="form.DoTime" placeholder="请填写测流地址" disabled></el-input>
          </el-form-item>
          <el-form-item label="发布测流地址">
            <el-input v-model="form.publishAddress" placeholder="请填写测流承包单位" disabled></el-input>
          </el-form-item>
          <el-form-item label="测流设备ID">
            <el-input v-model="form.deviceID" placeholder="请填写测流负责人" disabled></el-input>
          </el-form-item>
          <el-form-item label="测流设备类型">
            <el-input v-model="form.deviceType" placeholder="请填写测流负责人" disabled></el-input>
          </el-form-item>
          <el-form-item label="执行人姓名">
            <el-input v-model="form.mandoName" placeholder="请填写测流负责人" disabled></el-input>
          </el-form-item>
          <el-form-item label="发布人姓名">
            <el-input v-model="form.manPublishName" placeholder="请填写测流负责人" disabled></el-input>
          </el-form-item>
          <el-form-item label="发布任务备注">
            <el-input v-model="form.publishTips" placeholder="请填写测流负责人" disabled></el-input>
          </el-form-item>
          <!-- <el-form-item label="测流日期">
            <el-date-picker
              type="date"
              placeholder="请选择测流日期"
              v-model="form.date"
              style="width: 100%;"
              :default-value="form.defaultdate"
              disabled
          ></el-date-picker>-->
          <!-- </el-form-item> -->
          <el-form-item label="审核是否通过">
            <el-radio-group v-model="form.stateChange">
              <el-radio label="通过"></el-radio>
              <el-radio label="不通过"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="taskCheck">确认</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <p>{{address}}</p>
    <p>{{device}}</p>
    <p>{{company}}</p>
    <p>{{proleader}}</p>
    <p>{{date}}</p>
    <p>{{subleader}}</p>
    <p>{{state}}</p>-->
  </div>
</template>

<script>
export default {
  name: "taskPercent",
  props: [
    "publishTime",
    "DoTime",
    "taskState",
    "publishAddress",
    "deviceID",
    "deviceType",
    "mandoID",
    "mandoName",
    "manPublishName",
    "publishTips"
  ],
  data() {
    return {
      msg: "taskPercent",
      form: {
        publishTime: this.publishTime,
        DoTime: this.DoTime,
        taskState: this.taskState,
        publishAddress: this.publishAddress,
        deviceID: this.deviceID,
        deviceType: this.deviceType,
        mandoID: this.mandoID,
        mandoName: this.mandoName,
        manPublishName: this.manPublishName,
        publishTips: this.publishTips
      },
      activities: [
        {
          content: "已发布",
          timestamp: "2019-03-12",
          size: "large",
          type: "primary",
          icon: "el-icon-more"
        },
        {
          content: "一审",
          timestamp: "等待……",
          color: "#0bbd87"
        },
        {
          content: "二审",
          timestamp: "等待……",
          size: "large"
        },
        {
          content: "已完成",
          timestamp: "等待……"
        }
      ]
    };
  },
  methods: {
    taskCheck() {
      // console.log(1);
      this.$alert("完成审核", "提示", {
        confirm: "确定"
      });
    },
    history() {
      // this.$router.go(-1);
      this.$router.push({
        name: "n2c3"
      });
    },
    taskRoute() {
      this.$router.push({
        name: "taskRoute",
        params: this.form
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    next();
  }
};
</script>

<style scoped>
.searchcontainer {
  float: left;
  width: 35%;
  height: 100%;
  box-sizing: border-box;
  border-right: 1px solid #324098;
}
.timecontainer {
  width: 50%;
  margin: 0 auto;
  text-align: left;
  font-size: 20px !important;
}
.resultcontainer {
  float: left;
  width: 65%;
  box-sizing: border-box;
  height: 100%;
}
.searchtitle {
  padding-top: 20px;
  padding-left: 10px;
  height: 90px;
}
.titletext {
  line-height: 44px;
  text-align: left;
  padding-left: 15px;
}
.tableContainer {
  padding-top: 20px;
  height: 70%;
  /* min-height: 365px; */
  border: 1px solid #ddd;
  width: 90%;
  margin: 0 auto;
  overflow-y: auto;
}
.leftcontent {
  width: 90%;
}
.backbutton {
  cursor: pointer;
  /* width: 200px; */
}
.routeButton {
  margin-top: 5px;
}
</style>