import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const RiskGauge = ({ probability }) => (
  <div style={{ width: 300, margin: "0 auto" }}>
    <ReactSpeedometer
      maxValue={100}
      value={probability}
      needleColor="steelblue"
      startColor="green"
      segments={3}
      endColor="red"
      height={250}
      ringWidth={40}
    />
    <p style={{ textAlign: "center", marginTop: 10 }}>
      Risk Probability: {probability.toFixed(2)}%
    </p>
  </div>
);

export default RiskGauge;
