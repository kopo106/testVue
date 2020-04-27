/**
 * 过滤特殊字符
 */

export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':; ',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
/**
 * 用户名验证
 */

export function validateName(value){
    let reg = /^[a-zA-Z0-9_-]{4,16}$/;;
    if (!reg.test(value)){
        return true
    }else{
        return false
    }
 }

/**
 * 邮箱验证
 */

 export function validateEmail(value){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (!reg.test(value)){
        return true
    }else{
        return false
    }
 }

 /**
  * 密码验证
  */

export function validatePass(value){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    if(!reg.test(value)){
        return true;
    }else{
        return false;
    }
}


 /**
  * 重复密码验证
  */

 export function validatePasswords(value){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    if(!reg.test(value)){
        return true;
    }else{
        return false;
    }
}

 /**
  * 验证码验证
  */

export function validateCheck(value){
    let reg = /^[a-z0-9]{6}$/;
    if(!reg.test(value)){
        return true;
    }else{
        return false;
    }
}