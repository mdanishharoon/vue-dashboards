<script setup>
import { ref } from 'vue'
import Chart from '../components/Chart.vue'
import Trend from '../components/Trend.vue'
import BarList from '../components/BarList.vue'
import Icon from '../components/Icon.vue'
import { monthly, traffic } from '../data'
defineEmits(['action'])
const expanded = ref({})
const pages = [['/', '18,420', '+4.1%'], ['/pricing', '6,280', '+12.4%'], ['/blog/product-updates', '4,110', '-2%'], ['/docs/getting-started', '3,920', '+6.8%'], ['/changelog', '2,150', '+0.4%'], ['/about', '1,780', '+3.2%'], ['/contact', '910', '+1.8%']]
const countries = [['🇺🇸', 'United States', '6,120', '+5.2%'], ['🇩🇪', 'Germany', '2,840', '+8.1%'], ['🇬🇧', 'United Kingdom', '1,960', '-1.4%'], ['🇫🇷', 'France', '1,420', '+3.6%'], ['🇨🇦', 'Canada', '1,180', '+0.9%'], ['🇳🇱', 'Netherlands', '890', '+12.2%']]
</script>
<template><div class="dashboard dashboard-five">
  <div class="analytics-hero">
    <section class="panel visitor-chart"><div class="panel-heading"><div><h2 class="mono">10,662</h2><p>Total visitors in the last 12 months.</p></div><Trend value="7.2%" suffix="vs prior 12 months"/></div><Chart :values="monthly" :labels="['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']" :height="245" :max="100" dots/></section>
    <section class="panel online-card"><div class="panel-heading"><div><h2 class="mono">94</h2><p><i class="status-dot glow"></i><button class="text-button" @click="$emit('action', {title: 'Visitors online', body: '94 visitors are active right now: 61 on mobile, 31 on desktop, and 2 on tablet.'})">visitors online</button></p></div><Trend value="14.8%"/></div><BarList :items="[['Mobile','65%',65],['Desktop','33%',33],['Tablet','2%',2]]"/></section>
  </div>
  <div class="grid two">
    <section class="panel table-panel"><div class="panel-heading"><div><h3>Top pages</h3><p>First page in session, ranked by visits.</p></div></div><div :class="{ 'fade-table': !expanded.pages }"><table><thead><tr><th>Path</th><th>Visits</th><th>Change</th></tr></thead><tbody><tr v-for="row in pages.slice(0, expanded.pages ? 7 : 5)" :key="row[0]"><td><code>{{ row[0] }}</code></td><td>{{ row[1] }}</td><td>{{ row[2] }}</td></tr></tbody></table></div><button class="view-all" @click="expanded.pages = !expanded.pages">{{ expanded.pages ? 'Show less' : 'View All' }}<Icon :name="expanded.pages ? 'up' : 'arrow'"/></button></section>
    <section class="panel table-panel"><div class="panel-heading"><div><h3>Top countries</h3><p>Top countries in the last 12 months.</p></div></div><div :class="{ 'fade-table': !expanded.countries }"><table><thead><tr><th>Country</th><th>Visits</th><th>Change</th></tr></thead><tbody><tr v-for="row in countries" :key="row[1]"><td><span class="flag">{{ row[0] }}</span>{{ row[1] }}</td><td>{{ row[2] }}</td><td>{{ row[3] }}</td></tr></tbody></table></div><button class="view-all" @click="expanded.countries = !expanded.countries">{{ expanded.countries ? 'Show less' : 'View All' }}<Icon name="arrow"/></button></section>
  </div>
  <div class="grid four analytics-breakdown">
    <section class="panel"><div class="panel-heading"><div><h3>Sessions by source</h3><p>Attributed sessions in the last<br>12 months.</p></div></div><BarList :items="traffic"/></section>
    <section class="panel"><div class="panel-heading"><div><h3>Audience mix</h3><p>Session split by familiarity in the last 12 months.</p></div></div><BarList :items="[['Returning visitors','54%',54],['New visitors','41%',41],['Logged-in users','5%',5]]"/></section>
    <section class="panel"><div class="panel-heading"><div><h3>Browsers</h3><p>Share of sessions by primary browser family.</p></div></div><BarList :items="[['Chrome','58%',58],['Safari','22%',22],['Edge','9%',9],['Firefox','7%',7],['Other','4%',4]]"/></section>
    <section class="panel table-panel referrers"><div class="panel-heading"><div><h3>Top referrers</h3><p>External sites sending the most attributed sessions.</p></div></div><div :class="{'fade-table': !expanded.referrers}"><table><thead><tr><th>Host</th><th>Sessions</th></tr></thead><tbody><tr v-for="row in [['news.ycombinator.com','1,420'],['t.co','980'],['github.com','760'],['producthunt.com','540'],['reddit.com','410']]" :key="row[0]"><td>{{ row[0] }}</td><td>{{ row[1] }}</td></tr></tbody></table></div><button class="view-all" @click="expanded.referrers = !expanded.referrers">{{ expanded.referrers ? 'Show less' : 'View All' }}<Icon name="arrow"/></button></section>
  </div>
  <section class="panel vitals"><div class="panel-heading"><div><h3>Core Web Vitals</h3><p>Field experience on real sessions, measured at the origin.</p></div></div><div class="grid three"><div v-for="vital in [['LCP','Largest Contentful Paint','1.9s','120.0ms','faster'],['INP','Interaction to Next Paint','142ms','18.0ms','faster'],['CLS','Cumulative Layout Shift','0.04','0.1','lower']]" :key="vital[0]"><h4>{{ vital[0] }}</h4><p>{{ vital[1] }}</p><h2>{{ vital[2] }}</h2><small><span class="positive">⌃ {{ vital[3] }}</span> {{ vital[4] }} vs prior month</small></div></div></section>
</div></template>
