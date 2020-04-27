import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  routes:[
    {

      path: "/",
      redirect: "login",
      meta:{
        name:"主页"
      },
    },
    {
      path: "/login",
      name: "Login",
      meta:{
        name:"登录"
      },
      component: () =>import( "../views/Login/index.vue")
    },
    {
      path: "/console",
      name: "Console",
      redirect: "index",
      meta:{
        name:"控制台"
      },
      component: () =>import( "../views/Layout/index.vue"),
      children:[
        {
          path: "/index",
          name: "Index",
          meta:{
            name:"首页"
          },
          component: () =>import( "../views/Console/index.vue")
        }
      ]
    }
  ]
});

