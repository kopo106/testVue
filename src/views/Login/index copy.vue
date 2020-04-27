<template>
    <div id="login">
      <div class="login-wrap">
          <ul class="menu-tab">
              <li :class="{'current':item.current}" @click="toggleMenu(item)" v-for="item in menuTab" :key="item.id" >{{item.txt}}</li>              
          </ul>
          <!-- 表单开始 -->
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="medium">
            
            <el-form-item  prop="username" class="item-form">
                <label>邮箱</label>
                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item  prop="passWord" class="item-form">
                <label>密码</label>
                <el-input type="text" v-model="ruleForm.passWord" autocomplete="off" minlength="6" maxlength="20"></el-input>
            </el-form-item>


            <el-form-item  prop="passWords" class="item-form" v-if ="model === 'register'">
                <label>重复密码</label>
                <el-input type="text" v-model="ruleForm.passWords" autocomplete="off" minlength="6" maxlength="20"></el-input>
            </el-form-item>

            <el-form-item  prop="checkcode" class="item-form">
                <label>验证码</label>
                <el-row :gutter="11">
                    <el-col :span="15">
                        <el-input type="text" v-model="ruleForm.checkcode" minlength="6" maxlength="20"></el-input>
                    </el-col>
                    <el-col :span="9">
                        <el-button type="success" class="block">获取验证码</el-button>
                    </el-col>
                </el-row>

                
                
            </el-form-item>

            <el-form-item>
                <el-button type="danger" @click="submitForm('ruleForm')" class="block login-btn">提交</el-button>
            </el-form-item>
          </el-form>

      </div>
    </div>
</template>
<script>
import {stripscript, validateEmail,validatePassword,validateCheck} from '@/utils/validate';
export default {
    name:'login',
    data(){
        var checkcode = (rule, value, callback) => {
            console.log(stripscript(value ));
            this.ruleForm.checkcode = stripscript(value);
            value = this.ruleForm.checkcode;
            if (value==='') {
                callback(new Error('验证码不能为空'));
            }else if(validateCheck(value)){
                callback(new Error('验证码格式错误'));
            }else{
                callback();
            }
        };
        var validateusername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else if(validateEmail(value)){
                callback(new Error('用户名格式有误'));
            } else {
                callback();
            }
        };
        var validatepassword = (rule, value, callback) => {
            
            this.ruleForm.passWord = stripscript(value);
            value = this.ruleForm.passWord ;
            
            if (value === '') {         
                callback(new Error('请输入密码'));
            } else if(validatePassword(value)){
                callback(new Error('密码为6-20位数字于字母'));
            } else {
                callback();
            }
        };

         var validatepasswords = (rule, value, callback) => {
            if (this.model === 'login'){ callback();}
            if (value != this.ruleForm.passWord) {         
                callback(new Error('请再次输入密码'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                username: '',
                passWord: '',
                passWords: '',
                checkcode: ''
            },
            rules: {
                username: [
                    { validator: validateusername, trigger: 'blur' }
                ],
                passWord: [
                    { validator: validatepassword, trigger: 'blur' }
                ],
                passWords: [
                    { validator: validatepasswords, trigger: 'blur' }
                ],
                checkcode: [
                    { validator: checkcode, trigger: 'blur' }
                ]
            },
            menuTab:[
                {txt:"登录",current:true,type:'login'},
                {txt:"注册",current:false,type:'register'}
            ],
            model:'login'
        };
        return {
            
        }
    },
    

    created(){},
    mounted(){},
    methods:{
        // 数据驱动视频渲染
        // JS是操作DOM
        toggleMenu (data){
            this.menuTab.forEach(elem => {
                elem.current = false
            });
            data.current = true

            this.model = data.type
        },
        
        submitForm(formName) {
            
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }
    }
        
}
</script>>
<style lang="scss" scoped>
#login{
    height: 100vh;
    background-color: #344a5f;
}

.login-wrap{
    width: 330px;
    margin: auto;
}

.menu-tab{
    text-align: center;
    li{
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        // 边角2px 弧度
        border-radius:2px;
        // 点击的鼠标指针变成小手
        cursor: pointer;
    }
}

.current{
    background-color: rgba(0,0,0,.1)
}

.login-form{
    margin-top: 29px;
    label {
        display: block;
        margin-bottom: 3px;
        font-size : 14px;
        color: #fff;
    }

.item-form{
    margin-bottom: 13px;
}

.block{
    display: block;
     width: 100%;
}

.login-btn{
    margin-top: 19px;
}

}
</style>