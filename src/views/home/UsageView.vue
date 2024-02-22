<script lang="ts" setup>
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {BarChart} from "echarts/charts";
import {GridComponent, LegendComponent, TitleComponent, TooltipComponent} from "echarts/components";
import VChart from "vue-echarts";
import {BarSeriesOption, EChartsOption} from "echarts";
import {onMounted, ref} from "vue";

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

const option = ref<EChartsOption>({
  title: {
    text: "Monthly Usage",
    left: "left",
    textStyle: {
      fontFamily: "Aileron",
      fontSize: 16,
      fontWeight: "bold",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    textStyle: {
      fontFamily: "Aileron",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: function (params: any) {
      const data = params[0];
      return `${data.name}: $${data.value.toFixed(2)}`;
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
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: true,
    },
    axisTick: {
      show: true,
    },
    axisLabel: {
      formatter: function (value: number) {
        return `$${value.toFixed(2)}`;
      },
    },
  },
  series: [{
    type: "bar",
    barCategoryGap: "5%", // 调整同一类目中柱间距离
    barGap: "20%", // 调整不同类目中柱间距离
    itemStyle: {
      color: "#22c55e",
      borderRadius: [2, 2, 0, 0],
    },
    data: [] as number[],
  }] as BarSeriesOption[],
});

onMounted(() => {
  if (!option.value.series) {
    return;
  }
  let xAxisData = [] as string[];
  for (let i = 1; i < 32; i++) {
    const num = parseFloat(`${Math.random() * 10}.${Math.random() * 10}${Math.random() * 10}`);
    ((option.value.series as BarSeriesOption[])[0]?.data as number[]).push(num);
    xAxisData.push(`2月${i}日`);
  }
  option.value.xAxis = {
    type: "category",
    data: xAxisData,
    axisLabel: {
      interval: function (index: number) {
        // 每 3 天显示一次
        return index % 3 === 0;
      },
    },
  };
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
