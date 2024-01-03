import React from "react";
import img from "../assets/img/page-not-found.webp";
import "../assets/NoMatchRoute.css";

function NoMatchRoute() {
    return (
        <img className="not-found" src={img} alt="page-not-found-img" />
    );
}

export default NoMatchRoute;