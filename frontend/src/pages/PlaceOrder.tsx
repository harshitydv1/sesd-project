import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

interface FormDataType {
  firstName: string
  lastName: string
  email: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

interface Product {
  _id: string
  name: string
  price: number
  size?: string
  quantity?: number
  image: string[]
}

interface OrderData {
  address: string
  items: Product[]
  amount: number
}

interface RazorpayOrder {
  id: string
  amount: number
  currency: string
  receipt: string
}

interface PaymentResponse {
  success: boolean
  session_url?: string
  order?: RazorpayOrder
  message?: string
}

interface ShopContextType {
  navigate: (path: string) => void
  backendUrl: string
  token: string
  cartItems: Record<string, Record<string, number>>
  setCartItems: (items: Record<string, Record<string, number>>) => void
  getCartAmount: () => number
  delivery_fee: number
  products: Product[]
}

declare global {
  interface Window {
    Razorpay: any
  }
}

const PlaceOrder: React.FC = () => {
  const [method, setMethod] = useState<string>('cod')
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext) as ShopContextType

  const [formData, setFormData] = useState<FormDataType>({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof FormDataType
    const value = event.target.value
    setFormData((data) => ({ ...data, [name]: value }))
  }

  const initPay = (order: RazorpayOrder) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response: any) => {
        console.log(response)
      },
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const orderItems: Product[] = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      const orderData: OrderData = {
        address: JSON.stringify(formData),
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        case 'cod': {
          const response = await axios.post<PaymentResponse>(
            backendUrl + '/api/order/place',
            orderData,
            { headers: { token } }
          )

          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            console.error(response.data.message)
          }

          break
        }

        case 'stripe': {
          const responseStripe = await axios.post<PaymentResponse>(
            backendUrl + '/api/order/stripe',
            orderData,
            { headers: { token } }
          )

          if (responseStripe.data.success && responseStripe.data.session_url) {
            window.location.replace(responseStripe.data.session_url)
          } else {
            toast.error(responseStripe.data.message || 'Payment error')
          }

          break
        }

        case 'razorpay': {
          const responseRazorpay = await axios.post<PaymentResponse>(
            backendUrl + '/api/order/razorpay',
            orderData,
            { headers: { token } }
          )

          if (responseRazorpay.data.success && responseRazorpay.data.order) {
            initPay(responseRazorpay.data.order)
          }

          break
        }

        default:
          break
      }
    } catch (error) {
      const axiosError = error as AxiosError
      console.error(error)
      toast.error(axiosError.message)
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'
    >
      {/* -----------Left Side----------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input
            required
            className='border border-gray-300 rounded py-1.5 px-3 w-full'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={formData.firstName}
            onChange={onChangeHandler}
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3 w-full'
            type='text'
            placeholder='Last Name'
            name='lastName'
            value={formData.lastName}
            onChange={onChangeHandler}
          />
        </div>
        <input
          required
          className='border border-gray-300 rounded py-1.5 px-3 w-full'
          type='email'
          placeholder='Email Address'
          name='email'
          value={formData.email}
          onChange={onChangeHandler}
        />
        <input
          required
          className='border border-gray-300 rounded py-1.5 px-3 w-full'
          type='text'
          placeholder='Street'
          name='street'
          value={formData.street}
          onChange={onChangeHandler}
        />
        <div className='flex gap-3'>
          <input
            required
            className='border border-gray-300 rounded py-1.5 px-3 w-full'
            type='text'
            placeholder='City'
            name='city'
            value={formData.city}
            onChange={onChangeHandler}
          />
          <input
            required
            className='border border-gray-300 rounded py-1.5 px-3 w-full'
            type='text'
            placeholder='State'
            name='state'
            value={formData.state}
            onChange={onChangeHandler}
          />
        </div>
        <div className='flex gap-3'>
          <input
            required
            className='border border-gray-300 rounded py-1.5 px-3 w-full'
            type='number'
            placeholder='Zip Code'
            name='zipCode'
            value={formData.zipCode}
            onChange={onChangeHandler}
          />
          <input
            required
            className='border border-gray-300 rounded py-1.5 px-3 w-full'
            type='text'
            placeholder='Country'
            name='country'
            value={formData.country}
            onChange={onChangeHandler}
          />
        </div>
        <input
          required
          className='border border-gray-300 rounded py-1.5 px-3 w-full'
          type='number'
          placeholder='Phone Number'
          name='phone'
          value={formData.phone}
          onChange={onChangeHandler}
        />
      </div>
      {/* -----------Right Side----------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-70'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* ------------------Payment Method--------------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div
              onClick={() => setMethod('stripe')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === 'stripe' ? 'bg-green-500' : ''
                }`}
              ></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt='' />
            </div>
            <div
              onClick={() => setMethod('cod')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === 'cod' ? 'bg-green-500' : ''
                }`}
              ></p>
              <p className='text-gray-500 text-500 text-sm font-medium'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
