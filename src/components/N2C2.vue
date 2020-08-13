<template>
  <div>
    <div class="titlecontainer">
      <img src="../assets/checklist.png" alt class="searchtitle" />
      <div class="titletext">测流任务发布</div>
    </div>
    <div class="searchcontainer">
      <el-form ref="form" :model="form" label-width="30%" class="leftcontent">
        <el-form-item label="测流地址">
          <el-input v-model="form.publishAddress" placeholder="请填写测流地址"></el-input>
        </el-form-item>
        <el-form-item label="使用设备ID">
          <el-select v-model="form.deviceID" placeholder="请选择设备ID" style="width:100%">
            <el-option label="1001" value="1001"></el-option>
            <el-option label="1002" value="1002"></el-option>
            <el-option label="1003" value="1003"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用设备类型">
          <el-select v-model="form.deviceType" placeholder="请选择设备类型" style="width:100%">
            <el-option label="北斗手机" value="Mobile"></el-option>
            <el-option label="测流车" value="Car"></el-option>
            <el-option label="ADCP" value="ADCP"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测流负责人ID">
          <el-select v-model="form.mandoID" placeholder="请选择测流负责人ID" style="width:100%">
            <el-option label="2001" value="2001"></el-option>
            <el-option label="2002" value="2002"></el-option>
            <el-option label="2003" value="2003"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测流负责人">
          <el-input v-model="form.mandoName" placeholder="请填写测流负责人"></el-input>
        </el-form-item>
        <el-form-item label="测流日期">
          <!-- :default-value="form.defaultdate" -->
          <el-date-picker
            type="date"
            placeholder="请选择测流日期"
            v-model="form.DoTime"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="发布人员">
          <el-input v-model="form.manPublishName" placeholder="请填写发布人员"></el-input>
        </el-form-item>
        <el-form-item label="任务备注">
          <el-input type="textarea" v-model="form.publishTips"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlePublish">发布</el-button>
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
        publishAddress: "",
        deviceID: "",
        deviceType: "",
        mandoID: "",
        mandoName: "",
        DoTime: "",
        // defaultdate: new Date(2020, 9, 10),
        manPublishName: "",
        publishTips: "",
        publishTime: "",
        taskState: 0
      }
    };
  },
  methods: {
    handlePublish() {
      this.form.publishTime = this.$options.methods.format(new Date());
      this.form.DoTime = this.$options.methods.format(this.form.DoTime);
      let taskEle = this.form;
      let url = "/jsxun/api/taskAdd";
      this.axios({
        method: "post",
        url: url,
        data: taskEle
      })
        .then(res => {
          if (res.data.code === 1) {
            // this.tableData.push(userEle);
            this.$alert("添加成功", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                console.log(action);
              }
            });
          } else {
            this.$alert("添加失败，请查看填写内容", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                console.log(action);
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    format(date) {
      const year = date.getFullYear();
      const month1 = date.getMonth() + 1;
      const month = month1 < 10 ? "0" + month1 : month1;
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

      const hour =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

      const second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
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
