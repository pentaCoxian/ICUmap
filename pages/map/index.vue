<template>
  <div class="grow mt-0 sm:mb-4">
    <div class="container mx-auto h-full" ref="rootE1">
      <div id="map" class="h-full grow border-black border-2"></div>
    </div>
    <div class="container relative h-32 w-32">
      <div class="flex fixed left-1/2 bottom-10 bg-white border-2 p-2 justify-center m-2 z-50 ">
      <label for="track">
        GPS(β)
        <input id="track" type="checkbox"/>
      </label>
    </div>
    </div>

  </div>
</template>

<script setup>

import Map from 'ol/Map';
import View from 'ol/View';
import { Vector as VectorSource, } from 'ol/source.js';
import Feature from 'ol/Feature.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Geolocation from 'ol/Geolocation.js';
import Point from 'ol/geom/Point.js';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style.js';
import { fromLonLat, Projection } from 'ol/proj';
import { Select } from 'ol/interaction'
import { Vector as VectorLayer, } from 'ol/layer.js';
import { Attribution, defaults as defaultControl } from 'ol/control';
import { gsiOptVtLayer, gsiOptVtLayerExclude } from '@cieloazul310/ol-gsi-vt';
import '../../styles/ol.css';
import '../../styles/ol-ext.css';
import '../../styles/switcher.css';


//import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
const rootE1 = ref();

useHead({
  title: 'ICU MAP 構内図',
  meta: [
    { name: 'description', content: '国際基督教大学の構内図。各館の詳細もみれます。' }
  ]
})
useSeoMeta({
  title: 'ICU MAP - ICU構内図 マップ',
  ogTitle: 'ICU キャンパスマップ',
  description: 'ICUキャンパスの地図です。館内の情報も含め閲覧できます',
  ogDescription: '非公式ICU地図 各館の構内図も閲覧できます。',
})

// Polygons
function textStyleFunction(feature) {
  return new Style({
    image: new CircleStyle({
      radius: 20,
      fill: new Fill({ color: 'rgba(255, 255, 255, 0)' }),
      stroke: new Stroke({ color: 'rgba(255, 255, 255, 0)', width: 1 }),
    }),
    text: createTextStyle(feature),
  });
}

const createTextStyle = function (feature) {
  return new Text({
    text: feature.get('name'),
    scale: 1.5,
    font: 'bold 8px ' + 'Inter',
    overflow: true,
    fill: new Fill({ color: 'rgba(255, 255, 255, 255)' }),
    stroke: new Stroke({ color: 'rgba(0, 0, 0, 255)', width: 1 }),
  }
  )
}

const l3 = new VectorLayer({
  source: new VectorSource({
    url: '/point.geojson',
    format: new GeoJSON(),
  }),
  style: textStyleFunction,
  displayInLayerSwitcher: false,
});


// Polygons
function polygonStyleFunction(feature, resolution) {
  return new Style({
    stroke: new Stroke({
      color: '#176B87',
      width: 1,
    }),
    fill: new Fill({
      color: '#8ECDDD',
    }),
  });
}

const vectorPolygons = new VectorLayer({
  source: new VectorSource({
    url: '/poly.geojson',
    format: new GeoJSON(),

  }),
  style: polygonStyleFunction,
  displayInLayerSwitcher: false,
});


var extent = [
  139.509396, 35.695916,
  139.547358, 35.667192
];

extent = [
  35.695916, 139.509396,
  35.667192, 139.547358
]

const extentespg = [
  4258860.177200441, 15530114.945861055,
  4254923.606765767, 15534340.834106652,
]
const palette = {
  // anno: {
  //   green: '#557',
  //   terrain: '#557',
  //   text: {
  //     main: '#fff',
  //     light: '#fff',
  //   },
  // },
  background: '#fff',
  building: {
    fill: '#8ECDDD',
    stroke: '#176B87',
  },
  contour: {
    main: '#cdcdcd',
    light: '#cdcdcd',
  },
  rail: {
    station: {
      main: '#99f',
      light: '#ccf',
    },
  },
  road: {
    highway: {
      main: '#fff',
      edge: '#fff',
    },
    national: {
      main: '#ccf',
      edge: '#bbf',
    },
    pref: {
      main: '#ddf',
      edge: '#bbc',
    },
    basic: {
      main: '#dcdcdc',
      edge: '#bbc',
    },
    edge: '#bbc',
  },
  transp: {
    highway: '#44a',
  },
  waterarea: '#aaf',
};

useSafeOnMounted(rootE1, () => {
  const layer = gsiOptVtLayer({
    title: '1F',
    theme: { palette },
    layers: gsiOptVtLayerExclude(['Anno']),
    visible: true,
    baseLayer: true,
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

  const viewdef = new View({
      center: fromLonLat([139.530348, 35.687153]),
      zoom: 18,
      rotation: 0,
    });

  const map = new Map({
    target: 'map',
    view: viewdef,
    moveTolerance: 3.0,
    layers: [layer4, layer3, layer2, layer],
    controls: defaultControl({
      attribution: false,
    }).extend([
      new Attribution({
        collapsible: false,
      }),
    ]),
  });




  map.addLayer(vectorPolygons);

  map.addLayer(l3);

  var select = new Select({
    layers: [l3]
  });
  map.addInteraction(select);
  const router = useRouter();

  select.getFeatures().on(['add'], function (e) {
    console.log(e.element.values_.name);
    router.push(`/map/${e.element.values_.link}`);
  })


  const geolocation = new Geolocation({
  trackingOptions: {
    enableHighAccuracy: true,
  },
  projection: viewdef.getProjection()
  });
  function el(id) {
  return document.getElementById(id);
  }

  el('track').addEventListener('change', function () {
  geolocation.setTracking(this.checked);
  });

  geolocation.on('error', function (error) {
  const info = document.getElementById('info');
  info.innerHTML = error.message;
  info.style.display = '';
});

  const accuracyFeature = new Feature();
  geolocation.on('change:accuracyGeometry', function () {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  });

  const positionFeature = new Feature();
  positionFeature.setStyle(
    new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: '#3399CC',
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2,
        }),
      }),
    })
  );

  geolocation.on('change:position', function () {
    const coordinates = geolocation.getPosition();
    positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
  });

  const geolol = new VectorLayer({
  source: new VectorSource({
    features:[accuracyFeature,positionFeature],
  }),
  displayInLayerSwitcher: false,
});

  map.addLayer(geolol);

});

</script>

<style scoped>

</style>