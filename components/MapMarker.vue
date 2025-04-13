<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
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
      // Thai restaurant marker icon
      markerIcon.value = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="marker-pin">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" class="pin-bg" />
                  <g transform="translate(8.5,5)" class="thai-icon">
                    <path d="M3.5,0 C2.4,0 1.5,0.9 1.5,2 C1.5,3.1 2.4,4 3.5,4 C4.6,4 5.5,3.1 5.5,2 C5.5,0.9 4.6,0 3.5,0 Z M3.5,1 C4.05,1 4.5,1.45 4.5,2 C4.5,2.55 4.05,3 3.5,3 C2.95,3 2.5,2.55 2.5,2 C2.5,1.45 2.95,1 3.5,1 Z" />
                    <path d="M0,6 L7,6 L7,7 L0,7 Z" />
                    <path d="M0,4 L7,4 L7,5 L0,5 Z" />
                  </g>
                </svg>
              </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -35]
      });
    });
  }
});
</script>

<template>
  <LMarker :lat-lng="position" :icon="markerIcon">
    <slot></slot>
  </LMarker>
</template>

<style scoped>
.custom-div-icon {
  background: transparent;
  border: none;
}

.marker-pin {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.marker-pin .icon {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
}

.marker-pin .pin-bg {
  fill: #e53e3e; /* Primary color */
}

.marker-pin .thai-icon {
  fill: white;
}
</style> 