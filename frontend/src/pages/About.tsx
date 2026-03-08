import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About: React.FC = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online.Our journey began with a
            simple idea: to provide platform where customers can easily discover
            ,explore and purchase products from a wide range of categories from
            the comfort oftheir homes.
          </p>
          <p>
            Since our founding in 2020, we've been committed to bringing the
            best products and services to our customers.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p className="mt-2">
            Our mission is to create a seamless and enjoyable shopping
            experience for our customers. We strive to offer a diverse selection
            of high-quality products at competitive prices, while providing
            exceptional customer service and support.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            All our products are carefully selected and tested to ensure the
            highest quality standards.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            With our user-friendly interface and fast delivery options, shopping
            with us is a breeze.{" "}
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Support:</b>
          <p className="text-gray-600">
            Our dedicated customer support team is available 24/7 to assist you
            with any questions or concern.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
