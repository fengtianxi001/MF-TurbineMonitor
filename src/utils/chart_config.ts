/*
 * @Description: 图表的配置文件
 * @Autor: 肛肠科冯主任
 * @Date: 2022-01-05 23:04:14
 * @LastEditTime: 2022-01-08 00:08:07
 */
// import { onMounted, Ref } from 'vue'
/* eslint-disable */
import * as echarts from 'echarts'
type EChartsOption = echarts.EChartsOption

export const enery = (data: number[]) => {
	const option: EChartsOption = {
		grid: {
			left: 10,
			right: 14,
			bottom: 10,
			top: 30,
			containLabel: true,
		},
		xAxis: {
			type: 'category',
			data: ['1', '2', '3', '4', '5', '6', '7'],
			axisTick: {
				show: false,
			},
			axisLine: {
				show: false,
				lineStyle: {
					color: '#028ab5ad',
				},
			},
		},
		yAxis: {
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#028ab5ad',
				},
			},
			splitLine: {
				show: false,
			},
		},
		series: [
			{
				data,
				type: 'bar',
				itemStyle: {
					color: '#15c4e7',
				},
			},
		],
	}
	return option
}

export const en = (data: number[]) => {
	const option: EChartsOption = {
		color: ['#15c4e7'],
		grid: {
			left: 70,
			right: 10,
			bottom: 0,
			top: 0,
		},
		xAxis: {
			type: 'value',
			show: false,
			max: 200,
		},
		yAxis: {
			type: 'category',
			data: ['齿轮箱温度', '机舱温度', '环境温度'],
			axisTick: {
				show: false,
			},
			splitLine: {
				show: false,
			},
			axisLine: {
				show: false,
				lineStyle: {
					color: '#fff',
				},
			},
		},
		series: [
			{
				data,
				type: 'bar',
				showBackground: true,
				backgroundStyle: {
					color: '#123e59',
				},
				barCategoryGap: 11,
			},
		],
	}
	return option
}

export const line = (data: Array<Array<number>>) => {
	const option: EChartsOption = {
		tooltip: {
			trigger: 'axis',
		},
		color: ['#15c5e8', '#c8a818'],
		grid: {
			left: 10,
			right: 14,
			bottom: 10,
			top: 30,
			containLabel: true,
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['1', '2', '3', '4', '5', '6', '7'],
			axisLine: {
				show: false,
				lineStyle: {
					color: '#028ab5ad',
				},
			},
			axisTick: {
				show: false,
			},
		},
		yAxis: {
			type: 'value',
			axisLine: {
				show: false,
				lineStyle: {
					color: '#028ab5ad',
				},
			},

			splitLine: {
				lineStyle: {
					color: ['#028ab545'],
				},
			},
		},
		series: [
			{
				name: '功率',
				type: 'line',
				data: data[0],
				lineStyle: {
					color: '#15c5e8',
				},
			},
			{
				name: '风速',
				type: 'line',
				data: data[1],
				lineStyle: {
					color: '#c8a818',
				},
			},
		],
	}
	return option
}
