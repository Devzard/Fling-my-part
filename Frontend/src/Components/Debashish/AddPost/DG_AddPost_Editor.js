import React, { Component } from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../EditorjsPlugins/tools";
import BlockRenderer from "../BlockRenderer/BlockRenderer";
import "./dg-addpost.css";
import axios from "axios";
import { GrSend } from "react-icons/gr";
import { FaHourglassEnd, FaBackspace } from "react-icons/fa";

let data;
const path = "https://my-fling.herokuapp.com";

export class DG_AddPost_Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocksData: null,
      title: "",
      location: "",
      userId: "",
      username: "",
      name: "",
      locations: this.props.locations,
      uploadingStatus: "",
    };
    this.editorInstance = React.createRef();
  }

  async handleSave() {
    const savedData = await this.editorInstance.save();
    this.setState({ blocksData: savedData });
    this.setState({ uploadingStatus: "uploading" });

    axios
      .post(`${path}/feed/new`, {
        title: this.state.title,
        blocks: this.state.blocksData.blocks,
        location: this.state.location,
        userId: this.state.userId,
        username: this.state.username,
        name: this.state.name,
      })
      .then((res) => {
        console.log(res);
        this.props.setPosts(this.props.posts.concat(res.data));
        this.setState({ uploadingStatus: "uploaded" });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ uploadingStatus: "uploaded" });
      });
  }

  componentDidMount() {
    this.setState({
      location: this.props.userDetails.location,
      userId: this.props.userDetails.userId,
      username: this.props.userDetails.username,
      name: this.props.userDetails.name,
    });
  }

  componentDidUpdate() {
    if (this.state.uploadingStatus == "uploaded")
      this.props.toggleAddPost(false);
  }

  locationHandler = (e) => {
    this.setState({
      location: e.target.value,
    });
  };

  titleHandler = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  render() {
    return (
      <div className="dg-ap-container">
        <div className="dg-ap-header">
          <span
            onClick={() => {
              this.props.toggleAddPost(false);
            }}
          >
            <FaBackspace />
          </span>
          <span></span>
          <span></span>
        </div>
        <div className="dg-ap-form">
          <input
            onChange={this.titleHandler}
            type="text"
            minLength="1"
            placeholder="Title"
          />
          <select
            defaultValue={this.state.location}
            onChange={(e) => {
              e.persist();
              this.locationHandler(e);
            }}
          >
            {this.state.locations.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <span className="dg-ap-editor">
          <EditorJs
            instanceRef={(instance) => (this.editorInstance = instance)}
            data={this.state.blocksData}
            tools={EDITOR_JS_TOOLS}
            holder="holder"
          >
            <div id="holder" contentEditable={false}></div>
          </EditorJs>
        </span>

        <span className="dg-ap-send-btn-container">
          <button onClick={() => this.handleSave(data)}>
            {this.state.uploadingStatus == "uploading" ? (
              <span className="dg-ap-uploading">
                <FaHourglassEnd />
              </span>
            ) : (
              <span className="dg-ap-send-btn">
                <GrSend />
              </span>
            )}
          </button>
        </span>
      </div>
    );
  }
}

export default DG_AddPost_Editor;
