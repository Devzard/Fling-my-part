import React, { Component } from "react";
import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import EditorJs from "react-editor-js";

const EDITOR_JS_TOOLS = {
  embed: Embed,
  paragraph: Paragraph,
  list: List,
  header: Header,
  simpleImage: SimpleImage,
};

let data;

export class DG_AddPost_Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [],
    };
    this.editorInstance = React.createRef();
  }
  async handleSave() {
    const savedData = await this.editorInstance.save();
    this.setState({ blocks: savedData.blocks });
    console.log(savedData);
  }

  componentDidUpdate() {
    console.log(this.state.blocks);
  }

  render() {
    return (
      <div>
        <EditorJs
          instanceRef={(instance) => (this.editorInstance = instance)}
          data={data}
          tools={EDITOR_JS_TOOLS}
        />
        <div id="elementjs" />
        <button onClick={() => this.handleSave(data)}>+</button>
      </div>
    );
  }
}

export default DG_AddPost_Editor;
