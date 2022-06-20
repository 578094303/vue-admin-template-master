<template>
  <div>
        <div id="container" style="width: 900px; height: 300px" />
  </div>
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  data() {
    return {
      map: null
    }
  },
  mounted() {
this.initMap() // 加载地图
},
  methods: {
    initMap() {
      window._AMapSecurityConfig = {
        securityJsCode: 'a864395f1be185bb413ee18f70cf4a63'
      }
      AMapLoader.load({
        key: '57e9c5389b89dd938eb40b5fa26ea9b9', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          'AMap.DistrictSearch',
          'AMap.Geolocation',
          'AMap.Autocomplete',
          'AMap.PlaceSearch',
          'AMap.Scale',
          'AMap.OverView',
          'AMap.ToolBar',
          'AMap.MapType',
          'AMap.PolyEditor',
          'AMap.CircleEditor'
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: '1.1', // AMapUI 缺省 1.1
          plugins: [] // 需要加载的 AMapUI ui插件
        },
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: '1.3.2' // Loca 版本，缺省 1.3.2
        }
      })
        .then((AMap) => {
          this.AMap = AMap
          new AMap.ToolBar()
          new AMap.Scale()
          var map = new AMap.Map('container', {
            resizeEnable: true,
            zoom: 14
          })
          this.map = map
          var that = this

          var marker
          function regeocoder(lnglatXY) {
            AMap.plugin('AMap.Geocoder', function() {
              var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: 'all'
              })
              geocoder.getAddress(lnglatXY, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  var address = result.regeocode.formattedAddress
                  console.log(address)
                  //that.form.address = address
                 // console.log(that.form.address)
                }
              })
              if (!marker) {
                marker = new AMap.Marker()
                map.add(marker)
              }
              marker.setPosition(lnglatXY)
            })
          }
          this.regeocoder = regeocoder
          map.on('click', function(e) {
            var lnglatXY = [e.lnglat.getLng(), e.lnglat.getLat()]
            console.log(lnglatXY)
            regeocoder(lnglatXY, that, true)
          })

          new AMap.Marker({
            position: new AMap.LngLat(116.39, 39.9), // （e.position）--->定位点的点坐标, position ---> marker的定位点坐标，也就是marker最终显示在那个点上，
            map: map // map ---> 要显示该marker的地图对象
          })
          map.setFitView()
        })
        .catch((e) => {
          console.log(e)
        })
    },
  }
}
</script>
<style  scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
</style>
