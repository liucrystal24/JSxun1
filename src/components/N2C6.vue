<template>
  <div>
    <div class="searchcontainer">
      <el-row class="searchtitle">
        <el-col :span="6">
          <div class>
            <img src="../assets/search.png" width="40px" />
          </div>
        </el-col>
        <el-col :span="18">
          <div class="titletext">新用户登记</div>
        </el-col>
      </el-row>
      <el-form ref="form" :model="form" label-width="30%" class="leftcontent">
        <el-form-item label="用户ID">
          <el-input v-model="form.userID" placeholder="请填写用户ID"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.userName" placeholder="请填写用户名"></el-input>
        </el-form-item>
        <!-- <el-form-item label="设备ID">
          <el-input v-model="form.deviceID" placeholder="请填写设备ID"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="form.deviceName" placeholder="请填写设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="form.deviceType" placeholder="请选择设备类型" style="width:100%">
            <el-option label="ADCP" value="ADCP"></el-option>
            <el-option label="Car" value="Car"></el-option>
            <el-option label="Mobile" value="Mobile"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="userAdd">新增</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="resultcontainer">
      <el-row class="searchtitle">
        <el-col :span="4">
          <div class>
            <img src="../assets/files.png" width="40px" />
          </div>
        </el-col>
        <el-col :span="20">
          <div class="titletext">用户信息</div>
        </el-col>
      </el-row>
      <div class="tableContainer">
        <el-table :data="tableData" style="text-align:center">
          <el-table-column label="用户ID" header-align="center" align="center">
            <template slot-scope="scope">
              <!-- <i class="el-icon-time"></i> -->
              <span style="margin-left:10px">{{ scope.row.userID }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户名" header-align="center" align="center">
            <template slot-scope="scope">
              <!-- <div slot="reference" class="name-wrapper"> -->
              <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
              <span style="margin-left:10px">{{ scope.row.userName }}</span>
              <!-- </div> -->
            </template>
          </el-table-column>
          <!-- <el-table-column label="设备类型" header-align="center" align="center">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.deviceType }}</el-tag>
              </div>
            </template>
          </el-table-column>-->
          <!-- <el-table-column label="用户ID" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.userID }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户名" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.userName }}</span>
            </template>
          </el-table-column>-->
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        deviceID: "",
        deviceName: "",
        deviceType: "",
        userID: "",
        userName: ""
      },
      tableData: [
        // {
        //   deviceID: "",
        //   deviceName: "",
        //   deviceType: "",
        //   userID: "",
        //   userName: ""
        // }
      ]
    };
  },
  methods: {
    searchleida() {
      console.log(1);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    deviceRead() {
      let url = "/jsxun/api/deviceRead";
      this.axios.get(url, {}).then(
        res => {
          if (res.data.code === 1) {
            // console.log(res.data);
            this.tableData = res.data.info;
          }
        },
        res => {
          console.log("err");
        }
      );
    },
    userAdd() {
      let userEle = {
        deviceID: this.form.deviceID,
        deviceName: this.form.deviceName,
        deviceType: this.form.deviceType,
        userID: this.form.userID,
        userName: this.form.userName
      };
      console.log(userEle)
      let url = "/jsxun/api/deviceAdd";
      this.axios({
        method: "post",
        url: url,
        data: userEle
      })
        .then(res => {
          if (res.data.code === 1) {
            this.tableData.push(userEle);
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
    }
  },
  mounted() {
    this.deviceRead();
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
  border: 1px solid #ddd;
  width: 90%;
  margin: 0 auto;
}
.leftcontent {
  width: 90%;
}
</style>
