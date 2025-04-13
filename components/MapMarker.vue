<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  position: {
    type: Array,
    required: true
  }
});

const markerIcon = ref(null);

onMounted(() => {
  // Import Leaflet dynamically on the client side only
  if (import.meta.client) {
    import('leaflet').then(L => {
      // Thai flag marker icon in pin shape
      markerIcon.value = L.divIcon({
        className: 'thai-flag-marker',
        html: `<div class="pin-container">
                <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg" class="pin-svg">
                  <!-- Pin shape with drop shadow -->
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3" />
                  </filter>
                  
                  <!-- Base pin shape -->
                  <path d="M50,10 
                           C30,10 10,25 10,55 
                           C10,85 50,140 50,140 
                           C50,140 90,85 90,55 
                           C90,25 70,10 50,10 Z" 
                    filter="url(#shadow)" />
                  
                  <!-- Clip path for the flag stripes -->
                  <clipPath id="pin-clip">
                    <path d="M50,10 
                             C30,10 10,25 10,55 
                             C10,85 50,140 50,140 
                             C50,140 90,85 90,55 
                             C90,25 70,10 50,10 Z" />
                  </clipPath>
                  
                  <!-- Thai flag stripes on pin -->
                  <g clip-path="url(#pin-clip)">
                    <!-- Red background -->
                    <rect x="0" y="0" width="100" height="150" fill="#ED1C24" />
                    
                    <!-- White stripes -->
                    <rect x="0" y="30" width="100" height="90" fill="#FFFFFF" />
                    
                    <!-- Blue center stripe -->
                    <rect x="0" y="50" width="100" height="50" fill="#241D4F" />
                  </g>
                </svg>
              </div>`,
        iconSize: [40, 60],
        iconAnchor: [20, 60],
        popupAnchor: [0, -45],
        className: 'thai-pin-icon'
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
.thai-flag-marker {
  background: transparent;
  border: none;
}

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