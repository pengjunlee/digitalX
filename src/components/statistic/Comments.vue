<template>
  <div class="comments">
    <table>
      <tr v-for="(comment,index) in commentsPage" :key="index">
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
        :current-page="this.paginator.page"
        background
        layout="total, prev, pager, next"
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
      paginator: { page: 1, total: 0 }
    };
  },
  created() {
    // 发送登录请求，返回json格式响应数据
    this.jsonAxios
      .post("/api/statistic", { name: "comments" })
      .then(res => {
        var retData = res.data;
        if (retData.code === 0) {
          this.paginator.total = retData.data.comments.length;
          this.comment_list = retData.data.comments;
        } else {
          console.log(retData.msg);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    commentsPage: function() {
      return this.comment_list.slice(
        10 * this.paginator.page - 10,
        10 * this.paginator.page
      );
    }
  },
  methods: {
    pageChange: function(page) {
      this.paginator.page = page;
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