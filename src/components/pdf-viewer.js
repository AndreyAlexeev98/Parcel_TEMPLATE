import React from "react";
import pathToPdf from "/example.pdf";

// import pathToPdf from "/example.pdf";
// console.log(pathToPdf); хешированный путь к файлу;
// console.log(this.props.filePath.path); // путь который указан в переменной родительского компонента;

function funstionName(argsumentsFunc) {
    // some function 
}

export class PdfViewer extends React.Component {
  
    componentDidMount() {
    // js logic
  }

  render() {
    return <iframe className='pdf-viewer' src={ this.props.filePath.path }/>
    //return <div className="stl-viewer" ref={(ref) => (this.mount = ref)} />;
  }

}
