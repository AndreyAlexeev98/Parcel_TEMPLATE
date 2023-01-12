import React from "react";
import ReactDOM from "react-dom";

import { StlViewer } from "./stl-viewer";

function PropertiesList(props) {
  return (
    <React.Fragment>
      {props.props.map(data => <StlViewer key={data} data={data} />)}
    </React.Fragment>
  );
}

// рендер stl
export function initStlViewer(props) {
  ReactDOM.render(
    <PropertiesList props={props}/>,
    document.getElementById("react-properties-list")
  );
};

// логика рендеринга stl

const parentElement = document.querySelector('[ data-name="tbody" ]');
// const element = document.querySelectorAll(`[ data-hystmodal-carousel="[ data-name='modal-carousel' ]" ]`);

parentElement.addEventListener('click', (e) => {
 
  if (e.target.dataset.path) {
    let pathForParse = e.target.dataset.path.replace(/'/g, '"');
    let arrayPath = JSON.parse(pathForParse);
    console.log(arrayPath)
    initStlViewer(arrayPath); 
  }
})


