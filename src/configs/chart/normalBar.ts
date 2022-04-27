import * as echarts from "echarts";

type barConfigType = Array<{
  label: string;
  value: number;
}>;
export const defaultData = new Array(12).fill(0).map((item,index) => ({
  label: `#${index + 1}`,
  value: Math.round(Math.random()*100)
}))

export function createNormalBarConfig(config: barConfigType = defaultData): echarts.EChartsOption {
  const label = config.map(({ label }) => label);
  const data = config.map(({ value }) => value);
  return {
    grid: {
      left: 10,
      right: 14,
      bottom: 10,
      top: 30,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: label,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#fff",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        data,
        type: "bar",
        // barWidth: 20,
        itemStyle: {
          color: "#15c4e7",
        },
        label: {
          show: true,
          position: "outside",
          valueAnimation: true,
        },
      },
    ],
    animationDuration: 0,
    animationDurationUpdate: 1000,
    animationEasing: "linear",
    animationEasingUpdate: "linear",
  };
}

