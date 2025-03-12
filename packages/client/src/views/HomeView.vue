<script setup lang="ts">
import { useAsyncState } from '@vueuse/core';
import axios from 'axios';

const { state } = useAsyncState(async () => {
  const res = await axios.get('/api/hello');
  return res.data;
}, undefined);
</script>

<template>
  <h1 class="my-4 text-8 font-bold">{{ state }}</h1>
</template>
