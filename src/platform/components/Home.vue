<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8">
          <div class="head-left">
            <h3>Manage Platform</h3>
          </div>
        </el-col>
        <el-col :span="8" :offset="8">
          <div class="head-right">
            <h3>{{admin.name}}</h3>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main></el-main>
  </el-container>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    computed:{
        admin:function(){
            return this._local.getItem("admin");
        }
    }
}
</script>


<style>
.head-left > h3{
    font-weight: 300;
}
.head-right > h3{
    font-weight: 300;
}
</style>
