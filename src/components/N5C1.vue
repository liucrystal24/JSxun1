<template>
  <div>
    <div class="searchcontainer">
      <el-row class="searchtitle">
        <el-col :span="6">
          <div class>
            <img src="../assets/userlist.png" width="40px" />
          </div>
        </el-col>
        <el-col :span="18">
          <div class="titletext">用户列表</div>
        </el-col>
      </el-row>
      <el-table :data="userData" style="text-align:center" class="leftcontent">
        <el-table-column label="用户名" header-align="center" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属部门" header-align="center" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px">{{ scope.row.company }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="resultcontainer">
      <el-row class="searchtitle">
        <el-col :span="4">
          <div class>
            <img src="../assets/rootlock.png" width="40px" />
          </div>
        </el-col>
        <el-col :span="20">
          <div class="titletext">权限管理</div>
        </el-col>
      </el-row>
      <div class="tableContainer">
        <el-form ref="form" :model="form" label-width="40%">
          <el-form-item label="用户名">
            <el-select
              v-model="form.username"
              placeholder="请选修改权限用户"
              @change="rootChange(form.username)"
            >
              <el-option label="林主任" value="admin"></el-option>
              <el-option label="王主任" value="wang"></el-option>
              <el-option label="赵主任" value="zhao"></el-option>
              <el-option label="孙主任" value="sun"></el-option>
              <el-option label="李主任" value="li"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="测流任务发布">
            <el-switch v-model="userroot.taskPublish"></el-switch>
          </el-form-item>
          <el-form-item label="测流信息一审">
            <el-switch v-model="userroot.taskOne"></el-switch>
          </el-form-item>
          <el-form-item label="测流信息二审">
            <el-switch v-model="userroot.taskTwo"></el-switch>
          </el-form-item>
          <el-form-item label="报警设置修改">
            <el-switch v-model="userroot.warningUpdate"></el-switch>
          </el-form-item>
          <el-form-item label="单兵_断面修改">
            <el-switch v-model="userroot.duanCheck"></el-switch>
          </el-form-item>
          <el-form-item label="数据分析">
            <el-switch v-model="userroot.dataAny"></el-switch>
          </el-form-item>
          <!-- <el-form-item> -->
          <el-button type="primary" @click="rootUpdate">修改</el-button>
          <!-- <el-button>取消</el-button> -->
          <!-- </el-form-item> -->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "N2C1",
  data() {
    return {
      form: {
        username: ""
      },
      userData: [
        {
          username: "林主任",
          company: "江苏省局水利部",
          sort: "1001"
        },
        {
          username: "王主任",
          company: "苏州市水利部",
          sort: "1001"
        },
        {
          username: "赵主任",
          company: "南京市水利部",
          sort: "1001"
        },
        {
          username: "孙主任",
          company: "扬州市水利部",
          sort: "1001"
        },
        {
          username: "李主任",
          company: "常州市水利部",
          sort: "1001"
        }
      ],
      tableData: [
        {
          date: "2019-01-02",
          name: "测流设备1",
          id: "1001",
          kind: "北斗手机"
          // address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2019-02-02",
          name: "测流设备2",
          id: "1002",
          kind: "测速车"
          // address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2019-03-02",
          name: "测流设备3",
          id: "1003",
          kind: "北斗手机"
          // address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2019-04-01",
          name: "测流设备4",
          id: "1004",
          kind: "测速车"
          // address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      userroot: {
        taskPublish: false,
        taskOne: false,
        taskTwo: false,
        warningUpdate: false,
        duanCheck: false,
        dataAny: false
      },
      rootList: []
    };
  },
  methods: {
    searchleida() {
      function test() {
        let url = "/jsxun/api/flowUpload";
        this.axios({
          method: "post",
          url: url,
          data: {
            bridgeID: "jd01",
            flowData: "235",
            deviceType: "Car",
            fileUpload: base64,
            testTime: "2019-04-17 00:00:00",
            lon: "128",
            lat: "20"
          }
        })
          // 方法一
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    rootRead() {
      let url = "/jsxun/api/rootRead";
      this.axios.get(url, {}).then(
        res => {
          if (res.data.code === 1) {
            this.rootList = res.data.info;
            console.log(this.rootList);
          }
        },
        res => {
          console.log("err");
        }
      );
    },
    rootChange(username) {
      console.log(username);
      this.rootList.forEach((val, index) => {
        if (val.username === username) {
          Object.keys(val).forEach(key => {
            console.log(val[key]);
            // val[key] = val[key] === 1 ? true : val[key] === 0 ? false;
            if (val[key] === 1) {
              val[key] = true;
            } else if (val[key] === 0) {
              val[key] = false;
            }
          });
          this.userroot = val;
        }
      });
    },
    rootUpdate() {
      let url = "/jsxun/api/rootUpdate";
      let rootEle = {
        username: this.userroot.username,
        taskPublish: this.userroot.taskPublish,
        taskOne: this.userroot.taskOne,
        taskTwo: this.userroot.taskTwo,
        warningUpdate: this.userroot.warningUpdate,
        duanCheck: this.userroot.duanCheck,
        dataAny: this.userroot.dataAny
      };
      console.log(rootEle);
      this.axios({
        method: "post",
        url: url,
        data: rootEle
      })
        .then(res => {
          if (res.data.code === 1) {
            this.$alert("修改成功", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                console.log(action);
              }
            });
          } else {
            this.$alert("修改失败，请选择用户名", "提示", {
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
    }
  },
  mounted() {
    this.rootRead();
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
.resultcontainer {
  float: left;
  width: 65%;
  height: 100%;
  box-sizing: border-box;
}
.searchtitle {
  padding-top: 20px;
  padding-left: 10px;
  height: 80px;
}
.titletext {
  line-height: 44px;
  text-align: left;
}
.tableContainer {
  padding-top: 20px;
  border: 1px solid #ddd;
  width: 90%;
  margin: 0 auto;
  overflow: auto;
  height: 80%;
}
.leftcontent {
  width: 90%;
  margin: 10px auto;
  border: 1px solid #ddd;
}
</style>
