import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

interface ShopContextType {
  navigate: (path: string) => void;
  token: string;
  setCartItems: (items: Record<string, unknown>) => void;
  backendUrl: string;
}

const Verify: React.FC = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(
    ShopContext
  ) as ShopContextType;
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async (): Promise<void> => {
    try {
      if (!token) {
        return;
      }
      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div></div>;
};

export default Verify;
