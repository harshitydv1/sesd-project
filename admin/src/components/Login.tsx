import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { ToastContainer, toast } from 'react-toastify'

interface LoginProps {
  setToken: (token: string) => void
}

interface LoginResponse {
  success: boolean
  token?: string
  message: string
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const response = await axios.post<LoginResponse>(backendUrl + '/api/user/admin', {
        email,
        password,
      })

      if (response.data.success && response.data.token) {
        setToken(response.data.token)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      const axiosError = error as AxiosError
      console.log(error)
      toast.error(axiosError.message)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type='email'
              placeholder='Enter your email address'
              required
            />
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type='password'
              placeholder='Enter your password'
              required
            />
          </div>
          <button
            className='cursor-pointer mt-2 w-full py-2.5 px-5 rounded-md text-white bg-neutral-950 duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90'
            type='submit'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
