<template>
  <div id="cesiumContainer"></div>
</template>
<script>
export default {
  name: "cesium",
  data() {
    return {
      viewer: null
    };
  },
  methods: {
    init() {
      /* global Cesium */
      let cesiumTerrainProvider = new Cesium.CesiumTerrainProvider({
        url:"/gdemv2data",
        requestWaterMask: false,
        requestVertexNormals: false,
        proxyUrl: ""
      });
      this.viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false,
        timeline: false,
        fullscreenButton: false,
        geocoder: false,
        baseLayerPicker: false
      });
      this.viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          url:"http://t0.tianditu.gov.cn/img_w/wmts?tk=a89df02c93e5474e9ebeb81a32fcb487",
          layer: "img",
          style: "default",
          tileMatrixSetID: "w",
          format: "tiles",
          maximumLevel: 18
        })
      );
      this.viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          url:"http://t0.tianditu.gov.cn/cia_w/wmts?tk=a89df02c93e5474e9ebeb81a32fcb487",
          layer: "cia",
          style: "default",
          tileMatrixSetID: "w",
          format: "tiles",
          maximumLevel: 18
        })
      );

      this.viewer.cesiumWidget.creditContainer.style.display = "none";
      this.viewer.terrainProvider = cesiumTerrainProvider;
      this.viewer.extend(Cesium.viewerCesiumNavigationMixin, {})
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
#cesiumContainer {
  height: 100%;
}
</style>
