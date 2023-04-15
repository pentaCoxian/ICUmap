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
import { OSM, Vector as VectorSource, ImageStatic } from 'ol/source.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Circle as CircleStyle, Fill, Stroke, Style, Text, Icon } from 'ol/style.js';
import { fromLonLat, Projection } from 'ol/proj';
import { Point } from 'ol/geom';
import { Select } from 'ol/interaction'
import { Tile as TileLayer, Vector as VectorLayer, Image, Layer } from 'ol/layer.js';
import { Attribution, ScaleLine, defaults as defaultControl } from 'ol/control';
import { composeCssTransform } from 'ol/transform';
import { gsiOptVtLayer, gsiOptVtLayerExclude } from '@cieloazul310/ol-gsi-vt';
import axios from 'axios';

import proj4 from 'proj4'
import { register } from 'ol/proj/proj4.js'

import '../../styles/ol.css';
import '../../styles/ol-ext.css';
import '../../styles/switcher.css';
import optVtLayer from '~/composables/gsi-opt-vt';
import ImageLayer from 'ol/layer/Image';
import { mouseActionButton } from 'ol/events/condition';
//import LayerSwitcher from 'ol-ext/control/LayerSwitcher';

const { $LayerPopup } = useNuxtApp();
const { $Popup } = useNuxtApp();
const rootE1 = ref();

var icon_svg = await axios({
  url: 'http://43.235.0.237/svg.svg',
  method: 'GET',
  responseType: 'text',
}).then((response) => {
  return response.data;
});


const layer = gsiOptVtLayer({
  title: '1F',
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



// Polygons
function textStyleFunction(feature) {
  return new Style({
    image: new CircleStyle({
      radius: 20,
      fill: new Fill({ color: 'rgba(255, 0, 0, 0)' }),
      stroke: new Stroke({ color: 'rgba(255, 0, 0, 0)', width: 1 }),
    }),
    text: createTextStyle(feature),
  });
}

const createTextStyle = function (feature) {
  return new Text(
    { text: feature.get('name'), scale: 1.5, }
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
      color: 'orange',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(255, 222, 133,0.5)',
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

// proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs +type=crs");
// register(proj4);

// const projection = new Projection({
//   code: 'EPSG:4326',
//   extent: extentespg,
// })

var projection = new Projection({
  code: 'static-image',
  units: 'pixels',
  extent: [0, 0, 512, 512]
})


useSafeOnMounted(rootE1, () => {

  const map = new Map({
    target: 'map',
    view: new View({
      center: fromLonLat([139.530348, 35.687153]),
      zoom: 18,
      rotation: 0,
    }),
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




  var commentStyle = new Style({
    image: new Icon({
      rotation:Math.PI/0.974,
      opacity:0.5,
      src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(icon_svg)
    })
  });

  var vectorSource = new VectorSource({
    features: [
      new Feature({
        geometry: new Point(fromLonLat([139.53096833940336, 35.68673672737103]))
      })
    ]
  });

  var vectorLayer = new VectorLayer({
    name: 'Comments',
    updateWhileAnimating: true,
    updateWhileInteracting: true,
    style: commentStyle,
    source: vectorSource,
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
    router.push(`/omap/${e.element.values_.link}`);
  })

  // vectorLayer.setStyle(function (feature, resolution) {
  //   commentStyle.getImage().setScale((map.getView().getResolutionForZoom(3) / resolution)*0.000025);
  //   return commentStyle;
  // })
  // map.addLayer(vectorLayer);

  // var layerPopup = new $LayerPopup({
  //   collapsed: false
  // });
  // map.addControl(layerPopup);

});

</script>

<style lang="css" scoped></style>