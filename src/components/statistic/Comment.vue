<template>
  <div class="comments">
    <table>
      <tr v-for="(comment,index) in pageComments" :key="index">
        <td style="width:100%;min-width:300px;border-bottom: 1px solid gray;">
          <div class="first-comment">
            <div>
              <div style="color:gray;margin-bottom:10px;">初次评价 {{comment.rateDate}}</div>
            </div>
            <div>{{comment.rateContent}}</div>
            <div v-if="comment.pics.length>0">
              <div
                v-for="(url,index) in comment.pics"
                :key="index"
                style="display: inline-block;margin-right:3px;"
              >
                <el-image style="width: 100px; height: 100px" :src="url" fit="fit"></el-image>
              </div>
            </div>
          </div>
          <div class="append-comment" v-if="comment.appendComment">
            <div>
              <div style="color:gray;margin:10px 0;">{{comment.appendComment.days}}天后追评</div>
            </div>
            <div style="margin-bottom:10px;">{{comment.appendComment.content}}</div>
            <div>
              <div
                v-for="(url,index) in comment.appendComment.pics"
                :key="index"
                style="display: inline-block;margin-right:3px;"
              >
                <el-image style="width: 100px; height: 100px" :src="url" fit="fit"></el-image>
              </div>
            </div>
          </div>
        </td>
        <td
          style="min-width:100px;border-bottom: 1px solid gray;    color: #28a745;text-align:center;"
        >{{comment.displayUserNick}}</td>
      </tr>
    </table>
    <div>
      <el-pagination
        style="float:right;"
        @current-change="pageChange"
        :current-page="this.paginator.currentPage"
        background
        layout="total, prev, pager, next, jumper"
        :total="this.paginator.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comment_list: [],
      paginator: { currentPage: 1, hundredPage: 1, tenthIndex: 1, total: 0 }
    };
  },
  mounted() {
    this.getCommentList(this.paginator.hundredPage);
  },
  computed: {
    pageComments: function() {
      return this.comment_list.slice(
        10 * (this.paginator.tenthIndex - 1),
        10 * this.paginator.tenthIndex
      );
    }
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
    getCommentList: function(page) {
      // 发送请求，为了减少请求次数，每次从后台获取100条数据
      this.jsonAxios
        // 请求模拟数据
        .get("/api/v1/comment/list")
        // 请求真实数据
        // .get("/api/v1/comment/" + this.$route.params.goodsId + "?page=" + page)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.paginator.total = res.data.total;
            this.comment_list = res.data.rows;
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
.comments {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 14px;
}
</style>