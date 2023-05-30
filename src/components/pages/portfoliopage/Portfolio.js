import React from "react";
import investments from "../../data/portfolio.json";
import InvestmentCard from "./components/investmentcards"
import "./style.css";

function Portfolio() {
  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h3>Investments</h3>
      </div>
      <div className="portfolio-grid">
        {/* Add a grid container to hold the portfolio items */}
        {investments.map((investment) => (
        <InvestmentCard
        id={investment.id}
        key={investment.id}
        name={investment.name}
        image={investment.image}
        link={investment.link}
        />
    ))}
      </div>
    </div>
  );
}

export default Portfolio;

