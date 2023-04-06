<template>
    <div class="grow mt-0 mb-4">
      <div class="container mx-auto h-full" ref="rootE1">
        <div id="map" class="h-full grow border-black border-2"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Map from 'ol/Map';
  import View from 'ol/View';
  import Feature from 'ol/Feature';
  import { OSM, Vector as VectorSource } from 'ol/source.js';
  import GeoJSON from 'ol/format/GeoJSON.js';
  import { Circle as CircleStyle, Fill, Stroke, Style, Text, Icon } from 'ol/style.js';
  import { fromLonLat } from 'ol/proj';
  import { Point } from 'ol/geom';
  import {Select} from 'ol/interaction'
  import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
  import { Attribution, ScaleLine, defaults as defaultControl } from 'ol/control';
  import { gsiOptVtLayer, gsiOptVtLayerExclude } from '@cieloazul310/ol-gsi-vt';
  import '../../styles/ol.css';
  import '../../styles/ol-ext.css';
  import '../../styles/switcher.css';
  import optVtLayer from '~/composables/gsi-opt-vt';
  //import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
  
  const { $LayerPopup } = useNuxtApp();
  const { $Popup } = useNuxtApp();
  const rootE1 = ref();
  
  
  
  
  const layer = gsiOptVtLayer({
    title: '1F',
    layers: gsiOptVtLayerExclude(['Anno']),
    visible: true,
    baseLayer: true
  });
  const layer2 = gsiOptVtLayer({
    title: '2F',
    layers: ['RdCL'],
    visible: false,
    baseLayer: true
  });
  const layer3 = gsiOptVtLayer({
    title: '3F',
    layers: gsiOptVtLayerExclude(['Anno']),
    visible: false,
    baseLayer: true
  });
  const layer4 = gsiOptVtLayer({
    title: '4F',
    layers: gsiOptVtLayerExclude(['Anno']),
    visible: false,
    baseLayer: true
  });
  
  // Polygons
  function polygonStyleFunction(feature) {
    return new Style({
      image: new CircleStyle({
        radius: 20,
        fill: new Fill({color: 'rgba(255, 0, 0, 0)'}),
        stroke: new Stroke({color: 'rgba(255, 0, 0, 0)', width: 1}),
      }),
      text: createTextStyle(feature),
    });
  }
  
  const createTextStyle = function(feature){
    return new Text(
      {text: feature.get('name'),scale:1.5}
    )
  }
  
  const l3 = new VectorLayer({
    source: new VectorSource({
      url: '/point.geojson',
      format: new GeoJSON(),
    }),
    style: polygonStyleFunction,
    displayInLayerSwitcher:false,
  });
  
  useSafeOnMounted(rootE1, () => {
  
    const map = new Map({
      target: 'map',
      view: new View({
        center: fromLonLat([139.530348, 35.687153]),
        zoom: 18,
        rotation: 0,
      }),
      moveTolerance:3.0,
      layers: [layer4,layer3,layer2, layer],
      controls: defaultControl({
        attribution: false,
      }).extend([
        new Attribution({
          collapsible: false,
        }),
      ]),
    });
  
    map.addLayer(l3);
   
    var select = new Select({});
    map.addInteraction(select);
  
    select.getFeatures().on(['add'], function(e) {
      console.log(e.element.values_.name);
    })
  
    var layerPopup = new $LayerPopup({
      collapsed: false
    });
    map.addControl(layerPopup);
  
  });
  
  </script>
  
  <style lang="css" scoped></style>