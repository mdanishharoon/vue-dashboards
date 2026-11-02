<script setup>
import Icon from './Icon.vue'
defineProps({ modelValue: { type: String, default: 'Last 30 days' }, date: { type: String, default: 'Sep 26 – Oct 25, 2026' }, noDate: Boolean })
defineEmits(['update:modelValue', 'customize', 'more'])
</script>
<template><div class="toolbar"><div class="date-group"><select aria-label="Stats time range" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)"><option>Last 7 days</option><option>Last 30 days</option><option>Last 90 days</option><option>Last 4 hours</option><option>Last 24 hours</option></select><button v-if="!noDate" @click="$emit('more', 'date')"><Icon name="calendar" />{{ date }}</button></div><button @click="$emit('customize')"><Icon name="customize"/>Customize</button><button class="icon-button" aria-label="More options" @click="$emit('more', 'options')"><Icon name="more"/></button></div></template>
