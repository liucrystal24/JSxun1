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
          <div class="titletext">新设备入网</div>
        </el-col>
      </el-row>
      <el-form ref="form" :model="form" label-width="30%" class="leftcontent">
        <el-form-item label="设备ID">
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
        </el-form-item>
        <el-form-item label="设备地区">
          <el-input v-model="form.deviceArea" placeholder="请填写设备地区"></el-input>
        </el-form-item>
        <el-form-item label="过期时间">
          <el-date-picker
            type="date"
            placeholder="选择过期日期"
            v-model="form.overtime"
            :default-value="form.enddefaultdate"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="使用用户ID">
          <el-input v-model="form.userID" placeholder="请填写使用用户ID"></el-input>
        </el-form-item>
        <el-form-item label="使用用户名">
          <el-input v-model="form.userName" placeholder="请填写使用用户名"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="deviceAdd">新增</el-button>
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
          <div class="titletext">设备信息</div>
        </el-col>
      </el-row>
      <div class="tableContainer">
        <el-table :data="tableData" style="text-align:center">
          <el-table-column label="设备ID" header-align="center" align="center">
            <template slot-scope="scope">
              <!-- <i class="el-icon-time"></i> -->
              <span style="margin-left:10px">{{ scope.row.deviceID }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备名称" header-align="center" align="center">
            <template slot-scope="scope">
              <!-- <div slot="reference" class="name-wrapper"> -->
              <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
              <span style="margin-left:10px">{{ scope.row.deviceName }}</span>
              <!-- </div> -->
            </template>
          </el-table-column>
          <el-table-column label="设备类型" header-align="center" align="center">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.deviceType }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="设备地区" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.deviceArea }}</span>
            </template>
          </el-table-column>
          <el-table-column label="过期时间" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.overtime }}</span>
            </template>
          </el-table-column>
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
      <el-form ref="overtimeform" :model="overtimeform" label-width="30%">
        <el-form-item label="过期时间">
          <el-date-picker
            type="date"
            placeholder="选择过期日期"
            v-model="overtimeForm.overtime"
          ></el-date-picker>
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
      form: {
        deviceID: "",
        deviceName: "",
        deviceType: "",
        deviceArea: "",
        userID: "",
        userName: "",
        overtime: "",
        enddefaultdate: new Date(2021, 3, 1)
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
      this.overtimeForm.deviceID = row.deviceID;
      // this.overtimeForm.overtime = row.overtime;
    },
    handleOvertimeUpdate(){
      let url = "/jsxun/api/overtimeUpdate";
      let deviceEle = {
        deviceID: this.overtimeForm.deviceID,
        overtime: this.overtimeForm.overtime
      };
      console.log(deviceEle);
      this.axios({
        method: "post",
        url: url,
        data: deviceEle
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
          let url = "/jsxun/api/deviceDelete";
          this.axios.get(url, { params: { deviceID: row.deviceID } }).then(
            res => {
              if (res.data.code === 1) {
                this.$options.methods.deviceRead.bind(this)();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                // this.$alert("删除成功", "提示", {
                //   confirm: "确定"
                // });
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
    deviceAdd() {
      let deviceEle = {
        deviceID: this.form.deviceID,
        deviceName: this.form.deviceName,
        deviceType: this.form.deviceType,
        deviceArea: this.form.deviceArea,
        overtime: this.form.overtime
        // userID: this.form.userID,
        // userName: this.form.userName
      };
      let url = "/jsxun/api/deviceAdd";
      this.axios({
        method: "post",
        url: url,
        data: deviceEle
      })
        .then(res => {
          if (res.data.code === 1) {
            this.tableData.push(deviceEle);
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
  background-color: #fff;
  border:1px solid #000;
  border-radius: 10px;
  width:400px;
  height:150px;
  position: fixed;
  left:40%;
  top:30%;
}
</style>
