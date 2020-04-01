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
      console.log(1);
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
