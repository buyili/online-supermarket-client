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
                                <el-input v-model="loginModel.email"></el-input>
                            </el-form-item>
                            <el-form-item label="Password">
                                <el-input v-model="loginModel.psw"></el-input>
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
export default {
  data() {
    return {
      loginModel: {
        email: "",
        psw: ""
      }
    };
  },
  methods: {
    login() {
        alert("login success!")
    }
  }
};
</script>

<style>
.loginpage{
    background-color: #f9f9f9;
}
.login-card{
    width: 310px;
    margin: 20px auto;
    text-align: center;
}
.login-title > h1{
    font-weight: 300;
}
.login-form{
    width: 310px;
    height: 270px;
    padding: 20px;
    border: 1px solid #d8dee2;
    border-radius: 5px;
    background-color: #ffffff;
    font-weight: 600;
}
</style>

