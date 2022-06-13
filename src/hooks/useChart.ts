import * as echarts from "echarts";
import { onMounted, ref, Ref, onBeforeUnmount, watch } from "vue";

export function useChart(element: Ref<HTMLElement | undefined>) {
  const chart = ref<echarts.ECharts | undefined>();
  const option = ref<echarts.EChartsCoreOption | undefined>();
  const dispose = chart.value?.dispose();
  const refresh = (option: echarts.EChartsOption) => {
    chart.value?.setOption(option);
  };
  watch(option, () => {
    if (!option.value) return false;
    if (chart.value) {
      chart.value.setOption(option.value);
    } else {
      setTimeout(() => {
        chart.value?.setOption(option.value as echarts.EChartsOption);
      }, 1000 * 0.5);
    }
  });
  onMounted(() => {
    chart.value = echarts.init(element.value as HTMLElement);
    // if(option.value){}
  });
  onBeforeUnmount(() => {
    chart.value?.dispose();
  });

  return {
    chart,
    dispose,
    option,
    refresh,
  };
}
