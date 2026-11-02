<script setup>
import Icon from './Icon.vue'
defineProps({ value: String, negative: Boolean, plain: Boolean, suffix: String })
</script>
<template><span class="trend-wrap"><span class="trend" :class="{ negative, plain }"><Icon :name="negative ? 'negative' : 'positive'" :size="12" />{{ value }}</span><span v-if="suffix" class="muted trend-suffix">{{ suffix }}</span></span></template>
