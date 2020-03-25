<template>
  <div>
    <div class="searchcontainer">
      <el-row class="searchtitle">
        <el-col :span="3">
          <div class>
            <img src="../assets/back.png" width="40px" @click="history" />
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
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >{{activity.content}}</el-timeline-item>
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
          <el-form-item label="测流地址">
            <el-input v-model="form.address" placeholder="请填写测流地址" disabled></el-input>
          </el-form-item>
          <el-form-item label="使用设备">
            <el-input v-model="form.device" placeholder="请填写测流地址" disabled></el-input>
          </el-form-item>
          <el-form-item label="测流承包单位">
            <el-input v-model="form.company" placeholder="请填写测流承包单位" disabled></el-input>
          </el-form-item>
          <el-form-item label="测流负责人">
            <el-input v-model="form.proleader" placeholder="请填写测流负责人" disabled></el-input>
          </el-form-item>
          <el-form-item label="测流日期">
            <el-date-picker
              type="date"
              placeholder="请选择测流日期"
              v-model="form.date"
              style="width: 100%;"
              :default-value="form.defaultdate"
              disabled
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="发布人员">
            <el-input v-model="form.subleader" placeholder="请填写发布人员" disabled></el-input>
          </el-form-item>
          <el-form-item label="任务备注">
            <el-input type="textarea" v-model="form.info" disabled></el-input>
          </el-form-item>
          <el-form-item label="审核是否通过">
            <el-radio-group v-model="form.resource">
              <el-radio label="通过"></el-radio>
              <el-radio label="不通过"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="check">确认</el-button>
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
    "address",
    "device",
    "company",
    "proleader",
    "date",
    "subleader",
    "state"
  ],
  data() {
    return {
      msg: "taskPercent",
      form: {
        address: this.address,
        device: this.device,
        company: this.company,
        proleader: this.proleader,
        date: this.date,
        defaultdate: new Date(2014, 8, 10),
        subleader: this.subleader,
        info: "记得及时联系中指部，上传巡测位置"
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
    check() {
      console.log(1);
    },
    history() {
      this.$router.go(-1);
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    console.log(this);
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
</style>