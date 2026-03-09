import React from "react";
import { assets } from "../assets/assets";

const Footer: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        <div>
          <img src={assets.logo} className="mb-5 w-32 " alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            suscipit auctor dui, sed efficitur nisi. Donec a semper dui. In hac
            habitasse platea dictumst. Donec ut ligula quis enim efficitur
            varius. Donec a semper dui. In hac habitasse platea dictumst.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-232</li>
            <li>contact@docto.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © 2024 Docto. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
