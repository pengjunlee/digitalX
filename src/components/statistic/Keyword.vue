<template>
  <div class="keywords" style="height:100%;">
    <div id="words-container" style="height:100%;"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword_list: []
    };
  },
  created() {
    // 发送登录请求，返回json格式响应数据
    this.jsonAxios
    // 请求模拟数据
      .get("/api/v1/comment/keyword")
      // 请求真实数据
      // .get("/api/v1/comment/keyword/"+this.$route.params.goodsId)
      .then(res => {
        if (res.code === 0) {
          this.keyword_list = res.data.keywords;
          var Highcharts = require("highcharts");

          // 在 Highcharts 加载之后加载功能模块
          require("highcharts/modules/exporting")(Highcharts);
          require("highcharts/modules/wordcloud")(Highcharts);
          require("highcharts/modules/oldie")(Highcharts);
          // 创建图表
          Highcharts.chart("words-container", {
            series: [
              {
                type: "wordcloud",
                data: res.data.keywords
              }
            ],
            title: {
              text: "词云图"
            }
          });
        } else {
          console.log(res.msg);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {}
};
</script>


<style scoped></style>