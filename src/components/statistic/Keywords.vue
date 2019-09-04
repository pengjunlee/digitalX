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
      .post("/api/statistic", { name: "keywords" })
      .then(res => {
        var retData = res.data;
        if (retData.code === 0) {
          console.log(retData.data.keywords);
          this.keyword_list = retData.data.keywords;
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
                data: retData.data.keywords
              }
            ],
            title: {
              text: "词云图"
            }
          });
        } else {
          console.log(retData.msg);
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