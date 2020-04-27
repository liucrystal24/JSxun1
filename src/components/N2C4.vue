<template>
  <div>
    <div class="titlecontainer">
      <img src="../assets/checklist.png" alt class="searchtitle" />
      <div class="titletext">测流信息录入</div>
    </div>
    <div class="searchcontainer">
      <el-form ref="form" :model="form" label-width="30%" class="leftcontent">
        <el-form-item label="桥梁名称">
          <el-select
            v-model="form.bridgeID"
            placeholder="请选择桥梁"
            style="width:100%"
          >
            <el-option
              v-for="bridge in bridgeList"
              :label="bridge.label"
              :value="bridge.value"
              :key="bridge.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测流日期">
          <el-date-picker
            v-model="form.date"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
            style="width: 100%;"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="流量">
          <el-input
            v-model="form.flowData"
            placeholder="请填写流量数据"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="flowUp">录入</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "N2C4",
  data() {
    return {
      form: {
        bridgeID: "",
        date: "",
        defaultdate: new Date(),
        flowData: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      bridgeList: []
    };
  },
  methods: {
    flowUp() {
      function format(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const hour = date.getHours();
        const minute =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        // var minute = date.getMinutes();
        const second =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        // var second = date.getSeconds();

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
      let url = "/jsxun/api/flowUpload";
      this.axios({
        method: "post",
        url: url,
        data: {
          bridgeID: this.form.bridgeID,
          flowData: this.form.flowData,
          testTime: format(this.form.date)
        }
      })
        // 方法一
        .then(res => {
          console.log(res.data);
          this.$alert("录入成功", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              console.log(action);
            }
          });
        })
        .catch(err => {
          console.log(err);
          this.$alert("录入失败，上传参数格式错误", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              console.log(action);
            }
          });
        });
    },
    readBridge() {
      let url = "/jsxun/api/bridgeRead";
      this.axios.get(url, {}).then(
        res => {
          if (res.data.code === 1) {
            console.log(res.data);
            let bridgesArr = res.data.info.bridgeInfo;
            let bridgesCookie = [];
            for (let i = 0; i < bridgesArr.length; i++) {
              const element = bridgesArr[i];
              let bridgeCookie = {};
              bridgeCookie.label = bridgesArr[i].bridgeName;
              bridgeCookie.value = bridgesArr[i].bridgeID;
              bridgesCookie.push(bridgeCookie);
            }
            this.bridgeList = bridgesCookie;
          }
        },
        res => {
          console.log("err");
        }
      );
    }
  },
  mounted() {
    this.readBridge();
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
