<!--
  菜单栏既可以路由跳转也可以链接跳转
  "name": "from", // 父级名称
  "icon": "fa-edit", // 父级icon
  "isHref": false, // 父级是否链接形式
  "url": "", // 父级地址
  "children": [ // 父级的子集
    {
      "name": "表单",
      "icon": "",
      "isHref": false,
      "url": "/form/form"
    }
  ]
-->
<template>
  <aside class="main-sidebar">
    <v-affix offset-top="50">
      <section class="sidebar hideScroll">
        <ul class="sidebar-menu">
          <li v-for="item in menus" :class="{ treeview: item.children && item.children.length }">
            <router-link :to="{ path: item.url }">
              <v-icon :type="item.icon"></v-icon><span>{{item.name}}</span>
              <span class="pull-right-container" v-if="item.children && item.children.length">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </router-link>
            <ul class="treeview-menu" v-if="item.children && item.children.length">
              <li v-for="child in item.children">
                <router-link :to="{ path: child.url }">
                  <v-icon :type="child.icon"></v-icon><span>{{child.name}}</span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </v-affix>
  </aside>
</template>
<script>
  export default {
    props: ['baseInfo'],
    computed: {
      nickName: function() {
        if(this.baseInfo.userInfo) {
          return this.baseInfo.userInfo.nickname;
        }
      },
      menus: function() {
        if(!this.baseInfo.menu) 
          return [
            {
                "id": 4228,
                "name": "首页",
                "url": "/home",
                "icon": "home"
            }            
          ];
        return this.baseInfo.menu;
      }
    }
  }
</script>
