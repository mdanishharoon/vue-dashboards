<script setup>
import { computed, ref, useId } from 'vue'
const props = defineProps({ values: { type: Array, default: () => [35, 57, 46, 51, 60, 66, 44, 69, 55, 66, 88, 34] }, secondary: Array, labels: { type: Array, default: () => [] }, yLabels: { type: Array, default: () => [] }, type: { type: String, default: 'area' }, height: { type: Number, default: 240 }, dots: Boolean, grid: { type: Boolean, default: true }, smooth: Boolean, max: Number, unit: { type: String, default: '' } })
const id = useId().replace(/:/g, '')
const active = ref(-1)
const W = 800, H = 250
const left = computed(() => props.yLabels.length ? 43 : 12)
const right = 12, top = 14
const bottom = computed(() => props.labels.length ? 27 : 5)
const maxVal = computed(() => props.max || Math.max(...props.values, ...(props.secondary || [])) * 1.12)
const plotH = computed(() => H - top - bottom.value)
const plotW = computed(() => W - left.value - right)
const points = computed(() => props.values.map((v, i) => [left.value + i / Math.max(props.values.length - 1, 1) * plotW.value, top + plotH.value * (1 - v / maxVal.value)]))
const path = computed(() => points.value.map((p, i, a) => {
  if (!i) return `M ${p[0]} ${p[1]}`
  if (!props.smooth) return `L ${p[0]} ${p[1]}`
  const prev = a[i - 1], mid = (prev[0] + p[0]) / 2
  return `C ${mid} ${prev[1]} ${mid} ${p[1]} ${p[0]} ${p[1]}`
}).join(' '))
const area = computed(() => `${path.value} L ${points.value.at(-1)?.[0]} ${H - bottom.value} L ${left.value} ${H - bottom.value} Z`)
const barW = computed(() => plotW.value / props.values.length)
const segmented = computed(() => props.type === 'segmented' || props.type === 'campaign')
const gridCount = computed(() => props.yLabels.length || 5)
function barHeight(v) { return Math.max(1, v / maxVal.value * plotH.value) }
</script>
<template>
  <div class="chart" :class="[type, { 'has-axis': yLabels.length }]" :style="{ height: height + 'px' }">
    <svg :viewBox="`0 0 ${W} ${H}`" preserveAspectRatio="none" role="img" :aria-label="`${type} chart with ${values.length} data points`" @mouseleave="active = -1">
      <defs>
        <linearGradient :id="`fill-${id}`" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="currentColor" stop-opacity=".20"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></linearGradient>
        <linearGradient :id="`bar-${id}`" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#444"/><stop offset="100%" stop-color="#151515"/></linearGradient>
        <pattern :id="`segments-${id}`" width="20" height="7.5" patternUnits="userSpaceOnUse"><rect width="20" height="5.5" rx="1" fill="#a3a3a3"/></pattern>
        <pattern :id="`segments-light-${id}`" width="20" height="7.5" patternUnits="userSpaceOnUse"><rect width="20" height="5.5" rx="1" fill="#dedede"/></pattern>
      </defs>
      <g v-if="grid" class="chart-grid"><line v-for="i in gridCount" :key="i" :x1="left" :x2="W - right" :y1="top + (i - 1) * plotH / (gridCount - 1)" :y2="top + (i - 1) * plotH / (gridCount - 1)" :stroke-dasharray="dots ? undefined : '3 4'"/></g>
      <template v-if="type === 'area' || type === 'spark' || type === 'line'">
        <path v-if="type !== 'line'" :d="area" :fill="`url(#fill-${id})`"/>
        <path :d="path" fill="none" stroke="currentColor" :stroke-width="type === 'line' ? .7 : type === 'spark' ? 1 : 1.8" vector-effect="non-scaling-stroke"/>
        <circle v-for="(p, i) in (dots ? points : [])" :key="i" :cx="p[0]" :cy="p[1]" r="3" fill="#737373" stroke="#999"/>
      </template>
      <template v-else>
        <g v-for="(v, i) in values" :key="i">
          <rect :x="left + i * barW + (type === 'campaign' && i !== 7 ? barW / 2 : 2)" :y="H - bottom - barHeight(v)" :width="type === 'campaign' && i !== 7 ? 5 : Math.max(2, barW - (segmented ? 4 : 3))" :height="barHeight(v)" :rx="type === 'bars' ? 4 : 1" :fill="segmented ? `url(#segments-${id})` : `url(#bar-${id})`" :opacity="type === 'campaign' && i !== 7 ? .4 : 1" :stroke="type === 'bars' ? '#555' : 'none'" stroke-width=".5"/>
          <rect v-if="secondary" :x="left + i * barW + 2" :y="H - bottom - barHeight(secondary[i])" :width="Math.max(2, barW - (segmented ? 4 : 3))" :height="barHeight(secondary[i])" :fill="segmented ? `url(#segments-light-${id})` : '#737373'" :opacity="segmented ? '.9' : '.6'"/>
        </g>
      </template>
      <g v-for="(p, i) in points" :key="`hit-${i}`" @mouseenter="active = i"><rect :x="p[0] - plotW / values.length / 2" :y="top" :width="plotW / values.length" :height="plotH" fill="transparent"/></g>
      <g v-if="active >= 0"><line :x1="points[active][0]" :x2="points[active][0]" :y1="top" :y2="H - bottom" stroke="#666" stroke-dasharray="3 3"/><circle :cx="points[active][0]" :cy="points[active][1]" r="4" fill="#ddd"/></g>
    </svg>
    <div v-if="labels.length" class="chart-xlabels" :style="{left: (left / W * 100) + '%'}"><span v-for="(label,i) in labels" :key="i">{{label}}</span></div>
    <div v-if="yLabels.length" class="chart-ylabels" :style="{top: (top/H*100)+'%',bottom:(bottom/H*100)+'%'}"><span v-for="(label,i) in yLabels" :key="i">{{label}}</span></div>
    <div v-if="active >= 0" class="chart-tooltip" :style="{ left: Math.min(85, Math.max(8, active / (values.length - 1) * 100)) + '%' }">{{ labels.length === values.length ? labels[active] + ' · ' : '' }}{{ values[active].toLocaleString() }}{{ unit }}</div>
  </div>
</template>
