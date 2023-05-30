// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import { ChakraProvider } from "@chakra-ui/react";
import NavTabs from "./components/pages/navtabs/NavTabs";
import Home from "./components/pages/homepage/Home";
import Portfolio from "./components/pages/portfoliopage/Portfolio";
import Contact from "./components/pages/contactpage/contact";
import Login from "./components/pages/loginpage/login";
import Dash from "./components/pages/Dashboard/dashboard";
import Footer from "./components/pages/footer/footer";

import theme from "./components/pages/Dashboard/theme/theme";

function App() {
  return (
    <>
    <Helmet>
      <title>OLOID Ventures</title>
      <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans:400,500,700|Google+Sans+Text:400&amp;lang=en"></link>
      <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Google+Sans+Text:400&amp;text=%E2%86%90%E2%86%92%E2%86%91%E2%86%93&amp;lang=en"></link>
      <link type="text/css" rel="stylesheet" href="http://fonts.googleapis.com/css?family=Josefin+Sans&amp;subset=latin,latin-ext"></link>
      <meta name="description" content="My app description" />
    </Helmet>
    <ChakraProvider theme={theme} resetCss={false} position="relative">
      <Router>
        <div>
          <NavTabs />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard/*" element={<Dash />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ChakraProvider>
    </>
  );
}

export default App;