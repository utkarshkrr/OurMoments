import React from "react";
import "./styles.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="coffee-loader">
        <div className="cup">
          <span className="steam"></span>
          <span className="steam"></span>
          <span className="steam"></span>
          <div className="cup-handle"></div>
        </div>
        <span className="loadingMessage">ruko zara, sabr karo</span>
      </div>
    </div>
  );
};

export default Loader;
