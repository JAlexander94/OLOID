import React from "react";
import "./home.css";

function Home() {
  return (
    <div id="homepage">
      <div className="card w-50" id="homecard">
        <div className="card-body">
          {/* <img src="/images/nav-logosymbol.png"></img> */}
          <img src="/images/nav-logotext.png"></img>
          <p className="card-text">The first venture fund focussing solely on crowdfunded businesses</p>
        </div>
      </div>
    </div>
  );
}

export default Home;