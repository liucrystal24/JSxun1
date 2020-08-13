<template>
  <div>
    <div class="titlecontainer">
      <img src="../assets/notebook.png" alt class="searchtitle" />
      <div class="titletext">测流任务列表</div>
    </div>
    <div class="tableContainer">
      <el-table :data="tableData" style="text-align:center">
        <el-table-column label="任务状态" header-align="center" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" :type="taskstate(scope.row.taskState)">{{ scope.row.taskState }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发布日期" header-align="center" align="center" width="185">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left:10px">{{ scope.row.publishTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="执行日期" header-align="center" align="center" width="185">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left:10px">{{ scope.row.DoTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="测流地址" header-align="center" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px">{{ scope.row.publishAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备类型" header-align="center" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px">{{ scope.row.deviceType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备ID" header-align="center" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px">{{ scope.row.deviceID }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目负责人" header-align="center" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px">{{ scope.row.mandoName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布人员" header-align="center" align="center">
          <template slot-scope="scope">
            <span style="margin-left:10px">{{ scope.row.manPublishName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="任务备注"
          header-align="center"
          align="center"
          :show-overflow-tooltip="taskstyle"
        >
          <template slot-scope="scope">
            <span style="margin-left:10px;width:100px;">{{ scope.row.publishTips }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <router-link :to="{name:'TaskPercent'}">123</router-link> -->
  </div>
</template>

<script>
export default {
  name: "N2C3",
  data() {
    return {
      tableData: [],
      taskstyle: true
    };
  },
  methods: {
    taskRead() {
      let url = "/jsxun/api/taskRead";
      this.axios.get(url, {}).then(
        res => {
          if (res.data.code === 1) {
            console.log(res.data.info);
            this.tableData = res.data.info;
          } else {
            console.log("error");
          }
        },
        res => {
          console.log("networkerr");
        }
      );
    },
    taskstate(i) {
      switch (i) {
        case "已发布":
          return "";
        case "一审中":
          return "danger";
        case "二审中":
          return "danger";
        case "正在执行":
          return "warning";
        case "已完成":
          return "success";
      }
    },
    handleEdit(i, row) {
      this.$router.push({
        name: "TaskPercent",
        params: {
          publishTime: row.publishTime,
          DoTime: row.DoTime,
          taskState: row.taskState,
          publishAddress: row.publishAddress,
          deviceID: row.deviceID,
          deviceType: row.deviceType,
          mandoID: row.mandoID,
          mandoName: row.mandoName,
          manPublishName: row.manPublishName,
          publishTips: row.publishTips
        }
      });
      console.log(i, row);
    },
    handleDelete(i, row) {
      console.log(i, row);
    }
  },
  mounted() {
    this.taskRead();
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
.tableContainer {
  border: 1px solid #ddd;
  width: 90%;
  margin: 0 auto;
}
</style>