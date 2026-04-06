import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

interface OrdersProps {
  token: string
}

interface OrderItem {
  _id?: string
  name: string
  quantity: number
  size: string
}

interface OrderAddress {
  firstName: string
  lastName: string
  street: string
  city: string
  state: string
  country: string
  zipCode: string
  phone: string
}

interface Order {
  _id: string
  items: OrderItem[]
  amount: number
  status: string
  payment: boolean
  paymentMethod: string
  date: string
  Date?: string
  address: string
}

interface OrdersResponse {
  success: boolean
  orders: Order[]
  message?: string
}

interface StatusResponse {
  success: boolean
  message?: string
}

const Orders: React.FC<OrdersProps> = ({ token }) => {
  const [orders, setOrders] = useState<Order[]>([])

  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }

    try {
      const response = await axios.post<OrdersResponse>(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      )
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      const axiosError = error as AxiosError
      toast.error(axiosError.message)
    }
  }

  const statusHandler = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    orderId: string
  ) => {
    try {
      const response = await axios.post<StatusResponse>(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      )
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      const axiosError = error as AxiosError
      console.log(error)
      toast.error(axiosError.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <h3>Orders</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
            key={index}
          >
            <img className='w-12' src={assets.parcel_icon} alt='' />
            <div>
              <div>
                {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return (
                      <p className='py-0.5' key={idx}>
                        {item.name} x {item.quantity} <span> {item.size} </span>
                      </p>
                    )
                  } else {
                    return (
                      <p className='py-0.5' key={idx}>
                        {item.name} x {item.quantity} <span> {item.size} </span> ,
                      </p>
                    )
                  }
                })}
              </div>
              <p className='mt-3 mb-2 font-medium'>
                {(JSON.parse(order.address) as OrderAddress).firstName +
                  ' ' +
                  (JSON.parse(order.address) as OrderAddress).lastName}
              </p>
              <div>
                <p>{(JSON.parse(order.address) as OrderAddress).street + ','}</p>
                <p>
                  {(JSON.parse(order.address) as OrderAddress).city +
                    ', ' +
                    (JSON.parse(order.address) as OrderAddress).state +
                    ', ' +
                    (JSON.parse(order.address) as OrderAddress).country +
                    ', ' +
                    (JSON.parse(order.address) as OrderAddress).zipCode}
                </p>
              </div>
              <p>{(JSON.parse(order.address) as OrderAddress).phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
              <p className='mt-3'>Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date:{new Date(order.date || order.Date || '').toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className='p-2 font-semibold'
            >
              <option value='Order Placed'>Order Placed</option>
              <option value='processing'>Processing</option>
              <option value='shipped'>Shipped</option>
              <option value='Out for delivery'>Out for delivery</option>
              <option value='delivered'>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
