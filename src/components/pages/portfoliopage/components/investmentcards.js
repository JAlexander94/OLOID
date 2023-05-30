import React from "react";
import "./style.css";

function InvestmentCard(props) {
  return (
    <a href={props.link} target="_blank" className="portfolio-item" key={props.id}>
    <div className="portfolio-item-inner">
      <img src={props.image} alt={props.name} className="portfolio-item-image" />
      <div className="portfolio-item-overlay">
        <h3 className="portfolio-item-title">{props.name}</h3>
      </div>
    </div>
    </a>
  );
}

export default InvestmentCard;