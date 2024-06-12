"use client";
import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { CrosshairMode } from "lightweight-charts";

const CoinChart = ({ data }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    if (!data) return;
    const chart = createChart(chartContainerRef.current, {
      width: 200,
      height: 50,
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          visible: false,
          labelVisible: false,
        },
        horzLine: {
          visible: false,
          labelVisible: false,
        },
      },
      priceScale: {
        visible: false,
      },
      timeScale: {
        visible: false,
      },
    });
    chart.applyOptions({
      handleScale: {
        priceAxisPressedMouseMove: false,
        timeAxisPressedMouseMove: true,
      },
    });
    const lineSeries = chart.addLineSeries({
      priceLineVisible: false,
      lastValueVisible: false,
    });
    lineSeries.setData(data);

    return () => {
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} />;
};

export default CoinChart;
