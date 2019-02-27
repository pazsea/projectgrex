import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import Geolocation from "./geolocation";

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

class Map extends Component {
  componentDidMount() {
    this.map = L.map("map", {
      center: [58, 16],
      zoom: 6,
      zoomControl: false
    });

    L.tileLayer(
      "https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png",
      {
        attribution:
          'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        detectRetina: true,
        maxZoom: 20,
        maxNativeZoom: 17,
        accessToken:
          "pk.eyJ1IjoibmFpY2FoIiwiYSI6ImNqc2xsdGFxczJwYm40M254MnpnMGJlaHEifQ.CrjwoRsRgeGSWSFGC3xp6A"
      }
    ).addTo(this.map);
  }

  render() {
    return (
      <div>
        <Wrapper width="90vw" height="80vh" id="map" />
        <Geolocation />
      </div>
    );
  }
}

export default Map;
