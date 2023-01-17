import React from "react";
import ReactDOM from 'react-dom/client';

import Carousel from "./components/carousel";

import '/scss/main.scss';

const carousel = ReactDOM.createRoot(document.getElementById('carousel'));
const parentElems = document.querySelectorAll('[ data-name="tbody" ]');

parentElems.forEach(item => {
  item.addEventListener('click', (event) => {
    let btn = event.target.closest('[ data-carousel ]');
    if (!btn) return;
    if (!item.contains(btn)) return;
    const data = JSON.parse(btn.dataset.json);
    carousel.render(<Carousel data={data} />);
  });
});