<template>
  <div class="menu">
    <div class="menu-box l1">
      <vue-tooltipster
        :tooltipsterOptions="{side:'right'}"
        v-if="hasChildren && status.isCollapsed"
      >
        <div
          :class="currentPath.indexOf(menu.path)==0? 'menu-item current-menu':'menu-item'"
          @click="menuClick($event)"
        >
          <span class="icon-span">
            <i v-bind:class="menu.icon"></i>
          </span>
        </div>
        <div slot="content">
          <li
            class="tip-menu"
            v-for="(submenu,index) in menu.children"
            :key="index"
            :path="submenu.path"
            @click="tipMenuClick($event)"
          >
            <span>{{submenu.title}}</span>
          </li>
        </div>
      </vue-tooltipster>
      <div
        v-else
        :class="currentPath==menu.path? 'menu-item current-menu':'menu-item'"
        @click="menuClick($event)"
      >
        <span class="icon-span">
          <i v-bind:class="menu.icon"></i>
        </span>
        <span v-if="!status.isCollapsed">{{menu.title}}</span>
        <span class="arrow-span" v-if="hasChildren && !status.isCollapsed">
          <i v-if="showSubMenu" class="menu-arrow icon-angle-up icon-large"></i>
          <i v-else class="menu-arrow icon-angle-down icon-large"></i>
        </span>
      </div>
      <ul class="menu-box l2" v-if="showSubMenu && hasChildren && !status.isCollapsed">
        <li
          v-for="(submenu,index) in menu.children"
          :key="index"
          :path="submenu.path"
          :class="currentPath==menu.path? 'menu-item current-menu':'menu-item'"
          @click="subMenuClick($event)"
        >
          <span class="icon-span"></span>
          <span v-if="!status.isCollapsed">{{submenu.title}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import VueTooltipster from "../tooltip/V-ToolTip";

export default {
  data() {
    return {
      showSubMenu: false
    };
  },
  components: {
    VueTooltipster
  },
  props: ["menu", "status"],
  computed: {
    hasChildren: function() {
      return this.menu.children && this.menu.children.length > 0;
    },
    currentPath: function() {
      return this.$router.currentRoute.path;
    }
  },
  methods: {
    menuClick: function(event) {
      var $this = $(event.currentTarget);
      var $arrow = $this.find(".menu-arrow");
      if (this.hasChildren) {
        if ($arrow.hasClass("icon-angle-down")) {
          $arrow.removeClass("icon-angle-down").addClass("icon-angle-up");
          this.showSubMenu = true;
        } else {
          $arrow.removeClass("icon-angle-up").addClass("icon-angle-down");
          this.showSubMenu = false;
        }
      } else {
        $(".menu-item").removeClass("current-menu");
        $this.addClass("current-menu");
        console.log("进入菜单:" + this.menu.path);
        this.$router.push({ path: this.menu.path });
      }
    },
    subMenuClick: function(event) {
      var $this = $(event.currentTarget);
      $(".menu-item").removeClass("current-menu");
      $this.addClass("current-menu");
      console.log("进入菜单:" + $this.attr("path"));
      this.$router.push({ path: $this.attr("path") });
    },
    tipMenuClick: function(event) {
      var $this = $(event.currentTarget);
      console.log("进入菜单:" + $this.attr("path"));
      this.$router.push({ path: $this.attr("path") });
    }
  }
};
</script>
<style scoped>
.menu-box {
  text-align: left;
  list-style: none;
  margin: 0;
  padding: 0;
}
.menu-item {
  cursor: pointer;
  color: black;
  line-height: 48px;
  white-space: nowrap;
  list-style: none;
}
.menu-item:hover {
  color: #7bb6e4;
  background-color: rgba(40, 167, 69, 0.5);
}
.current-menu {
  color: white !important;
  background-color: #28a745 !important;
}
.tip-menu {
  cursor: pointer;
  color: black;
  line-height: 48px;
  white-space: nowrap;
  list-style: none;
}
.tip-menu:hover {
  color: #28a745;
}
.icon-span {
  display: inline-block;
  width: 64px;
  padding-left: 22px;
}
.arrow-span {
  display: inline-block;
  position: absolute;
  right: 20px;
}
.hidden {
  display: none !important;
}
</style>
