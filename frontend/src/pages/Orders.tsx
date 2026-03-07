import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios, { AxiosError } from 'axios'

interface OrderItem {
  _id: string
  name: string
  price: number
  quantity: number
  size: string
  image: string[]
  status: string
  payment: boolean
  paymentMethod: string
  date: string
}

interface Order {
  items: Array<{
    name: string
    price: number
    quantity: number
    size: string
    image: string[]
  }>
  status: string
  payment: boolean
  paymentMethod: string
  date: string
  Date?: string
}

interface OrderResponse {
  success: boolean
  orders: Order[]
  message?: string
}

interface ShopContextType {
  backendUrl: string
  token: string
  currency: string
}

const Orders: React.FC = () => {
  const { backendUrl, token, currency } = useContext(ShopContext) as ShopContextType

  const [orderData, setOrderData] = useState<OrderItem[]>([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post<OrderResponse>(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        const allOrdersItem: OrderItem[] = []
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            const orderItem = item as unknown as OrderItem
            orderItem.status = order.status
            orderItem.payment = order.payment
            orderItem.paymentMethod = order.paymentMethod
            orderItem.date = order.date || order.Date || ''
            allOrdersItem.push(orderItem)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      const axiosError = error as AxiosError
      console.error(axiosError)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='border-t pt-6'>
      <div>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className='py-4 border-t border-b text-gray-700 flex md:flex-row md:items-center md:justify-between gap-4'
          >
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt='' />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-gray-700'>
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Qty: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-1'>
                  Date:{' '}
                  <span className='text-gray-400'>
                    {item.date ? new Date(item.date).toDateString() : 'N/A'}
                  </span>
                </p>
                <p className='mt-1'>
                  Payment: <span className='text-gray-400'>{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-based'>{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className='border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer'
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
