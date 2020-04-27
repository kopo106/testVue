<template>
    <div id="header-wrap">
        头部文件
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
#header-wrap{
    @import '../../../styles/config.scss';
    position:fixed;
    top:0;
    left: $navMenu;
    right: 0;
    height: 75px;
    background-color: #fff;
    -webkit-box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
}
</style>