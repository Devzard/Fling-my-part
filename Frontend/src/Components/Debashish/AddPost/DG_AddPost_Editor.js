import React, { Component } from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../EditorjsPlugins/tools";
import BlockRenderer from "../BlockRenderer/BlockRenderer";
import "./dg-addpost.css";

let data;
const path = "https://my-fling.herokuapp.com";

export class DG_AddPost_Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocksData: null,
    };
    this.editorInstance = React.createRef();
  }
  async handleSave() {
    console.log(this.editorInstance);
    const savedData = await this.editorInstance.save();
    this.setState({ blocksData: savedData });
    console.log(this.state.blocksData);

    // axios.post(`${path}/feed/new`,{

    // }).then(res=>{})
    // .catch(err=>{});
  }

  componentDidUpdate() {
    console.log(this.state.blocksData);
  }

  render() {
    return (
      <div>
        <EditorJs
          instanceRef={(instance) => (this.editorInstance = instance)}
          data={this.state.blocksData}
          tools={EDITOR_JS_TOOLS}
          holder="holder"
        >
          <div id="holder" contentEditable={false}></div>
        </EditorJs>
        <button onClick={() => this.handleSave(data)}>+</button>
        {/* <BlockRenderer data={this.state.blocksData} /> */}
      </div>
    );
  }
}

export default DG_AddPost_Editor;
