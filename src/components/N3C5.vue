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
          <div class="titletext">新增报警信息</div>
        </el-col>
      </el-row>
      <el-form ref="form" :model="form" label-width="30%" class="leftcontent">
        <el-form-item label="地区">
          <el-input v-model="form.area" placeholder="请填写地区"></el-input>
        </el-form-item>
        <el-form-item label="水位">
          <el-input v-model="form.waterlineMaxNum" placeholder="请填写水位"></el-input>
        </el-form-item>
        <el-form-item label="流量">
          <el-input v-model="form.flowMaxNum" placeholder="请填写流量"></el-input>
        </el-form-item>
        <el-form-item label="流速">
          <el-input v-model="form.speedMaxNum" placeholder="请填写流速"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="warningAdd">新增</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="resultcontainer">
      <el-row class="searchtitle">
        <el-col :span="4">
          <div class>
            <img src="../assets/warning.png" width="40px" />
          </div>
        </el-col>
        <el-col :span="20">
          <div class="titletext">报警信息</div>
        </el-col>
      </el-row>
      <div class="tableContainer">
        <el-table :data="tableData" style="text-align:center">
          <el-table-column label="地区" header-align="center" align="center">
            <template slot-scope="scope">
              <!-- <i class="el-icon-time"></i> -->
              <span style="margin-left:10px">{{ scope.row.area }}</span>
            </template>
          </el-table-column>
          <el-table-column label="水位" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.waterlineMaxNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="流量" header-align="center" align="center">
            <template slot-scope="scope">
             <span style="margin-left:10px">{{ scope.row.flowMaxNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="流速" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.speedMaxNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" header-align="center" align="center" width='150'>
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class='overtimeform' v-if='overtimeForm.show'>
      <el-form ref="row" :model="row" label-width="80px">
        <el-form-item label="地区">
          <el-input v-model="row.area" placeholder="请填写地区"></el-input>
        </el-form-item>
        <el-form-item label="水位">
          <el-input v-model="row.waterlineMaxNum" placeholder="请填写水位"></el-input>
        </el-form-item>
        <el-form-item label="流量">
          <el-input v-model="row.flowMaxNum" placeholder="请填写流量"></el-input>
        </el-form-item>
        <el-form-item label="流速">
          <el-input v-model="row.speedMaxNum" placeholder="请填写流速"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleOvertimeUpdate()">修改</el-button>
          <el-button type="default" @click="closeOvertime()">取消</el-button>
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
      overtimeForm:{
        show:false,
        deviceID:'',
        overtime:''
      },
      row:{
        area:'',
        waterlineMaxNum:'',
        flowMaxNum:'',
        speedMaxNum:''
      },
      form: {
        area:'',
        waterlineMaxNum:'',
        flowMaxNum:'',
        speedMaxNum:''
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
    handleEdit(index,row){
      this.overtimeForm.show = true;
      this.row.area = row.area;
      this.row.waterlineMaxNum = row.waterlineMaxNum;
      this.row.flowMaxNum = row.flowMaxNum;
      this.row.speedMaxNum = row.speedMaxNum;
    },
    handleOvertimeUpdate(){
      let url = "/jsxun/api/warningUpdate";
      let warningEle = {
        area: this.row.area,
        waterlineMaxNum: this.row.waterlineMaxNum,
        flowMaxNum: this.row.flowMaxNum,
        speedMaxNum: this.row.speedMaxNum,
      };
      console.log(warningEle);
      this.axios({
        method: "post",
        url: url,
        data: warningEle
      })
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: '修改成功'
            });
          } else {
            this.$message({
              type: 'success',
              message: '修改失败'
            });
          }
          this.overtimeForm.show = false;
          this.deviceRead();
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeOvertime(){
      this.overtimeForm.show = false;
    },
    handleEdit1(index, row) {
      console.log(index, row);
      this.$prompt('修改过期时间', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          console.log(row.deviceID,row.overtime);
          console.log(value);

          let url = "/jsxun/api/overtimeUpdate";
          let deviceEle = {
            deviceID: row.deviceID,
            overtime: value
          };
          console.log(deviceEle);
          this.axios({
            method: "post",
            url: url,
            data: deviceEle
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
                this.$message({
                  type: 'success',
                  message: '修改成功'
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除设备信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let url = "/jsxun/api/warningDelete";
          this.axios.get(url, { params: { area: row.area } }).then(
            res => {
              if (res.data.code === 1) {
                this.$options.methods.deviceRead.bind(this)();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                this.$alert("删除失败，请检查网络连接", "提示", {
                  confirm: "确定"
                });
              }
            },
            res => {
              console.log("err");
            }
          );
          // this.$message({
          //   type: "success",
          //   message: "删除成功!"
          // });
        })
        .catch(() => {
          // this.$alert("删除成功", "提示", {
          //   confirm: "确定"
          // });
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deviceRead() {
      let url = "/jsxun/api/warningRead";
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
    warningAdd() {
      let warningEle = {
        area: this.form.area,
        waterlineMaxNum: this.form.waterlineMaxNum,
        flowMaxNum: this.form.flowMaxNum,
        speedMaxNum: this.form.speedMaxNum,
      };
      let url = "/jsxun/api/warningAdd";
      this.axios({
        method: "post",
        url: url,
        data: warningEle
      })
        .then(res => {
          if (res.data.code === 1) {
            this.tableData.push(warningEle);
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
.overtimeform{
  padding-top:40px;
  padding-right:80px;
  background-color: #fff;
  border:1px solid #000;
  border-radius: 10px;
  width:400px;
  height:350px;
  position: fixed;
  left:40%;
  top:30%;
  box-sizing: border-box;
  z-index:5000;
}
</style>
