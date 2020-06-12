<template>
	<div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="account">
					<el-input v-model="ruleForm.account"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
					<el-input v-model="ruleForm.password" show-password></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
				<el-input v-model="ruleForm.checkPass" show-password></el-input>
			</el-form-item>	
			<el-form-item label="权限分配">
				<el-radio-group v-model="ruleForm.role_id">
					<el-radio label="销售人员"></el-radio>
					<el-radio label="初审人员"></el-radio>
				</el-radio-group>
			</el-form-item>	
			<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import {createUser} from "@/api/article";
// import {setToken} from "@/utils/token";
  export default {
    data() {
			var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          account: '',
					password: '',
					checkPass: "",
					role_id: "销售人员"
        },
        rules: {
          account: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
					],
					checkPass: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
					role_id: [
            { required: true, message: '请选择人员类型', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {role_id} = this.ruleForm;
            if(role_id === "销售人员"){
              this.ruleForm.role_id = 2;
            }else if(role_id === "初审人员"){
              this.ruleForm.role_id = 3;
            }else{
              this.ruleForm.role_id = 1;
            }
            createUser(this.ruleForm)
            .then(res => {
              console.log(res);
              if(res.data.code === 20000){
                this.$message({
									type: 'success',
									message: '创建成功!'
                });
                this.$router.push("/permission/list");
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