<template>
  <el-card class="box-card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" v-model="text" readonly></el-input>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>
<script>
export default {
  name: 'OutputTranslation',
  props: ['text']
}
</script>
<style>
.box-card {
  width: 500px;
  max-width: 90vw;
  margin: auto;
  padding: 10px;
}
.el-row {
  margin-bottom: 20px;
}
</style>
