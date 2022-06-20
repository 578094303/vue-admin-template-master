<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="id" width="180"> </el-table-column>
    <el-table-column prop="age" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="dateTime" label="日期"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { StudentManager, DeleteData } from "@/api/student";

export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      StudentManager().then((request) => {
        console.log(request);
        this.tableData = request.students;
        console.log(this.tableData);
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row.id);

      DeleteData({ Id:row.id }).then((request) => {
        console.log(request)
        if(request.mesaage == "OK"){
          alert('删除成功');
        }
      });
    },
  },
};
</script>