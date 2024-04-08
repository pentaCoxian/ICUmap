<template>
    <div class="grow mt-0 sm:mb-16 mb-0">
        <div class="container mx-auto h-full" ref="rootE1">
            <div id="toast-simple"
                class="flex z-50 fixed left-1/2 -translate-x-1/2 top-20 items-center justify-center w-full max-w-fit sm:p-4 px-4 py-2 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg drop-shadow-2xl space-x "
                role="alert">

                <NuxtLink to="/map">
                    <div class="sm:text-base text-sm font-light text-blue-500 font-normal">Go Back To Home</div>
                </NuxtLink>
            </div>
            <div id="map" class="h-full grow border-black border-2"></div>
        </div>
    </div>
</template>
  
<script setup>
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import { Vector as VectorSource, } from 'ol/source.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Circle as CircleStyle, Fill, Stroke, Style, Text, Icon } from 'ol/style.js';
import { fromLonLat, } from 'ol/proj';
import { Point } from 'ol/geom';
import { Select } from 'ol/interaction'
import { Vector as VectorLayer, } from 'ol/layer.js';
import { Attribution, defaults as defaultControl } from 'ol/control';
import { gsiOptVtLayer, gsiOptVtLayerExclude } from '@cieloazul310/ol-gsi-vt';
import '../../styles/ol.css';
import '../../styles/ol-ext.css';
import '../../styles/switcher.css';
//import LayerSwitcher from 'ol-ext/control/LayerSwitcher';


const { $LayerPopup } = useNuxtApp();
const rootE1 = ref();

const startPos = {
    'honkan': [
        139.52967588488048,
        35.68751060591862
    ],
    'old-d': [
        139.529787191634,
        35.686049537693805
    ],
    'new-d': [
        139.52929528743374,
        35.686344086485505
    ],
    'workshop': [
        139.5289577765497,
        35.686449073912044
    ],
    'lib': [
        139.53089833940336,
        35.68686672737103
    ],
    'sci': [
        139.52918576856467,
        35.688418755377995
    ],
    'ilc': [
        139.53027217893583,
        35.6883379593813
    ],
    'erb-2': [
        139.53031504002382,
        35.68890393432156
    ],
    'yushima': [
        139.53105159419914,
        35.68873491574098
    ],
    'erb-1': [
        139.53092761908522,
        35.68763017777832
    ],
    'gakki': [
        139.52958967686504,
        35.68541792455619
    ],
    'chapel': [
        139.53033792823675,
        35.68585256782036
    ],
    'adb': [
        139.53229988004696,
        35.6868085585538
    ],
    'peA': [
        139.53240152516062,
        35.6855981191544
    ],
    'peB': [
        139.53289152516062,
        35.6856981191544
    ],
    'sports': [
        139.53351067048764,
        35.68545626685625
    ],
    'alumni': [
        139.53213387533236,
        35.68763871226058
    ],
    'troy': [
        139.52868452541992,
        35.68800269131255
    ],
}

