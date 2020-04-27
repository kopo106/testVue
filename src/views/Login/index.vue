<template>
<div id="login">
    <div class="login-container">
      <!--表单 start-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
        <el-form-item prop="username" class="testtype">
            <h3 class="login_title">系统登录</h3>
            <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off" ></el-input>
        </el-form-item>
        <br>
        <el-form-item prop="password" class="testtype">
          <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20" ></el-input>
        </el-form-item>
        <br>
        <el-form-item class="testtype">
          <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="submitForm('loginForm')" >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from 'js-sha1';
import { Message } from 'element-ui';
import { GetSms, Register, Login } from "@/api/login";
import { reactive, ref, isRef, toRefs, onMounted, watch } from '@vue/composition-api';
import { stripscript, validatePass,validateName} from '@/utils/validate';
export default {
    name: 'login',
 
    setup(props, { refs, root }){
      // 验证用户名
      let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(stripscript(value)){
          callback(new Error('用户名格式有误'));
        } else {
          callback(); //true
        }
      };
      // 验证密码
      let validatePassword = (rule, value, callback) => {
        // 过滤后的数据
        ruleForm.password = stripscript(value);
        value = ruleForm.password;
        if (value === '') {
          callback(new Error("请输入密码"));
        } else if (validatePass(value)) {
          callback(new Error("密码为6至20位数字+字母"));
        } else {
          callback();
        }
      };
     
      /*********************************************************************************************************************
       * 声明数据
       */
      // 表单绑定数据
      const ruleForm = reactive({
        username: '',
        password: ''
      
      });
      // 表单的验证
      const rules = reactive({
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      });

      /**
       * 1、不建议在一个方法里面做多件不同的事件（尽可能只做自己本身的事，不要做其他人的事情）
       * 2、尽量把相同的事情封装一个方法里面，通过调用函数进行执行
       */

      /**
       * 声明函数
       */
     
      // 清除表单数据
      const resetFromData = (() => {
        // 重置表单
        // this.$refs[formName].resetFields(); //2.0
        refs.loginForm.resetFields();  // 3.0
      })
     
      /**
       * 提交表单
       */
      const submitForm = (formName => {
        refs[formName].validate((valid) => {
          // 表单验证通过
          if (valid) {
            // 三元运算
            model.value === 'login' ? login() : register()
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }) 
      /**
       * 登录
       */
      const login = (() => {
        let repuestData = {
          username: ruleForm.username,
          password: sha1(ruleForm.password),
          code: ruleForm.code
        }
        root.$store.dispatch('app/login', repuestData).then(response => {
          // 页面跳转
          root.$router.push({
            name: 'Console'
          })
        }).catch(error => {});
      })
      /**
       * 注册
       */
    //   const register = (() => {
    //     let requestData = {
    //       username: ruleForm.username,
    //       password: sha1(ruleForm.password),
    //       code: ruleForm.code,
    //       module: 'register'
    //     }
    //     // 注册接口
    //     Register(requestData).then(response => {
    //       let data = response.data
    //       root.$message({
    //         message: data.message,
    //         type: 'success'
    //       })
    //       // 模拟注册成功
    //       toggleMenu(menuTab[0])
    //       clearCountDown()
    //     }).catch(error => {
    //       // 失败时执行的代码
    //     })
    //   })
    

      /**
       * 生命周期
       */
      // 挂载完成后
      onMounted(() => {
        
      })

      return {     
        ruleForm,
        rules,
        submitForm
      }
    }
}
</script>
<style lang="scss" scoped>

// #poster {
//     background:url("../assets/eva.jpg") no-repeat;
//     background-position: center;
//     height: 100%;
//     width: 100%;
//     background-size: cover;
//     position: fixed;
//   }
//   body{
//     margin: 0px;
//   }
//   .login-container {
//     border-radius: 15px;
//     background-clip: padding-box;
//     margin: 90px auto;
//     width: 350px;
//     padding: 35px 35px 15px 35px;
//     background: #fff;
//     border: 1px solid #eaeaea;
//     box-shadow: 0 0 25px #cac6c6;
//   }
//   .login_title {
//     margin: 0px auto 40px auto;
//     text-align: center;
//     color: #505458;
//   }



#login {
    background:url("../../assets/bg2.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
 
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin:230px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    font-family: 'Microsoft YaHei';
    margin: 0px auto 40px auto;
    text-align: center;
    font-size: 25px!important;
    font-weight: bold;
    color: #505458;
  }
  .item-form{
    margin-bottom: 13px;
  }
  .testtype{
     margin-bottom: 13px; 
  }
</style>