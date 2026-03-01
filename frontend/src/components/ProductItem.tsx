import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

interface ProductItemProps {
  id: string;
  image: string | string[];
  name: string;
  price: number;
}

const ProductItem: React.FC<ProductItemProps> = ({ id, image, name, price }) => {
  const shopContext = useContext(ShopContext) as any;
  const { currency } = shopContext;
  const productImage = Array.isArray(image) ? image[0] : image;

  return (
    <div>
      <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
        <div className="overflow-hidden">
          <img
            className="hover:scale-110 transition ease-in-out"
            src={productImage || ""}
            alt=""
          />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </Link>
    </div>
  );
};

export default ProductItem;
