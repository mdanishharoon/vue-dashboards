<script setup>
defineProps({ items: Array, segmented: Boolean })
</script>
<template><div class="bar-list" :class="{ segmented }"><div v-for="item in items" :key="item[0]" class="bar-list-row"><div class="bar-background" :style="{ width: (segmented ? item[2] / Math.max(...items.map(i => i[2])) * 100 : item[2]) + '%' }"></div><span>{{ item[0] }}</span><strong>{{ item[1] }}</strong></div></div></template>
