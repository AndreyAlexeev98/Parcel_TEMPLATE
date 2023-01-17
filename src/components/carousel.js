import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { PdfViewer } from './pdf-viewer';
import { StlViewer } from './stl-viewer';
import { Viewer2D } from './2d-viewer';

const Carousel = (props) => {

  const items = props.data.map((item) => {
    if (item.type === 'pdf') {
      return <PdfViewer data={item.path} />
    }
    if (item.type === 'image') {
      return <img src={item.path} role="presentation" />
    }
    if (item.type === 'stl') {
        return (<StlViewer data={item.path} />)
    }
    if (item.type === '2d') {
      return (<Viewer2D data={item.path} />)
    }
  });

  return (
    <AliceCarousel items={items} />
  );
}

export default Carousel;