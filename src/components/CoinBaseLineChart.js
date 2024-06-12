"use client";
import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const CoinBaselineChart = ({ data }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const chartOptions = {
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
    };

    const chart = createChart(chartContainerRef.current, chartOptions);

    const baselineSeries = chart.addBaselineSeries({
      baseValue: { type: "price", price: 25 },
      topLineColor: "rgba(38, 166, 154, 1)",
      topFillColor1: "rgba(38, 166, 154, 0.28)",
      topFillColor2: "rgba(38, 166, 154, 0.05)",
      bottomLineColor: "rgba(239, 83, 80, 1)",
      bottomFillColor1: "rgba(239, 83, 80, 0.05)",
      bottomFillColor2: "rgba(239, 83, 80, 0.28)",
    });

    baselineSeries.setData(data);

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [data]);

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "300px" }} />
  );
};

export default CoinBaselineChart;
