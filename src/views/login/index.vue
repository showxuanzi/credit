<template>
    <div class="login-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="account">
                <el-input v-model="ruleForm.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
    </div>
</template>
<script>
import {login} from "@/api/article";
import {setToken} from "@/utils/token";
  export default {
    data() {
      return {
        ruleForm: {
          account: 'admin',
          password: 'admin@123'
        },
        rules: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.$http.post("user/login",this.ruleForm)
            // .then(res => {
            //   console.log(res);
            //   if(res.data.code === 20000){
            //     localStorage.setItem("token",res.data.data.token);
            //     this.$router.push("/home")
            //   }
            // })

            login(this.ruleForm)
            .then(res => {
              console.log(res);
              if(res.data.code === 20000){
                setToken(res.data.data.token);
                this.$router.push("/home")
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
    .login-box{
      width: 500px;
      height: 300px;
      position: fixed;
      left: 50%;
      top: 50%;
      margin: -150px 0 0 -250px;
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 50px 20px;
    }
</style>