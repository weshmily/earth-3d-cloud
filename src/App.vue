<template>
  <div id="app">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
var Cesium = require("cesium/Cesium");
require("cesium/Widgets/widgets.css");
export default {
  name: "app",
  data() {
    return {
      viewer: null
    };
  },
  methods: {
    init() {
      this.viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false,
        timeline: false,
        fullscreenButton: false,
        geocoder: false,
        baseLayerPicker: false
      });
      this.viewer.cesiumWidget.creditContainer.style.display = "none";
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss">
// @import 'cesium/Widgets/widgets.css';
</style>

