import React, { useState, useContext } from "react";
import { ImageContext } from "../App";
import Image from "./Image";
import Skeleton from "./Skeleton";
import Popup from "./imageModel";

const Images = () => {
  const { photos, isLoading } = useContext(ImageContext);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const openPopup = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
  };

  const closePopup = () => {
    setSelectedImageUrl(null);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-10 max-w-7xl mx-auto px-4 mt-[180px]">
        {isLoading ? (
          <Skeleton item={10} />
        ) : (
          photos.map((data, key) => (
            <Image
              key={key}
              data={data}
              onClick={() => openPopup(data.urls.small)}
            />
          ))
        )}
      </div>
      {photos.length === 0 && (
        <>
          <p className=" text-3xl text-red-600 text-center">No Data Found</p>
          <p className=" text-lg text-center mt-3">please search another photo</p>
        </>
      )}
      {selectedImageUrl && (
        <Popup imageUrl={selectedImageUrl} onClose={closePopup} />
      )}
    </>
  );
};

export default Images;
