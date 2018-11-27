<template>
    <div class="loginpage">
        <el-container>
            <el-main>
                <div class="login-card">
                    <div class="login-title">
                        <h1>Sign in to Platform</h1>
                    </div>
                    <div class="login-form">
                        <el-form 
                        ref="form"
                        :model="loginModel"
                        label-position="center"
                        >
                            <el-form-item label="Email address">
                                <el-input v-model="loginModel.telephone"></el-input>
                            </el-form-item>
                            <el-form-item label="Password">
                                <el-input v-model="loginModel.password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" @click="login">Sign in</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import * as ApiLogin from "../api/login.js";
export default {
  data() {
    return {
      loginModel: {
        telephone: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      ApiLogin.login(this.loginModel, ({ status, msg, data }) => {
        if (status === 200) {
          this._local.setItem("token", data.token);
          this._local.setItem("adminId",data.id);
          this._local.setItem("admin",data);
          this.$message({
              message:"登陸成功",
              type:"success"
          })
          //this.$router.push("home");
        } else {
          alert(msg);
        }
      });
    }
  }
};
</script>

<style>
.loginpage {
  background-color: #f9f9f9;
}
.login-card {
  width: 310px;
  margin: 20px auto;
  text-align: center;
}
.login-title > h1 {
  font-weight: 300;
}
.login-form {
  width: 310px;
  height: 270px;
  padding: 20px;
  border: 1px solid #d8dee2;
  border-radius: 5px;
  background-color: #ffffff;
  font-weight: 600;
}
</style>

