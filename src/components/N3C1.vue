<template>
  <div>
    <div class="searchcontainer">
      <el-scrollbar native="true" noresize="true" class="scrollcontainer" wrap-style="overflow-x:hidden;" >
        <el-row class="searchtitle">
          <el-col :span="6">
            <div class>
              <img src="../assets/addduan.png" width="40px" />
            </div>
          </el-col>
          <el-col :span="18">
            <div class="titletext">新增断面信息</div>
          </el-col>
        </el-row>
        <el-form ref="form" :model="form" label-width="30%" class="leftcontent">
          <el-form-item label="设备ID">
            <el-input v-model="form.deviceid" placeholder="请填写设备ID"></el-input>
          </el-form-item>
          <el-form-item label="截面编号">
            <el-input v-model="form.duanid" placeholder="请填写截面编号"></el-input>
          </el-form-item>
          <el-form-item label="桥梁编号">
            <el-input v-model="form.bridgeid" placeholder="请填写桥梁编号"></el-input>
            <!-- <el-select v-model="form.region" placeholder="请填写桥梁编号" style="width:100%">
            <el-option label="北斗手机" value="mobile"></el-option>
            <el-option label="测流车" value="car"></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item label="左水边距离">
            <el-input v-model="form.leftdis" placeholder="请填写左水边距离"></el-input>
          </el-form-item>
          <el-form-item label="河底高度">
            <el-input v-model="form.riverheight" placeholder="请填写河底高度"></el-input>
          </el-form-item>
          <el-form-item label="文件上传">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchleida">新增</el-button>
            <el-button>取消</el-button>
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
          <div class="titletext">断面信息列表</div>
        </el-col>
      </el-row>
      <div class="tableContainer">
        <el-table :data="tableData" style="text-align:center">
          <el-table-column label="设备编号" header-align="center" align="center">
            <template slot-scope="scope">
              <!-- <i class="el-icon-time"></i> -->
              <span style="margin-left:10px">{{ scope.row.deviceid }}</span>
            </template>
          </el-table-column>
          <el-table-column label="截面编号" header-align="center" align="center">
            <template slot-scope="scope">
              <!-- <div slot="reference" class="name-wrapper"> -->
              <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
              <span style="margin-left:10px">{{ scope.row.duanid }}</span>
              <!-- </div> -->
            </template>
          </el-table-column>
          <el-table-column label="桥梁编号" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.bridgeid }}</span>
            </template>
          </el-table-column>
          <el-table-column label="左水边距离" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.leftdis }}</span>
            </template>
          </el-table-column>
          <el-table-column label="河底高度" header-align="center" align="center">
            <template slot-scope="scope">
              <span style="margin-left:10px">{{ scope.row.riverheight }}</span>
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
// import "@/assets/css/scrollbar.css"
export default {
  name: "N2C1",
  data() {
    return {
      form: {
        deviceid: "",
        duanid: "",
        bridgeid: "",
        leftdis: "",
        riverheight: ""
      },
      fileList: [],
      tableData: [
        {
          deviceid: "0",
          duanid: "v1",
          bridgeid: "nj11",
          leftdis: "10",
          riverheight: "17"
        },
        {
          deviceid: "0",
          duanid: "v1",
          bridgeid: "nj11",
          leftdis: "10",
          riverheight: "17"
        },
        {
          deviceid: "0",
          duanid: "v1",
          bridgeid: "nj12",
          leftdis: "15",
          riverheight: "30"
        },
        {
          deviceid: "0",
          duanid: "v1",
          bridgeid: "nj12",
          leftdis: "20",
          riverheight: "29"
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
/* .el-scrollbar__wrap {
  overflow-x: hidden;
} */

</style>
