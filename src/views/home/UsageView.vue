<script lang="ts" setup>
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {BarChart} from "echarts/charts";
import {GridComponent, LegendComponent, TitleComponent, TooltipComponent} from "echarts/components";
import VChart from "vue-echarts";
import {onMounted, ref} from "vue";

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

const option = ref({
  title: {
    text: "Monthly Usage",
    left: "left",
    textStyle: {
      fontSize: 16,
      fontWeight: "bold",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: 10,
    right: 10,
    top: 50,
    bottom: 10,
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [],
      type: "bar",
      itemStyle: {
        color: "#22c55e",
        borderRadius: [4, 4, 0, 0],
      },
    },
  ],
});

onMounted(() => {
  for (let i = 1; i < 32; i++) {
    option.value.series[0].data.push(Math.floor(Math.random() * 1000));
    option.value.xAxis.data.push(`${i}`);
  }
});
</script>

<template>
  <div class="w-full h-full">
    <div class="px-6 py-2 text-2xl font-bold border-b">Usage</div>
    <div class="flex flex-row gap-2 mt-2">
      <v-chart :option="option" class="flex-2 h-96 p-2"/>
      <div class="flex-1 border rounded-md"/>
    </div>
  </div>
</template>