const metaa = {
    'honkan': {
        'floors': {
            '1F': '/data/honkan/honkan1f.png',
            '2F': '/data/honkan/honkan2f.png',
            '3F': '/data/honkan/honkan3f.png',
            '4F': '/data/honkan/honkan4f.png',
        },
        'lonlat': {
            '1F': [139.52967588488048, 35.68753060591862],
            '2F': [139.52969588488048, 35.68756060591862],
            '3F': [139.52969588488048, 35.68757060591862],
            '4F': [139.52965088488048, 35.68756360591862],
        },
        'scale': {
            '1F': 0.0000042,
            '2F': 0.0000042,
            '3F': 0.0000042,
            '4F': 0.0000045,
        },
        'rotation': 0.494
    },
    'old-d': { 'floors': [], },
    'new-d': { 'floors': [], },
    'workshop': { 'floors': [], },
    'lib': {
        'floors': {
            'GF': '/data/lib/FloorGF2023-p.png',
            '1F': '/data/lib/Floor1F2022.png',
            '2F': '/data/lib/Floor2F2022.png',
        },
        'lonlat': {
            'GF': [139.53094833940336, 35.68668672737103],
            '1F': [139.53094833940336, 35.68668672737103],
            '2F': [139.53096833940336, 35.68680672737103],
        },
        'scale': {
            'GF': 0.0000034,
            '1F': 0.0000033,
            '2F': 0.0000034,
        },
        'rotation': 0.974,
    },
    'sci': {
        'floors': {
            '1F': '/data/sh/SH-1.png',
            '2F': '/data/sh/SH-2.png',
            '3F': '/data/sh/SH-3.png',
        },
        'lonlat': {
            '1F': [139.52921352541992, 35.68845369131255],
            '2F': [139.52921352541992, 35.68844369131255],
            '3F': [139.52921352541992, 35.68844369131255],
        },
        'scale': {
            '1F': 0.0000022,
            '2F': 0.0000027,
            '3F': 0.0000027,
        },
        'rotation': -0.5082,
    },
    'ilc': { 'floors': [], },
    'erb-2': { 'floors': [], },
    'yushima': { 'floors': [], },
    'erb-1': {
        'floors': {
            '1F': '/data/erb/ERB1f.png',
            '2F': '/data/erb/ERB2f.png',
            '3F': '/data/erb/ERB3f.png',
        },
        'lonlat': {
            '1F': [139.53094161908522, 35.68762517777832],
            '2F': [139.53094161908522, 35.68766017777832],
            '3F': [139.53094161908522, 35.68762517777832],
        },
        'scale': {
            '1F': 0.00000235,
            '2F': 0.00000235,
            '3F': 0.00000235,
        },
        'rotation': 0.4955
    },
    'gakki': {
        'floors': {
            '1F': '/data/g/gakki1f.png',
            '2F': '/data/g/gakki2f.png',
        },
        'lonlat': {
            '1F': [139.52962767686504, 35.68539692455619],
            '2F': [139.52958767686504, 35.68532692455619],
        },
        'scale': {
            '1F': 0.00000343,
            '2F': 0.0000026,
        },
        'rotation': 0.468
    },
    'chapel': { 'floors': [], },
    'adb': {
        'floors': {
            '1F': '/data/ad/ad1f.png',
            '2F': '/data/ad/ad2f.png',
        },
        'lonlat': {
            '1F': [139.53234988004696, 35.6869585585538],
            '2F': [139.5323568004696, 35.6869405585538],
        },
        'scale': {
            '1F': 0.00000313,
            '2F': 0.00000313,
        },
        'rotation': 0.4935
    },
    'peA': {
        'floors': {
            '1F': '/data/pe/pecA1f.png',
            '2F': '/data/pe/pecA2f.png',
        },
        'lonlat': {
            '1F': [139.53222552516062, 35.6854381191544],
            '2F': [139.53220752516062, 35.6854451191544],
        },
        'scale': {
            '1F': 0.000005,
            '2F': 0.000005,
        },
        'rotation': 0.3365
    },
    'peB': {
        'floors': {
            '1F': '/data/pe/pecBC1f.png',
            '2F': '/data/pe/pecBC2f.png',
        },
        'lonlat': {
            '1F': [139.53290052516062, 35.6856681191544],
            '2F': [139.53292552516062, 35.6856595191544],
        },
        'scale': {
            '1F': 0.00000393,
            '2F': 0.00000393,
        },
        'rotation': 0.5085
    },
    'sports': {
        'floors': {
            '1F': '/data/pe/club1f.png',
            '2F': '/data/pe/club2f.png',
        },
        'lonlat': {
            '1F': [139.53353067048764, 35.68539516685625],
            '2F': [139.53351067048764, 35.68545626685625],
        },
        'scale': {
            '1F': 0.0000028,
            '2F': 0.00000393,
        },
        'rotation': 0.682
    },
    'alumni': { 'floors': [], },
    'troy': {
        'floors': {
            '1F': '/data/T/T1F.png',
            '2F': '/data/T/T2F.png',
            '3F': '/data/T/T3F.png',
            '4F': '/data/T/T4F.png',
        },
        'lonlat': {
            '1F': [139.52891452541992, 35.68781269131255],
            '2F': [139.52875452541992, 35.68786269131255],
            '3F': [139.52875452541992, 35.68786269131255],
            '4F': [139.52875452541992, 35.68786269131255],
        },
        'scale': {
            '1F': 0.000001,
            '2F': 0.00000096,
            '3F': 0.00000096,
            '4F': 0.00000096,
        },
        'rotation': 0.4918
    },
}

