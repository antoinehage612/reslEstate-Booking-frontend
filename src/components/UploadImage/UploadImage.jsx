import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Button, Group } from "@mantine/core";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { createResidency } from "../../utils/api";
import app from "../../../firebase";

const UploadImage = ({ nextStep, prevStep }) => {
  const [imageURL, setImageURL] = useState(null);
  const fileRef = React.useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageURL(imageUrl);
    } else {
      setImageURL(null);
    }
  };

  const handleNext = async () => {
    if (!imageURL || !fileRef.current || !fileRef.current.files[0]) {
      console.error("No file selected");
      return;
    }

    const file = fileRef.current.files[0];
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { img: downloadURL };
          createResidency(product)
            .then(() => {
              nextStep();
            })
            .catch((error) => {
              console.error("Error creating residency:", error);
            });
        });
      }
    );
  };

  return (
    <div className="flexColCenter uploadWrapper">
      {!imageURL ? (
        <div className="flexColCenter uploadZone">
          <label htmlFor="file-upload">
            <AiOutlineCloudUpload size={50} color="grey" />
            <span>Upload Image</span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            ref={fileRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="uploadedImage">
          <img src={imageURL} alt="" />
        </div>
      )}

      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!imageURL}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
