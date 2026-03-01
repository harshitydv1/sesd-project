import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

interface Product {
  _id: string;
  category: string;
  subCategory: string;
  image: string | string[];
  name: string;
  price: number;
}

interface RelatedProductProps {
  category: string;
  subCategory: string;
}

const RelatedProduct: React.FC<RelatedProductProps> = ({
  category,
  subCategory,
}) => {
  const shopContext = useContext(ShopContext) as any;
  const { products } = shopContext;
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      productsCopy = productsCopy.filter((item) => item.category === category);
      productsCopy = productsCopy.filter(
        (item) => item.subCategory === subCategory
      );

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {related.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
