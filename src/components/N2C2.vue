<template>
  <div>
    <div class="titlecontainer">
      <img src="../assets/checklist.png" alt class="searchtitle" />
      <div class="titletext">测流任务发布</div>
    </div>
    <div class="searchcontainer">
      <el-form ref="form" :model="form" label-width="30%" class="leftcontent">
        <el-form-item label="测流地址">
          <el-input v-model="form.address" placeholder="请填写测流地址"></el-input>
        </el-form-item>
        <el-form-item label="使用设备">
          <el-select v-model="form.device" placeholder="请选择设备类型" style="width:100%">
            <el-option label="北斗手机" value="mobile"></el-option>
            <el-option label="测流车" value="car"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测流承包单位">
          <el-input v-model="form.company" placeholder="请填写测流承包单位"></el-input>
        </el-form-item>
        <el-form-item label="测流负责人">
          <el-input v-model="form.proleader" placeholder="请填写测流负责人"></el-input>
        </el-form-item>
        <el-form-item label="测流日期">
          <el-date-picker
            type="date"
            placeholder="请选择测流日期"
            v-model="form.date"
            style="width: 100%;"
            :default-value="form.defaultdate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="发布人员">
          <el-input v-model="form.subleader" placeholder="请填写发布人员"></el-input>
        </el-form-item>
        <el-form-item label="任务备注">
          <el-input type="textarea" v-model="form.info"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchleida">发布</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "N2C1",
  data() {
    return {
      form: {
        address: "",
        device: "",
        company: "",
        proleader: "",
        date: "",
        defaultdate: new Date(2014, 8, 10),
        subleader: "",
        info: ""
      }
    };
  },
  methods: {
    searchleida() {
      console.log(1);
    }
  }
};
</script>

<style scoped>
.titlecontainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
.searchtitle {
  float: left;
  line-height: 100px;
  /* padding-top: 20px; */
  /* padding-left: 10px; */
  height: 50px;
}
.titletext {
  float: left;
  font-size: 20px;
  padding-left: 20px;
}
.searchcontainer {
  float: left;
  width: 80%;
  height: 80%;
  /* margin-top: 3%; */
  margin-left: 10%;
  padding-top: 30px;
  box-sizing: border-box;
  border: 1px solid #324098;
  overflow-y: auto;
}
.resultcontainer {
  float: left;
  width: 65%;
  box-sizing: border-box;
}

.tableContainer {
  border: 1px solid #ddd;
  width: 90%;
  margin: 0 auto;
}
.leftcontent {
  width: 90%;
}
</style>
