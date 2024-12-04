import { useState } from "react";
import { SoldOutTag } from "../../sold-out-tag/sold-out-tag.component";

export const ProductTile = ({ props }) => {
  const [imageSrc, setImageSrc] = useState(props.featuredImage.src);
  const soldOutTag = (
    <p className="absolute bottom-2 left-2 bg-slate-950 rounded-full w-fit text-white px-2 text-sm">
      Sold out
    </p>
  );

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
