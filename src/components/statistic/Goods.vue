<template>
  <div class="goods">
    <div class="flex-box">
      <vue-hover-mask v-for="(goods,index) in goodsPage" :key="index">
        <!-- 默认插槽 -->
        <div class="flex-item goods-box">
          <img style=" width: 100%;height: 100%;" :src="goods.imgUrl" crossorigin="anonymous" />
          <div
            style="height:20px;line-height:20px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#28a745;"
          >{{goods.title}}</div>
          <div
            style="height:20px;line-height:20px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#909399;"
          >{{goods.shop}}</div>
        </div>
        <!-- action插槽 -->
        <template v-slot:action>
          <div style="vertical-align: middle;height: 40px;line-height: 40px;">
            <router-link :to="{ name: 'comments', params: { goodsId: goods.goodsNum}}">
              <div class="btn-fl el-button el-button--success el-button--small">
                <span>
                  <i id="collapsedIcon" class="el-icon-s-grid"></i>
                  评论详情
                </span>
              </div>
            </router-link>
            <router-link :to="{ name: 'keywords', params: { goodsId: goods.goodsNum}}">
              <div class="btn-fl el-button el-button--success el-button--small">
                <span>
                  <i id="collapsedIcon" class="el-icon-s-grid"></i>
                  词频统计
                </span>
              </div>
            </router-link>
          </div>
        </template>
      </vue-hover-mask>
    </div>
    <div>
      <el-pagination
        style="float:right;"
        @current-change="pageChange"
        :current-page="this.paginator.page"
        background
        layout="total ,prev, pager, next"
        :total="this.paginator.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import VueHoverMask from "../hoverMask/HoverMask";

export default {
  data() {
    return {
      goodsList: [],
      paginator: { page: 1, total: 0 }
    };
  },
  created() {
    // 发送登录请求，返回json格式响应数据
    this.jsonAxios
      .get("/api/v1/comment/goods/list")
      .then(res => {
        if (res.code === 0) {
          this.paginator.total = res.data.goods.length;
          this.goodsList = res.data.goods;
          console.log(this.goodsList);
        } else {
          console.log(res.msg);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    goodsPage: function() {
      return this.goodsList.slice(
        10 * this.paginator.page - 10,
        10 * this.paginator.page
      );
    }
  },
  components: {
    VueHoverMask
  },
  methods: {
    pageChange: function(page) {
      this.paginator.page = page;
    }
  }
};
</script>


<style scoped>
.flex-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.flex-item {
  order: 1;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  align-self: auto;
}
.goods-box {
  box-sizing: border-box;
  width: 200px;
  height: 300px;
  margin: 5px 5px 5px 5px;
  padding: 5px 5px 50px 5px;
  border: 2px solid #28a745;
  border-radius: 3px;
  font-size: 12px;
}
</style>