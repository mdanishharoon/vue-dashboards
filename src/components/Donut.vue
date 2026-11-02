<script setup>
import { computed, useId } from 'vue'
const props = defineProps({ values: { type: Array, default: () => [41, 26, 20, 13] }, total: String, caption: String, striped: Boolean })
const colors = ['#d4d4d4', '#898989', '#515151', '#292929', '#171717']
const id = useId().replace(/:/g, '')
const segments = computed(() => { let offset = 0; return props.values.map((value, i) => { const s = { value, offset, color: colors[i % colors.length] }; offset += value; return s }) })
const slices = computed(() => segments.value.map(s => {
 const start = (-180 + s.offset * 3.6 + .2) * Math.PI / 180
 const end = (-180 + (s.offset + s.value) * 3.6 - .2) * Math.PI / 180
 return `M 100 100 L ${100+94*Math.cos(start)} ${100+94*Math.sin(start)} A 94 94 0 ${s.value>50 ? 1 : 0} 1 ${100+94*Math.cos(end)} ${100+94*Math.sin(end)} Z`
}))
</script>
<template><div class="donut"><svg v-if="striped" viewBox="0 0 200 200" role="img" aria-label="Orders by traffic channel"><defs><pattern v-for="(s,i) in segments" :key="i" :id="`hatch-${id}-${i}`" width="4" height="4" patternUnits="userSpaceOnUse" :patternTransform="`rotate(${[-45,90,0,45,0][i]})`"><path d="M0 0V4" :stroke="['#ddd','#aaa','#777','#555','#333'][i]" stroke-width="1"/></pattern></defs><path v-for="(slice,i) in slices" :key="i" :d="slice" :fill="`url(#hatch-${id}-${i})`"/></svg><svg v-else viewBox="0 0 200 200" role="img" aria-label="Share by category"><circle v-for="(s, i) in segments" :key="i" cx="100" cy="100" r="77" fill="none" :stroke="s.color" stroke-width="27" :stroke-dasharray="`${Math.max(0, s.value * 4.838 - 6)} 484`" :stroke-dashoffset="-s.offset * 4.838" stroke-linecap="round" transform="rotate(-90 100 100)"/></svg><div v-if="total" class="donut-center"><strong>{{ total }}</strong><small>{{ caption }}</small></div></div></template>
