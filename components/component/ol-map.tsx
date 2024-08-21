import React, { useEffect, useRef, useState } from "react";
import { Map as OlMap, View } from "ol";
import { defaults as defaultControls } from "ol/control";
import { fromLonLat, get as getProjection } from "ol/proj";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Style, Circle as CircleStyle, Fill, Stroke } from "ol/style";
import { Draw, Snap, Modify, Select, DragBox } from "ol/interaction";
import { platformModifierKeyOnly } from "ol/events/condition";
import { boundingExtent, intersects } from "ol/extent";
import "ol/ol.css";

const initVectorLayer = new VectorLayer({
  source: new VectorSource(),
  style: new Style({
    fill: new Fill({
      color: "rgba(0, 0, 0, 0.2)",
    }),
    stroke: new Stroke({
      color: "red",
      width: 2,
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: "red",
      }),
    }),
  }),
});

export default function MapTest() {
  const mapContent = useRef(null);
  const gisMapRef = useRef<OlMap>();
  const featuresLayerRef = useRef<VectorLayer>(initVectorLayer);
  const drawSnapObjRef = useRef<{ draw?: Draw; snap?: Snap }>({});
  const typeSelect = useRef<HTMLSelectElement>(null);
  const [selectInteraction, setSelectInteraction] = useState<Select>();
  const [dragBox, setDragBox] = useState<DragBox>();

  const onChangeHandler = () => {
    if (drawSnapObjRef.current.draw && drawSnapObjRef.current.snap) {
      gisMapRef.current.removeInteraction(drawSnapObjRef.current.draw);
      gisMapRef.current.removeInteraction(drawSnapObjRef.current.snap);
    }
    addDrawSnap();
  };

  const addDrawSnap = () => {
    if (typeSelect.current.value === "None") return;

    const draw = new Draw({
      source: featuresLayerRef.current.getSource(),
      type: typeSelect.current.value,
    });
    gisMapRef.current.addInteraction(draw);

    const snap = new Snap({ source: featuresLayerRef.current.getSource() });
    gisMapRef.current.addInteraction(snap);

    drawSnapObjRef.current = { draw, snap };
  };

  const handleDeleteSelectedFeatures = () => {
    if (!selectInteraction) return;
    const selectedFeatures = selectInteraction.getFeatures();
    selectedFeatures.forEach((feature) => {
      featuresLayerRef.current.getSource().removeFeature(feature);
    });
    selectedFeatures.clear(); // Clear the selection after deletion
  };

  useEffect(() => {
    if (!mapContent.current) return;

    const map = new OlMap({
      controls: defaultControls({ zoom: false, rotate: false }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        featuresLayerRef.current,
      ],
      view: new View({
        projection: getProjection("EPSG:3857"),
        center: fromLonLat([127.296364, 37.503429]),
        zoom: 15,
        minZoom: 7,
        maxZoom: 20,
      }),
      target: mapContent.current,
    });

    gisMapRef.current = map;

    addDrawSnap();

    const modify = new Modify({ source: featuresLayerRef.current.getSource() });
    map.addInteraction(modify);

    // Create and add the Select interaction for single-click selection
    const select = new Select();
    map.addInteraction(select);
    setSelectInteraction(select);

    // Create and add the DragBox interaction for drag area selection
    const dragBox = new DragBox({
      condition: platformModifierKeyOnly, // Use Ctrl + Drag (or Cmd + Drag) to activate
    });
    map.addInteraction(dragBox);
    setDragBox(dragBox);

    // Handle drag box selection
    dragBox.on("boxend", () => {
      // Get the extent of the box and select features that intersect it
      const extent = dragBox.getGeometry().getExtent();
      const selectedFeatures = select.getFeatures();
      selectedFeatures.clear();

      featuresLayerRef.current
        .getSource()
        .forEachFeatureIntersectingExtent(extent, (feature) => {
          selectedFeatures.push(feature);
        });
    });

    return () => map.setTarget(undefined);
  }, []);

  return (
    <div className="w-full h-full">
      <div ref={mapContent} className="w-full h-full"></div>
      <div className="flex space-x-2 ">
        <select ref={typeSelect} defaultValue="None" onChange={onChangeHandler}>
          <option value="None">None</option>
          <option value="Point">Point</option>
          <option value="LineString">LineString</option>
          <option value="Polygon">Polygon</option>
          <option value="Circle">Circle</option>
        </select>
        <button
          onClick={handleDeleteSelectedFeatures}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete Selected Feature
        </button>
      </div>
    </div>
  );
}
