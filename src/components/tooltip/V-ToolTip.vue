<template>
  <div class="v-tooltip">
    <div ref="tooltipster">
      <slot></slot>
    </div>
    <div class="hidden p-xs">
      <div ref="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import "tooltipster/dist/css/tooltipster.bundle.min.css";
// import "tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-borderless.min.css";
// import 'tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-light.min.css'
// import 'tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-noir.min.css';
// import 'tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-punk.min.css'
import 'tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-shadow.min.css'
import $ from "jquery";
import "tooltipster";
import _ from "lodash";

export default {
  name: "tooltip",
  props: {
    label: {
      default: ""
    },
    tooltipsterOptions: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data: function() {
    return {
      defaultOptions: {
        animationDuration: 500,
        animation: "fade",
        contentAsHtml: true,
        delay: 100,
        minWidth: 100,
        interactive: true,
        distance: 10,
        theme: "tooltipster-shadow", // tooltipster-shadow, tooltipster-light, tooltipster-borderless, tooltipster-punk, , tooltipster-noir
        multiple: true,
        respositionOnScroll: true,
        trigger: "custom",
        trackTooltip: false,
        triggerOpen: {
          mouseenter: true,
          touchstart: true
        },
        triggerClose: {
          mouseleave: true,
          originClick: false,
          touchleave: true
        }
      }
    };
  },
  methods: {
    beforeDestroy: function() {
      this.tooltipsterInstance.close();
    }
  },
  mounted: function() {
    let self = this;
    this.tooltipsterInstance = $(this.$refs.tooltipster.children[0])
      .tooltipster(
        _.merge(this.defaultOptions, this.tooltipsterOptions, {
          content: this.label ? this.label : this.$refs.content
        })
      )
      .tooltipster("instance");
    this.tooltipsterInstance.on("close", function(event) {
      console.log("close");
    });

    this.tooltipsterInstance.on("before", function(event) {
      console.log("before");
    });

    this.tooltipsterInstance.on("after", function(event) {
      console.log("after");
    });
  },
  watch: {
    label: function(newLabel) {
      // if label change need to wath in order to update content to tooltipster!
      if (newLabel) {
        $(this.$refs.tooltipster.children[0]).tooltipster({
          content: newLabel
        });
      } else {
        $(this.$refs.tooltipster.children[0]).tooltipster({
          content: _.get(this.$slots, "content[0].elm")
        });
      }
    }
  }
};
</script>
<style scoped>
.hidden {
  display: none;
}
.p-xs {
  padding: 5px;
}
</style>