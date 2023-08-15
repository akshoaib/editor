import React, { useEffect, useState } from "react";
import { pintura } from "../pintura/packages/pintura/pintura.module.css";

// react-pintura
import {
  PinturaEditor,
  PinturaEditorModal,
  PinturaEditorOverlay,
} from "../pintura/packages/react-pintura";
// Import FilePond styles

// Import the image preview plugin
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Register the image preview plugin
import {
  // editor
  locale_en_gb,
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultShapePreprocessor,

  // plugins
  setPlugins,
  plugin_crop,
  plugin_crop_locale_en_gb,
  plugin_finetune,
  plugin_finetune_locale_en_gb,
  plugin_finetune_defaults,
  plugin_filter,
  plugin_filter_locale_en_gb,
  plugin_filter_defaults,
  plugin_annotate,
  plugin_annotate_locale_en_gb,
  markup_editor_defaults,
  markup_editor_locale_en_gb,
} from "../pintura/packages/pintura/pintura";
import { Modal } from "react-bootstrap";

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);
const editorDefaults = {
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  shapePreprocessor: createDefaultShapePreprocessor(),
  ...plugin_finetune_defaults,
  ...plugin_filter_defaults,
  ...markup_editor_defaults,
  locale: {
    ...locale_en_gb,
    ...plugin_crop_locale_en_gb,
    ...plugin_finetune_locale_en_gb,
    ...plugin_filter_locale_en_gb,
    ...plugin_annotate_locale_en_gb,
    ...markup_editor_locale_en_gb,
  },
};
const Editor = ({ images }) => {
  const [inlineResult, setInlineResult] = useState("");
  const [modalVisible, setModalVisible] = useState(true);
  const [modalResult, setModalResult] = useState("");
  //   const [myImage,setMy]

  console.log("editor:: ", { modalVisible });
  useEffect(() => {
    setModalVisible(true);
  }, [images]);

  return (
    <>
      {/* <Modal show={true}>
        <Modal.Body>
          <PinturaEditor
            {...editorDefaults}
            className={pintura}
            src={images}
            onLoad={(res) => {
              console.log("load inline image", res);
            }}
            onProcess={({ dest }) => {
              setInlineResult(URL.createObjectURL(dest));
            }}
          />
        </Modal.Body>
      </Modal> */}
      {modalVisible && (
        <PinturaEditorModal
          {...editorDefaults}
          className={pintura}
          src={images}
          onLoad={(res) => console.log("load modal image", res)}
          onHide={() => setModalVisible(false)}
          onProcess={({ dest }) => setModalResult(URL.createObjectURL(dest))}
        />
      )}
      {!!modalResult.length && (
        <p>
          <img src={modalResult} alt="" />
        </p>
      )}
      {/* <PinturaEditor
          {...editorDefaults}
          className={pintura}
          src={images}
          onLoad={(res) => {
            console.log("load inline image", res);
          }}
          onProcess={({ dest }) => {
            setInlineResult(URL.createObjectURL(dest));
          }}
        /> */}

      {/* {!!inlineResult.length && (
        <p>
          <img src={inlineResult} alt="" />
        </p>
      )} */}
    </>
  );
};

export default Editor;
