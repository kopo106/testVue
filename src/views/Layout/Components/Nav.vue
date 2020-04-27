<template>
    <div id = "nav-wrap">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="transparent" text-color="#fff" active-text-color="#fff">
            <el-submenu v-for="(item,index) in routers" :key="item.id" :index="index+''">
                <!-- 一级菜单 -->
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">{{item.meta.name}}</span>
                </template>
                <!-- 子集菜单 -->

                <el-menu-item v-for="subItem in item.children" :key="subItem.id" index="1-1">{{subItem.meta.name}}</el-menu-item>

                <!-- <el-submenu index="1-4">
                    <span slot="title">选项4</span>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu> -->
            </el-submenu>
            
           
        </el-menu>
    </div>
</template>
<script>
import {reactive,ref,isRef,toRefs,onMounted} from '@vue/composition-api';
export default {
    name:'navMenu',
    setup(props,{root}){

        const isCollapse = ref(false);
        const routers = reactive(root.$router.options.routes)
        console.log(routers);

        const handleClose = (key,keyPath) =>{
            console.log(key,keyPath);
        }
        const handleOpen = (key,keyPath) =>{
            console.log(key,keyPath);
        }

        return {
            isCollapse,
            handleClose,
            handleOpen,
            routers
        }
    }

}
</script>
<style lang="scss" scoped>
@import '../../../styles/config.scss';
#nav-wrap{
    position: fixed;
    top:0;
    left:0;
    width:$navMenu;
    height: 100vh;
    background-color: #344a5f;
}
</style>