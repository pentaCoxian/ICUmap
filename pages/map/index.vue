<template>
    <div class="grow mt-8 mb-4">
        <div class="container mx-auto h-full" ref="rootE1">
            <div id="map" class="h-full grow border-black border-2"></div>
        </div>
    </div>
</template>

<script setup>

useHead(
    {
        link: [
            { rel: "stylesheet", href: "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css", integrity: "sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=", crossorigin: "" },
        ],
        script: [
            { src: "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js", integrity: "sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=", crossorigin: "" },
            { src: "https://unpkg.com/leaflet.vectorgrid@latest/dist/Leaflet.VectorGrid.bundled.js" }
        ]

    }

);
var options = {
    maxZoom: 20,
    minZoom: 17
}

const rootE1 = ref()
useSafeOnMounted(rootE1, () => {
    var map = L.map('map',options).setView([35.687153, 139.530348], 16);

    L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
        renderFactory: L.canvas.tile,
        maxNativeZoom: 18,
        minNativeZoom: 18,
        maxZoom: 20,
        vectorTileLayerStyles: {
            label: []
        },
    }).addTo(map);

    // var map = L.map('map').setView([35.687153, 139.530348], 16);

    // L.vectorGrid
    //     .protobuf(
    //         "https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf",
    //         {
    //             attribution:
    //                 "<a href='https://github.com/gsi-cyberjapan/gsimaps-vector-experiment' target='_blank'>国土地理院ベクトルタイル提供実験</a>",
    //             rendererFactory: L.canvas.tile,
    //             // maxNativeZoom: 16,
    //             // minNativeZoom: 16,
    //             // maxZoom: 20,
    //             // 各レイヤーのスタイル設定
    //             vectorTileLayerStyles: {
    //                 // road: {
    //                 //     color: "gray",
    //                 //     weight: 1,
    //                 // },
    //                 // railway: [],
    //                 // river: {
    //                 //     color: "dodgerblue",
    //                 //     weight: 1,
    //                 // },
    //                 // lake: [],
    //                 // // 表示しないレイヤー
    //                 // boundary: [],
    //                 // building: {
    //                 //     color: "black",
    //                 //     weight: 1,
    //                 // },
    //                 // coastline: [],
    //                 // contour: [],
    //                 // elevation: [],
    //                 // label: [],
    //                 // landforma: [],
    //                 // landforml: [],
    //                 // landformp: [],
    //                 // searoute: [],
    //                 // structurea: [],
    //                 // structurel: [],
    //                 // symbol: [],
    //                 // transp: [],
    //                 // waterarea: [],
    //                 // wstructurea: [],
    //             },
    //         }
    //     )
    //     .addTo(map);

    

})
</script>

<style lang="scss" scoped></style>