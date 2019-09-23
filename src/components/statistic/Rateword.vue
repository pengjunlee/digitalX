<template>
  <div class="ratewords" style="height:100%;">
    <div id="words-container" style="height:100%;"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rateword_list: []
    };
  },
  created() {
    // 发送登录请求，返回json格式响应数据
    this.jsonAxios
      // 请求模拟数据
      .get("/api/v1/comment/rateword")
      // 请求真实数据
      // .get("/api/v1/comment/rateword/" + this.$route.params.goodsId)
      .then(res => {
        if (res.code === 0) {
          this.rateword_list = res.data.ratewords;
          var Highcharts = require("highcharts");

          // 在 Highcharts 加载之后加载功能模块
          require("highcharts/modules/exporting")(Highcharts);
          require("highcharts/modules/wordcloud")(Highcharts);
          require("highcharts/modules/oldie")(Highcharts);
          require("highcharts/themes/sand-signika")(Highcharts);
          // require("highcharts/themes/skies")(Highcharts);
          // require("highcharts/themes/dark-blue")(Highcharts);
          // require("highcharts/themes/sunset")(Highcharts);
          // require("highcharts/themes/grid-light")(Highcharts);
          // require("highcharts/themes/grid")(Highcharts);
          // require("highcharts/themes/gray")(Highcharts);
          // require("highcharts/themes/dark-unica")(Highcharts);
          // require("highcharts/themes/dark-green")(Highcharts);
          // require("highcharts/themes/avocado")(Highcharts);
          
          // 创建图表
          Highcharts.chart("words-container", {
            series: [
              {
                type: "wordcloud",
                data: res.data.ratewords
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