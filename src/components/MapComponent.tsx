"use client";

import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect, useRef } from 'react';

const MapComponent = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Create root element
    const root = am5.Root.new(chartRef.current);
    
    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create map chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
      })
    );

    // Create polygon series
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"], // Excluir la Antártida
        fill: am5.color(0x000000),
        stroke: am5.color(0xffff00)
      })
    );

    // Configurar estilos de los polígonos
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      fill: am5.color(0x000000), // Color negro
      stroke: am5.color(0xffff00), // Borde amarillo
      strokeWidth: 1
    });

    // Configurar estilos al pasar el ratón
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0xffff00), // Amarillo al hacer hover
      stroke: am5.color(0x000000) // Borde negro al hacer hover
    });

    // Añadir control de rotación
    chart.set("rotationX", -10);
    chart.set("rotationY", 10);
    
    // Añadir control de zoom
    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

    // Ajustar el zoom para que se vea todo el mundo
    chart.appear(1000, 100);

    // Limpieza al desmontar el componente
    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div 
      ref={chartRef} 
      style={{
        width: "100%",
        height: "100%",
        minHeight: "500px",
        backgroundColor: "#000000"
      }}
    />
  );
};

export default MapComponent;
