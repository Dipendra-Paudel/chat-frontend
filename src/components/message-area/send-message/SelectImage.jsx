import React, { useRef } from "react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import CloseIcon from "@mui/icons-material/Close";
import imageValidator from "../../../utils/imageValidator";

export const SelectedImagePreview = ({ image, setImage }) => {
  return (
    <div className="px-4">
      <div className="relative">
        <div
          className="w-5 h-5 flex items-center justify-center cursor-pointer hover:bg-red-500 absolute left-40 transform -translate-x-1/2 -translate-y-1/2 bg-red-400 rounded-full"
          onClick={() => setImage("")}
        >
          <CloseIcon style={{ fontSize: "14px" }} className="text-white" />
        </div>
        <img src={URL.createObjectURL(image)} alt="" className="w-40 h-40" />
      </div>
    </div>
  );
};

const SelectImage = ({ image, setImage }) => {
  const imageField = useRef();

  const handleImageChange = async (event) => {
    const selectedFile = event.target.files[0];

    const isFileValidImage = await imageValidator(selectedFile);
    if (isFileValidImage) {
      setImage(selectedFile);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={imageField}
        onChange={handleImageChange}
      />

      <ImageOutlinedIcon
        onClick={() => imageField.current.click()}
        className="send-message-icon cursor-pointer hover:text-gray-600"
      />
    </div>
  );
};

export default SelectImage;
