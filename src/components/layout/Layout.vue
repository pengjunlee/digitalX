<template>
  <div class="layout">
    <div class="left-container" :style="{width: status.isCollapsed?'64px':'200px'}">
      <div class="logo-wrapper">
        <img style="width:50px;height:50px;" src="./DigitalX1.png" />
      </div>
      <div class="menu-wrapper">
        <el-menu
          text-color="#000000"
          active-text-color="#ffffff"
          router
          unique-opened
          :collapse="status.isCollapsed"
          :default-active="$route.path"
        >
          <template v-for="(menu, index) in menuList">
            <el-menu-item class="menu-item" v-if="menu.children.length === 0" :index="menu.path" :key="index">
              <i :class="menu.icon" style="font-size:24px;"></i>
              <span slot="title">{{menu.title}}</span>
            </el-menu-item>
            <el-submenu v-else :index="menu.path" :key="index">
              <template slot="title">
                <i :class="menu.icon" style="font-size:24px;"></i>
                <span slot="title">{{menu.title}}</span>
              </template>
              <el-menu-item
                class="menu-item"
                v-for="(subMenu, subIndex) in menu.children"
                :index="subMenu.path"
                :key="subIndex"
              >
                <span slot="title" style="margin-left:13px;">{{subMenu.title}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </div>
    </div>

    <div class="topbar-container" :style="{left: this.status.isCollapsed?'64px':'200px'}">
      <div class="el-button el-button--default el-button--small" @click="collapsed">
        <i id="collapsedIcon" :class="this.status.isCollapsed?'el-icon-s-unfold':'el-icon-s-fold'"></i>
      </div>
      <div class="btn-fl el-button el-button--danger el-button--small" @click="logout">
        <i id="collapsedIcon" class="el-icon-switch-button"></i>
      </div>
      <div class="btn-fl el-button el-button--primary el-button--small">
        <span>
          <i id="collapsedIcon" class="el-icon-user"></i>
          {{this.$store.getters.getCurUser}}
        </span>
      </div>
    </div>

    <div class="content-container" :style="{left: this.status.isCollapsed?'64px':'200px'}">
      <div class="content" style="height: 100%;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu_list: [],
      status: {
        isCollapsed: false
      }
    };
  },
  computed: {
    menuList(){
      console.log("获取菜单列表");
      console.log(this.$store.getters.getMenus);
    return this.$store.getters.getMenus;
    }
  },
  methods: {
    collapsed: function() {
      this.status.isCollapsed = !this.status.isCollapsed;
    },
    logout: function() {
      this.$confirm("确认退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 清空vuex中存储的用户数据
          this.$store.dispatch("updateUserAction", {});
          this.$store.dispatch("updateTokenAction", null);
          // 跳转回登录页面
          this.$router.push({ path: "/login" });

          console.log("退出成功");
        })
        .catch(() => {
          console.log("退出异常");
        });
    }
  }
};
</script>
<style scoped>
.left-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  min-width: 200px;
  background-color: #f6f6f6;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 4px 0 rgba(96, 125, 139, 0.9),
    0 0 6px 0 rgba(96, 125, 139, 0.4);
}
.logo-wrapper {
  display: block;
  margin: 20px 5px;
  text-align: center;
}
.topbar-container {
  position: fixed;
  right: 0;
  top: 0;
  height: 48px;
  line-height: 48px;
  padding: 0 10px;
  min-width: 200px;
  background-color: #f6f6f6;
  box-shadow: 0 2px 4px 0 rgba(96, 125, 139, 0.9),
    0 0 6px 0 rgba(96, 125, 139, 0.4);
  transition: all 0.3s ease-in-out;
  z-index: 99;
}
.content-container {
  position: fixed;
  right: 0;
  top: 48px;
  bottom: 0;
  padding: 16px;
  overflow: auto;
  transition: all 0.3s ease-in-out;
}
.menu-item.is-active {
  background-color: #28a745 !important;
}
.btn-fl {
  float: right;
  margin-top: 9px;
}
</style>