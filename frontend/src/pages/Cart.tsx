import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

interface CartItem {
  _id: string
  size: string
  quantity: number
}

interface ProductData {
  _id: string
  name: string
  price: number
  image: string[]
}

interface ShopContextType {
  products: ProductData[]
  currency: string
  cartItems: Record<string, Record<string, number>>
  updateQuantity: (id: string, size: string, quantity: number) => void
  navigate: (path: string) => void
}

const Cart: React.FC = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext) as ShopContextType

  const [cartData, setCartData] = useState<CartItem[]>([])

  useEffect(() => {
    if (products.length > 0) {
      const tempData: CartItem[] = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id)
          if (!productData) return null
          return (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
            >
              <div className='flex items-center gap-6'>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt='' />
                <div>
                  <p className='text-xm sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-1'>
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className='border max-w-10 sm:max-w-20 px-1 py-1'
                type='number'
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className='w-4 mr-4 sm:w-5 cursor-pointer'
                src={assets.bin_icon}
                alt=''
              />
            </div>
          )
        })}
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate('/place-orders')}
              className='bg-black text-white text-sm my-4 px-8 py-3'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
