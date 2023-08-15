"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Editor from "./components/Editor";

export default function Home() {
  const [files, setFiles] = useState(null);
  const [images, setImages] = useState(
    "https://assets.selfstorageauction.com/images/Auction/340014/340014-photo-5-5EC.jpg"
  );
  const [blobb, setBlobb] = useState(null);
  const [inlineResult, setInlineResult] = useState("");

  // modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalResult, setModalResult] = useState("");

  // overlay
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayResult, setOverlayResult] = useState({
    imagePreview: "./image.jpeg",
    imageState: undefined,
  });

  const pondRef = useRef();
  console.log({ files });
  console.log(pondRef?.current?.getFile());
  console.log({ images });
  const uploadImage = async (e) => {
    const uploadedFiles = pondRef.current.getFiles();

    if (uploadedFiles.length === 0) {
      return;
    }

    const formData = new FormData();

    uploadedFiles.forEach((file) => {
      formData.append("image", file.file);
    });

    // formData.append("image", e.target.files[0]);

    try {
      await axios.post("http://localhost:3001/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const getImage = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/images/64d7cce5a9d2e7a17bc1f3d5",
        {
          responseType: "arraybuffer", // Treat response as binary data
        }
      );

      console.log("response ::", response?.data?.name);
      const blob = new Blob([response.data], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob);
      console.log({ imageUrl });
      setImages(imageUrl);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    console.log("mnb", images);
    images !== "" &&
      images !== undefined &&
      fetch(images)
        .then((response) => response.blob())
        .then((blob) => {
          // Now you have the image data as a Blob
          console.log("Blob:", blob);

          // You can do something with the Blob, such as displaying it
          // imageElement.src = URL.createObjectURL(blob);
          // document.body.appendChild(imageElement);
          setBlobb(URL.createObjectURL(blob));
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
  }, [images]);
  return (
    <>
      <div>
        {/* <input type="file" onChange={(e) => setFiles(e.target.files[0])} /> */}
        <button onClick={uploadImage}>upload</button>
        <FilePond
          ref={pondRef}
          allowMultiple={true}
          acceptedFileTypes={["image/*"]} // Only allow image files
          server={uploadImage}
        />
        <button onClick={getImage}>get</button>
        {/* {images?.map((image) => (
          <img
            key={image._id}
            src={`/api/images/${image._id}`}
            alt={image.name}
            style={{ maxWidth: "200px", margin: "10px" }}
          />
        ))} */}
        <img height={400} width={400} src={images} />
      </div>
      {}
      {blobb !== null && <Editor images={blobb} />}
    </>
  );
}
