<template>
  <div>
    <div class="searchcontainer">
      <ChartTest :title="title1" defaultNum="12"></ChartTest>
      <ChartTest title="流量" defaultNum="123"></ChartTest>
      <ChartTest title="流速" defaultNum="234"></ChartTest>
      <ChartTest title="测流后水位" defaultNum="345"></ChartTest>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import ChartTest from "@/components/chart.vue";
export default {
  name: "N1C6",
  components: { ChartTest },
  data() {
    return {
      title1: "水位"
    };
  }
};
</script>

<style scoped>
.searchcontainer {
  /* float: left; */
  width: 80%;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  /* border-right: 1px solid #324098; */
}
</style>
