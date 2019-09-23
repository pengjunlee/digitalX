<template>
  <div class="goods">
    <div class="flex-box">
      <vue-hover-mask v-for="(goods,index) in pageGoods" :key="index">
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
        layout="total ,prev, pager, next, jumper"
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
      paginator: { currentPage: 1, hundredPage: 1, tenthIndex: 1, total: 0 }
    };
  },
  created() {
    this.getGoodsList(this.paginator.hundredPage);
  },
  computed: {
    pageGoods: function() {
      return this.goodsList.slice(
        10 * (this.paginator.tenthIndex - 1),
        10 * this.paginator.tenthIndex
      );
    }
  },
  components: {
    VueHoverMask
  },
  methods: {
    pageChange: function(page) {
      let new_page = Math.ceil(page / 10);
      if (new_page !== this.paginator.hundredPage) {
        this.paginator.hundredPage = new_page;
        this.getCommentList(this.paginator.hundredPage);
      }
      this.paginator.tenthIndex = page % 10 === 0 ? 10 : page % 10;
      this.paginator.currentPage = page;
    },
    getGoodsList: function(page) {
      // 发送请求，为了减少请求次数，每次获取数据条数=this.paginator.size
      this.jsonAxios
        .get("/api/v1/comment/goods/list" + "?page=" + page)
        .then(res => {
          if (res.code === 0) {
            this.paginator.total = res.data.total;
            this.goodsList = res.data.rows;
            console.log(res.data.total);
          } else {
            console.log(res.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
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