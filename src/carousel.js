import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { PdfViewer } from './components/pdf-viewer';
const filePath = {
  path: '/example.84e76d98.pdf'
};


const items = [
  // <iframe className='pdf-viewer' src="./example.pdf"/>,
  <PdfViewer filePath={filePath}/>,
  <img src="/ex.ede68acb.jpg" role="presentation" />,
  <img src="/ex2.7a7ad8a6.jpg" role="presentation" />,
  <img src="/matcap-porcelain-white.2b79fc5d.jpg" role="presentation" />,
  // <img src="/slide1.jpg" onDragStart={handleDragStart} role="presentation" />,
  // <img src="/slide2.jpg" onDragStart={handleDragStart} role="presentation" />,
  // <img src="/slide3.jpg" onDragStart={handleDragStart} role="presentation" />,
  // <img src="/slide4.png" onDragStart={handleDragStart} role="presentation" />,
  // <img src="/slide5.jpg" onDragStart={handleDragStart} role="presentation" />,
];



const Carousel = () => {
  return (
    <AliceCarousel items={items} />
  );
}

export default Carousel;