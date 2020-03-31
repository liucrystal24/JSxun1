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
        <el-form-item label="设备名称">
          <el-input v-model="form.name" placeholder="请填写设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备ID">
          <el-input v-model="form.name" placeholder="请填写设备ID"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="form.region" placeholder="请选择设备类型" style="width:100%">
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
          <el-table-column label="录入日期" header-align="center" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left:10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备名称" header-align="center" align="center">
            <template slot-scope="scope">
              <!-- <div slot="reference" class="name-wrapper"> -->
              <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
              <span style="margin-left:10px">{{ scope.row.name }}</span>
              <!-- </div> -->
            </template>
          </el-table-column>
          <el-table-column label="设备ID" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.id }}</span>
              <!-- <div slot="reference" class="name-wrapper"> -->
              <!-- <el-tag size="medium">{{ scope.row.id }}</el-tag> -->
              <!-- </div> -->
            </template>
          </el-table-column>
          <el-table-column label="设备类型" header-align="center" align="center">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.kind }}</el-tag>
              </div>
            </template>
          </el-table-column>
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
        startdate: "",
        starttime: "",
        startdefaultdate: new Date(2014, 8, 10),
        enddate: "",
        endtime: "",
        enddefaultdate: new Date(2014, 8, 15)
      },
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
    }
  },

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
