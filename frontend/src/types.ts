// Shared TypeScript types for the frontend application

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  images?: string[];
  category: string;
  subCategory: string;
  subcategory?: string;
  sizes: string[];
  bestseller?: boolean;
  date?: number;
  Date?: number;
}

export interface CartItem {
  [itemId: string]: {
    [size: string]: number;
  };
}

export interface OrderItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string[];
  size: string;
  status?: string;
  payment?: boolean;
  paymentMethod?: string;
  date?: string | number;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  amount: number;
  address: {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    phone: string;
  };
  status: string;
  paymentMethod: string;
  payment: boolean;
  date: number;
  Date?: number;
}

export interface ShopContextType {
  products: Product[];
  currency: string;
  delivery_fee: number;
  search: string;
  showSearch: boolean;
  cartItems: CartItem;
  token: string;
  backendUrl: string;
  addToCart: (itemId: string, size: string) => void;
  getCartCount: () => number;
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
  getCartAmount: () => number;
  getProductsData: () => Promise<void>;
  getUserCart: (token: string) => Promise<void>;
  setSearch: (search: string) => void;
  setShowSearch: (show: boolean) => void;
  navigate: (path: string) => void;
  setToken: (token: string) => void;
  setCartItems: (items: CartItem) => void;
}
