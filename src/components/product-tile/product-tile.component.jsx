import { useState } from "react";
import { SoldOutTag } from "../sold-out-tag/sold-out-tag.component";

export const ProductTile = ({ props }) => {
  const [imageSrc, setImageSrc] = useState(props.featuredImage.src);

  // Ran into some trouble locating a second image for any of the
  // products in the hydrogen and neon collections
  // I've created some checks and logic that would provide the feature requested
  // if a second image is available

  const hasTouchSupport = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };

  const hasSecondImage = () => {
    return (
      props.images.edges.length > 1 &&
      props.images.edges[1].node.src !== imageSrc
    );
  };

  const mouseEnterHandler = () => {
    if (hasSecondImage() && !hasTouchSupport()) {
      setImageSrc(props.images.edges[1].node.src);
      return;
    }
  };

  const mouseLeaveHandler = () => {
    if (hasSecondImage() && !hasTouchSupport()) {
      setImageSrc(props.featuredImage.src);
    }
  };

  //   Didn't create a separate component for the new price title
  //   as the use case for this only seemed relevant to the product tile component.
  //   Could be exported to a separate component for style reasons,
  //   however it seems more practical to contain it within the component that uses it

  const isOnSale =
    props.priceRange.maxVariantPrice.amount !==
    props.variants.edges[0].node.price.amount;

  const newPrice = (
    <p>
      <s>${props.priceRange.maxVariantPrice.amount}</s>{" "}
      <span className="text-red-600">
        ${props.variants.edges[0].node.price.amount}
      </span>
    </p>
  );

  return (
    <div
      className="flex flex-col w-300 h-500"
      onMouseEnter={() => {
        mouseEnterHandler();
      }}
      onMouseLeave={() => {
        mouseLeaveHandler();
      }}
    >
      <div className="border-2 border-solid border-slate-200 relative w-full h-400">
        <img
          src={imageSrc}
          alt={props.featuredImage.altText}
          className="w-full h-full"
        />
        {props.totalInventory === 0 && <SoldOutTag />}
      </div>
      <h3>{props.title}</h3>
      {isOnSale ? newPrice : <p>${props.priceRange.maxVariantPrice.amount}</p>}
    </div>
  );
};
