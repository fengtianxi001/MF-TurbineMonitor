<template>
  <ul class="base-brand">
    <li class="base-brand__en">{{ APP_NAME_EN }}</li>
    <li class="base-brand__cn">{{ APP_NAME_CN }}</li>
  </ul>
</template>
<script setup lang="ts">
import { APP_NAME_CN, APP_NAME_EN } from '@/configs/app'
import './styles.scss'
</script>
