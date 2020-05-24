import React, { Component } from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../EditorjsPlugins/tools";
import BlockRenderer from "../BlockRenderer/BlockRenderer";

let data;
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

    // this.editorInstance.render({
    //   blocks: [
    //     {
    //       type: "header",
    //       data: {
    //         text: "Editor.js",
    //         level: 2,
    //       },
    //     },
    //   ],
    // });
  }

  componentDidUpdate() {
    console.log(this.state.blocksData);
  }

  render() {
    return (
      <div>
        <EditorJs
          instanceRef={(instance) => (this.editorInstance = instance)}
          data={{
            time: 1556098174501,
            blocks: [
              {
                type: "header",
                data: {
                  text: "Editor.js",
                  level: 2,
                },
              },
              {
                type: "paragraph",
                data: {
                  text:
                    "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
                },
              },
            ],
            version: "2.12.4",
          }}
          tools={EDITOR_JS_TOOLS}
          holder="holder"
        >
          <div id="holder" contentEditable={false}></div>
        </EditorJs>
        <button onClick={() => this.handleSave(data)}>+</button>
        <BlockRenderer data={this.state.blocksData} />
      </div>
    );
  }
}

export default DG_AddPost_Editor;
