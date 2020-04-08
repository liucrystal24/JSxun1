<template>
  <div>
    <div class="searchcontainer">
      <el-scrollbar
        native="true"
        noresize="true"
        class="scrollcontainer"
        wrap-style="overflow-x:hidden;"
      >
        <el-row class="searchtitle">
          <el-col :span="6">
            <div class>
              <img src="../assets/addduan.png" width="40px" />
            </div>
          </el-col>
          <el-col :span="18">
            <div class="titletext">新增桥梁信息</div>
          </el-col>
        </el-row>
        <el-form ref="form" :model="form" label-width="30%" class="leftcontent">
          <el-form-item label="桥梁编号">
            <el-input v-model="form.bridgeID" placeholder="请填写桥梁编号"></el-input>
          </el-form-item>
          <el-form-item label="桥梁名称">
            <el-input v-model="form.bridgeName" placeholder="请填写桥梁名称"></el-input>
          </el-form-item>
          <el-form-item label="桥梁经度">
            <el-input v-model="form.lon" placeholder="请填写桥梁经度"></el-input>
          </el-form-item>
          <el-form-item label="桥梁纬度">
            <el-input v-model="form.lat" placeholder="请填写桥梁纬度"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addBridge">新增</el-button>
            <!-- <el-button>取消</el-button> -->
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>

    <div class="resultcontainer">
      <el-row class="searchtitle">
        <el-col :span="4">
          <div class>
            <img src="../assets/duanlist.png" width="40px" />
          </div>
        </el-col>
        <el-col :span="20">
          <div class="titletext">桥梁信息列表</div>
        </el-col>
      </el-row>
      <div class="tableContainer">
        <el-table :data="tableData" style="text-align:center">
          <el-table-column label="桥梁编号" header-align="center" align="center">
            <template slot-scope="scope">
              <!-- <i class="el-icon-time"></i> -->
              <span style="margin-left:10px">{{ scope.row.bridgeID }}</span>
            </template>
          </el-table-column>
          <el-table-column label="桥梁名称" header-align="center" align="center">
            <template slot-scope="scope">
              <!-- <div slot="reference" class="name-wrapper"> -->
              <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
              <span style="margin-left:10px">{{ scope.row.bridgeName }}</span>
              <!-- </div> -->
            </template>
          </el-table-column>
          <el-table-column label="桥梁经度" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.lon }}</span>
            </template>
          </el-table-column>
          <el-table-column label="桥梁纬度" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.lat }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" header-align="center" align="center" width="160px">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%" center>
        <span>删除成功!</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="deleteDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="updateDialogVisible" width="30%" center>
        <el-form ref="form" :model="form" label-width="30%" class="leftcontent">
          <el-form-item label="桥梁编号">
            <el-input v-model="update.bridgeID" placeholder="请填写桥梁编号" disabled></el-input>
          </el-form-item>
          <el-form-item label="桥梁名称">
            <el-input v-model="update.bridgeName" placeholder="请填写桥梁名称"></el-input>
          </el-form-item>
          <el-form-item label="桥梁经度">
            <el-input v-model="update.lon" placeholder="请填写桥梁经度"></el-input>
          </el-form-item>
          <el-form-item label="桥梁纬度">
            <el-input v-model="update.lat" placeholder="请填写桥梁纬度"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateBridge">确定修改</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import "@/assets/css/scrollbar.css"
export default {
  name: "N1C1",
  data() {
    return {
      form: {
        bridgeID: "",
        bridgeName: "",
        lon: "",
        lat: ""
      },
      update: {
        bridgeID: "",
        bridgeName: "",
        lon: "",
        lat: ""
      },
      fileList: [],
      tableData: [],
      deleteDialogVisible: false,
      addDialogVisible: false,
      updateDialogVisible: false,
      upindex: ""
    };
  },
  mounted() {
    this.readBridge();
  },
  methods: {
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
              bridgeCookie.lon = bridgesArr[i].lon;
              bridgeCookie.lat = bridgesArr[i].lat;
              bridgeCookie.bridgeID = bridgesArr[i].bridgeID;
              bridgeCookie.bridgeName = bridgesArr[i].bridgeName;
              bridgesCookie.push(bridgeCookie);
            }
            this.tableData = bridgesCookie;
          }
        },
        res => {
          console.log("err");
        }
      );
    },
    addBridge() {
      let url = "/jsxun/api/bridgeAdd";
      let that = this;
      this.axios({
        method: "post",
        url: url,
        data: {
          bridgeID: this.form.bridgeID,
          bridgeName: this.form.bridgeName,
          lon: this.form.lon,
          lat: this.form.lat
        }
      })
        .then(res => {
          if (res.data.code === 1) {
            this.$options.methods.readBridge.bind(this)();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateBridge() {
      let url = "/jsxun/api/bridgeUpdate";
      this.axios({
        method: "post",
        url: url,
        data: {
          bridgeID: this.update.bridgeID,
          bridgeName: this.update.bridgeName,
          lon: this.update.lon,
          lat: this.update.lat
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.$options.methods.readBridge.bind(this)();
            this.updateDialogVisible = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchleida() {
      console.log(1);
    },
    handleEdit(index, row) {
      this.updateDialogVisible = true;
      this.update.bridgeID = row.bridgeID;
      this.update.bridgeName = row.bridgeName;
      this.update.lon = row.lon;
      this.update.lat = row.lat;
      this.upindex = index;
      // console.log(index, row);
    },
    handleDelete(index, row) {
      // this.tableData.splice(index, 1);
      let url = "/jsxun/api/bridgeDelete";
      this.axios.get(url, { params: { bridgeID: row.bridgeID } }).then(
        res => {
          console.log(res);
          if (res.data.code === 1) {
            this.$options.methods.readBridge.bind(this)();
            this.deleteDialogVisible = true;
          }
        },
        res => {
          console.log("err");
        }
      );
    },

    //上传文件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
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
  /* overflow-y: auto; */
}
.scrollcontainer {
  height: 100%;
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
  border: 1px solid #ddd;
  width: 90%;
  margin: 0 auto;
  overflow-y: auto;
  max-height: 80%;
}
.leftcontent {
  width: 90%;
}
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>