<script setup lang="ts">
  import { onMounted, ref } from "vue";

  defineProps({
    position: {
      type: Array as unknown as () => [number, number],
      required: true
    }
  });

  const markerIcon = ref<any>(null);

  onMounted(() => {
    if (import.meta.client) {
      import("leaflet").then((L) => {
        markerIcon.value = L.divIcon({
          html: `<div class="pin-container">
                <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg" class="pin-svg">
                  <!-- Pin shape with drop shadow -->
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3" />
                  </filter>
                  
                  <!-- Base pin shape with a single color -->
                  <path d="M50,10 
                           C30,10 10,25 10,55 
                           C10,85 50,140 50,140 
                           C50,140 90,85 90,55 
                           C90,25 70,10 50,10 Z" 
                        fill="#115e59"
                        filter="url(#shadow)" />
                </svg>
              </div>`,
          iconSize: [40, 60],
          iconAnchor: [20, 60],
          popupAnchor: [0, -45],
          className: "custom-pin-icon"
        });
      });
    }
  });
</script>

<template>
  <LMarker :lat-lng="position" :icon="markerIcon">
    <slot />
  </LMarker>
</template>

<style scoped>
  .pin-container {
    width: 40px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .pin-svg {
    width: 100%;
    height: 100%;
  }
</style>
