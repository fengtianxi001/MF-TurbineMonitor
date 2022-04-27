import * as echarts from "echarts";
import { onMounted, ref, Ref, onBeforeUnmount } from "vue";

export function useChart(
  dom: Ref<HTMLElement | null>,
  option: echarts.EChartsOption
) {
  const chart = ref<echarts.ECharts | null>(null);
  const dispose = chart.value?.dispose();
  const refresh = (option: echarts.EChartsOption) => {
    chart.value?.setOption(option);
  };
  let onResize: {
    (): void;
    (this: Window, ev: UIEvent): any;
    (this: Window, ev: UIEvent): any;
  };
  onMounted(() => {
    chart.value = echarts.init(dom.value as HTMLElement);
    chart.value.setOption(option);
    // onResize = () => {
    //   chart.value?.resize();
    // };
    // window.addEventListener("resize", onResize)
  });
  onBeforeUnmount(() => {
    // window.removeEventListener("resize", onResize)
    chart.value?.dispose();
  });

  return {
    chart,
    dispose,
    refresh,
  };
}
