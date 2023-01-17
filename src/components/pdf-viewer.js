import React from "react";

export class PdfViewer extends React.Component {
  componentDidMount() {
  }
  render() {
    return <iframe className='pdf-viewer' src={ this.props.data } role="presentation"/>
  }
}
