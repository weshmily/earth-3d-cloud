<template>
  <div
    id="cesiumContainer"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-button class="input" @click="loudings">加载点云</el-button>
  </div>
</template>
<script>
export default {
  name: "cesium",
  data() {
    return {
      loading: false
    };
  },
  methods: {
    init() {
      /* global Cesium */
      // let cesiumTerrainProvider = new Cesium.CesiumTerrainProvider({
      //   url:"/gdemv2data",
      //   requestWaterMask: false,
      //   requestVertexNormals: false,
      //   proxyUrl: ""
      // });
      let viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false,
        timeline: false,
        fullscreenButton: false,
        geocoder: false,
        baseLayerPicker: false
      });
      viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          url:"http://t0.tianditu.gov.cn/img_w/wmts?tk=a89df02c93e5474e9ebeb81a32fcb487",
          layer: "img",
          style: "default",
          tileMatrixSetID: "w",
          format: "tiles",
          maximumLevel: 18
        })
      );
      viewer.imageryLayers.addImageryProvider(
        new Cesium.WebMapTileServiceImageryProvider({
          url:"http://t0.tianditu.gov.cn/cia_w/wmts?tk=a89df02c93e5474e9ebeb81a32fcb487",
          layer: "cia",
          style: "default",
          tileMatrixSetID: "w",
          format: "tiles",
          maximumLevel: 18
        })
      );

      viewer.cesiumWidget.creditContainer.style.display = "none";
      // viewer.terrainProvider = cesiumTerrainProvider;
      viewer.extend(Cesium.viewerCesiumNavigationMixin, {});


      window.viewer = viewer;
    },
    loudings() {
      this.loading = true;
      let tileset = new Cesium.Cesium3DTileset({
        url: "/pointcloud/data/tileset.json", //数据路径
        maximumScreenSpaceError: 512, //最大的屏幕空间误差
        maximumNumberOfLoadedTiles: 1000 //最大加载瓦片个数
      });
      window.viewer.scene.primitives.add(tileset);
      tileset.readyPromise.then(() => {
        this.loading = false;
        window.viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(120.06776, 32.20205, 1000)
        });
      });
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
.input {
  z-index: 9999999;
  position: fixed;
  top: 20px;
  left: 50px;
}
</style>
