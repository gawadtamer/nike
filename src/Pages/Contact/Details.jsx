import React, { useEffect } from "react";


function Details() {
  useEffect(() => {
    const loadMap = () => {
      if (window.L) {
        const mymap = window.L.map("mapid").setView([30.0444, 31.2357], 13);

        window.L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ).addTo(mymap);

        window.L.marker([30.0444, 31.2357])
          .addTo(mymap)
          .bindPopup("<b>Our Location</b><br />Cairo")
          .openPopup();

        mymap.scrollWheelZoom.disable();
      }
    };

    if (!window.L) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
      script.onload = loadMap;
      document.body.appendChild(script);

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
      document.head.appendChild(link);
    } else {
      loadMap();
    }
  }, []);

  return (
    <div className="contact-page">
      
      {/* HEADER */}
      <div className="hero">
        <h1>CONTACT US</h1>
        <p>Let’s build something legendary together 🚀</p>
      </div>

      {/* MAP */}
      <div id="mapid" className="map"></div>

      {/* FORM */}
      <div className="contact-container">
        <form className="contact-form">
          <div className="input-group">
            <input type="text" required />
            <label>Name</label>
          </div>

          <div className="input-group">
            <input type="email" required />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input type="text" required />
            <label>Subject</label>
          </div>

          <div className="input-group">
            <textarea required></textarea>
            <label>Message</label>
          </div>

          <button className="submit-btn">SEND MESSAGE</button>
        </form>
      </div>
    </div>
  );
}

export default Details;