const route = useRoute();
const centerArr = startPos[`${route.params.build}`];
var id = metaa[`${route.params.build}`]['floors'];
var lons = metaa[`${route.params.build}`]['lonlat'];
var scales = metaa[`${route.params.build}`]['scale'];
var rotation = metaa[`${route.params.build}`]['rotation'];
// Labels
function textStyleFunction(feature) {
    return new Style({
        image: new CircleStyle({
            radius: 19,
            fill: new Fill({ color: 'rgba(255, 0, 0, 0)' }),
            stroke: new Stroke({ color: 'rgba(255, 0, 0, 0)', width: 1 }),
        }),
        text: createTextStyle(feature),
    });
}

const createTextStyle = function (feature) {
    return new Text({
        text: feature.get('link') == `${route.params.build}` ? void (0) : feature.get('name'),
        scale: 1.5,
        font: '10px sans-serif',
        overflow: true,
        backgroundFill: new Fill({ color: 'rgba(255, 255, 255, 200)' }),
        fill: new Fill({ color: 'rgba(0, 0, 0, 255)' }),
        stroke: new Stroke({ color: 'rgba(0, 0, 0, 0)', width: 1 }),
     })
}

const l3 = new VectorLayer({
    source: new VectorSource({
        url: '/point.geojson',
        format: new GeoJSON(),
    }),
    style: textStyleFunction,
    displayInLayerSwitcher: false,
});

// building T
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

    //base
    const layer = gsiOptVtLayer({
        title: '1F',
        theme: {palette},
        layers: gsiOptVtLayerExclude(['Anno']),
        visible: true,
        baseLayer: false,
        displayInLayerSwitcher: false,
    })

    var gsiLayers = [];
    Object.keys(id).forEach((element, index) => {
        var commentStyle = new Style({
            image: new Icon({
                rotation: Math.PI / rotation,
                opacity: 0.75,
                rotateWithView: true,
                src: `${id[element]}`
            })
        });

        const tmpLayer = new VectorLayer({
            name: element,
            baseLayer: true,
            visible: element == (`${route.params.build}` == 'lib' ? 'GF' : '1F') ? true : false,
            updateWhileAnimating: true,
            updateWhileInteracting: true,
            style: new Style({
                image: new Icon({
                    rotation: Math.PI / 0.974,
                    opacity: 0.5,
                    rotateWithView: true,
                    src: id[element]
                })
            }),
            source: new VectorSource({
                features: [
                    new Feature({
                        geometry: new Point(fromLonLat(lons[element]))
                    })
                ]
            })
        })
        tmpLayer.setStyle(function (feature, resolution) {
            commentStyle.getImage().setScale((map.getView().getResolutionForZoom(3) / resolution) * scales[element]);
            return commentStyle;
        })
        tmpLayer.on(['change:visible'], function (e) { e.oldValue == false ? console.log(element) : void (0) })
        gsiLayers.push(tmpLayer)
    })

    gsiLayers.push(layer)

    //make map
    const map = new Map({
        target: 'map',
        view: new View({
            center: fromLonLat(centerArr),
            zoom: 20,
            rotation: 0,
        }),
        moveTolerance: 3.0,
        layers: gsiLayers.reverse(),
        controls: defaultControl({
            attribution: false,
        }).extend([
            new Attribution({
                collapsible: false,
            }),
        ]),
    });


    if (`${route.params.build}` != 'troy') {
        map.addLayer(vectorPolygons);
    }
    
    map.addLayer(l3);




    var select = new Select({
        layers: [l3]
    });
    map.addInteraction(select);

    const router = useRouter();
    select.getFeatures().on(['add'], function (e) {
        router.push(`/map/${e.element.values_.link}`);
    })


    var layerPopup = new $LayerPopup({
        collapsed: false,
    });
    map.addControl(layerPopup);

    const viewdef = new View({
        center: fromLonLat([139.530348, 35.687153]),
        zoom: 18,
        rotation: 0,
    });

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
            features: [accuracyFeature, positionFeature],
        }),
        displayInLayerSwitcher: false,
    });

    map.addLayer(geolol);

});

</script>
  
<style lang="css" scoped></style>