<script setup>
import { ref, computed } from 'vue'
import Icon from '../components/Icon.vue'
import Trend from '../components/Trend.vue'
import Chart from '../components/Chart.vue'
import Toolbar from '../components/Toolbar.vue'
import { hourly } from '../data'
const emit = defineEmits(['action','customize'])
const range = ref('Last 7 days')
const factor = computed(() => range.value === 'Last 30 days' ? 4.2 : range.value === 'Last 90 days' ? 12.3 : 1)
const stats = computed(() => [
 ['Total Orders',Math.round(1240*factor.value).toLocaleString(),`Orders completed in the ${range.value.toLowerCase()}`,'12.5%','cart'],
 ['Gross Revenue',new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(98388*factor.value),`Gross revenue for ${range.value.toLowerCase()}`,'9.9%','analytics'],
 ['Net Revenue',new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(93453.19*factor.value),`Net revenue for ${range.value.toLowerCase()}`,'9.9%','analytics'],
 ['Active customers',Math.round(856*factor.value).toLocaleString(),`Unique customers in the ${range.value.toLowerCase()}`,'8.1%','users'],
 ['Returning revenue','61.8%','Share of gross from returning buyers','2.1%','retention'],
 ['Checkout conversion','3.33%','Sessions that completed an order (avg.)','0.6%','funnel']
])
function details(title) { emit('action',{title,body:'View performance for the current reporting period. Change the time range to compare your store metrics.'}) }
</script>
<template><div class="dashboard dashboard-eight">
  <div class="grid four campaign-stats"><section v-for="(stat,i) in [['Active Campaigns','24','12.4%','campaign'],['Posts Published','147','7.8%','calendar'],['Total Reach','412.8K','4.3%','globe'],['Avg. engagement','4.18%','0.6%','analytics']]" :key="stat[0]" class="stacked-card"><div class="stacked-header"><span><Icon :name="stat[3]" :size="13"/>{{stat[0]}}</span><button class="text-button" :aria-label="stat[0] + ' details'" @click="details(stat[0])"><Icon name="more" :size="14"/></button></div><div class="stacked-body"><h2>{{stat[1]}}</h2><Trend :value="stat[2]" :negative="i === 3" plain suffix="since last month"/></div></section></div>
  <div class="page-title"><h1>Today</h1><div class="flex"><button @click="$emit('customize')"><Icon name="customize"/>Customize</button><button class="icon-button" aria-label="Today options" @click="details('Today')"><Icon name="more"/></button></div></div>
  <div class="today-layout"><section class="stacked-card today-revenue"><div class="stacked-header"><span><Icon name="analytics" :size="13"/>Gross Revenue</span><button class="text-button" aria-label="Expand gross revenue" @click="details('Gross Revenue')"><Icon name="expand" :size="13"/></button></div><div class="stacked-body"><div class="section-summary"><div class="today-values"><div><p><i class="status-dot gray"></i>Today</p><h2>$243.65</h2></div><div><p><i class="status-dot light"></i>Yesterday</p><h2>$208.19</h2></div></div><Trend value="17.0%" plain/></div><Chart :values="hourly" :secondary="hourly.map((v,i) => v*.4 + (i%3)*2)" type="columns" :height="358" :grid="false" :labels="['19:00','21:00','23:00','01:00','03:00','05:00','07:00','09:00','11:00','13:00','15:00','17:00']"/></div></section>
    <div class="today-side"><section class="stacked-card today-budget"><div class="stacked-header"><span><Icon name="clock" :size="13"/>Today’s budget</span><button class="text-button" aria-label="Budget details" @click="details('Today’s budget')"><Icon name="expand" :size="13"/></button></div><div class="stacked-body"><div class="grid two"><div><p>Used today</p><h2>$223.65</h2></div><div><p>Today’s allowance</p><h2>$480.00</h2></div></div><div class="daily-budget"><span>47%<small> used</small></span><div role="progressbar" aria-label="Daily budget used" aria-valuenow="47" aria-valuemin="0" aria-valuemax="100"></div></div></div></section>
    <section class="stacked-card peak-hours"><div class="stacked-header"><span><Icon name="clock" :size="13"/>Peak hours</span><button class="text-button" aria-label="Peak hour details" @click="details('Peak hours')"><Icon name="expand" :size="13"/></button></div><div class="stacked-body"><h3>11 AM – 1 PM</h3><p>~8% of orders in the busiest hour</p><Chart :values="[5,4,3,2,3,4,10,20,35,48,56,64,70,66,61,59,53,49,55,60,54,44,31,18]" type="columns" :height="106" :grid="false"/></div></section></div>
  </div>
  <div class="page-title"><h1>Stats</h1><Toolbar v-model="range" :date="range === 'Last 7 days' ? 'Oct 19 – Oct 25, 2026' : range === 'Last 90 days' ? 'Jul 28 – Oct 25, 2026' : 'Sep 26 – Oct 25, 2026'" @customize="$emit('customize')" @more="details('Reporting period')"/></div>
  <div class="store-stats"><section v-for="(stat,i) in stats" :key="stat[0]" class="stacked-card" :class="['store-stat-' + i]"><div class="stacked-header"><span><Icon :name="stat[4]" :size="13"/>{{stat[0]}}</span><button class="text-button" :aria-label="stat[0] + ' details'" @click="details(stat[0])"><Icon name="expand" :size="13"/></button></div><div class="stacked-body"><div class="section-summary"><div><h2>{{stat[1]}}</h2><p>{{stat[2]}}</p></div><Trend :value="stat[3]" plain/></div><Chart :values="i < 3 ? [45,58,43,68,52,71,59] : [21,28,18,35,23,39,30]" :height="i === 0 ? 188 : i < 3 ? 160 : 83" :grid="i < 3"/></div></section></div>
</div></template>
