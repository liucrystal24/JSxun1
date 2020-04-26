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
            <!-- <div slot="reference" class="name-wrapper"> -->
            <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
            <span style="margin-left:10px">{{ scope.row.username }}</span>
            <!-- </div> -->
          </template>
        </el-table-column>
        <el-table-column label="所属部门" header-align="center" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px">{{ scope.row.company }}</span>
            <!-- <div slot="reference" class="name-wrapper"> -->
            <!-- <el-tag size="medium">{{ scope.row.id }}</el-tag> -->
            <!-- </div> -->
          </template>
        </el-table-column>
        <!-- <el-table-column label="设备类型" header-align="center" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.kind }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
      <!-- <el-form ref="form" :model="form" label-width="30%" class="leftcontent">
        <el-form-item label="设备名称">
          <el-input v-model="form.name" placeholder="请填写设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备ID">
          <el-input v-model="form.name" placeholder="请填写设备ID"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select
            v-model="form.region"
            placeholder="请选择设备类型"
            style="width:100%"
          >
            <el-option label="北斗手机" value="mobile"></el-option>
            <el-option label="测流车" value="car"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用用户">
          <el-input v-model="form.name" placeholder="请填写使用用户"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchleida">新增</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form> -->
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
          <!-- <el-form-item label="设备名称">
            <el-input
              v-model="form.name"
              placeholder="请填写设备名称"
            ></el-input>
          </el-form-item> -->
          <el-form-item label="测流任务发布">
            <el-switch v-model="userroot.taskPublic"></el-switch>
          </el-form-item>
          <el-form-item label="测流信息一审">
            <el-switch v-model="userroot.taskCheck1"></el-switch>
          </el-form-item>
          <el-form-item label="测流信息二审">
            <el-switch v-model="userroot.taskCheck2"></el-switch>
          </el-form-item>
          <el-form-item label="报警设置修改">
            <el-switch v-model="userroot.warningSetting"></el-switch>
          </el-form-item>
          <el-form-item label="单兵_断面修改">
            <el-switch v-model="userroot.duanmian"></el-switch>
          </el-form-item>
          <el-form-item label="数据分析">
            <el-switch v-model="userroot.dataReport"></el-switch>
          </el-form-item>
          <!-- <el-form-item> -->
            <el-button type="primary" @click="searchleida">修改</el-button>
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
        startdate: "",
        starttime: "",
        startdefaultdate: new Date(2014, 8, 10),
        enddate: "",
        endtime: "",
        enddefaultdate: new Date(2014, 8, 15)
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
      userroot:{
        taskPublic:true,
        taskCheck1:true,
        teslCheck2:false,
        warningSetting:true,
        duanmian:true,
        dataReport:false,
      }
    };
  },
  methods: {
    searchleida() {
      function test(){
      let url = "/jsxun/api/flowUpload";
      let base64 = "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"
      // console.log(row.id);
      // this.loadingshow = true;
      this.axios({
        method: "post",
        url: url,
        data: { bridgeID: 'jd01', flowData: '235', deviceType:'Car',fileUpload:base64, testTime:'2019-04-17 00:00:00',lon:'128',lat:'20'},
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
