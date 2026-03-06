import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

interface LoginResponse {
  success: boolean
  token?: string
  message: string
}

interface ShopContextType {
  token: string
  setToken: (token: string) => void
  navigate: (path: string) => void
  backendUrl: string
}

const Login: React.FC = () => {
  const [currentState, setCurrentState] = useState<'Login' | 'Sign Up'>('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext) as ShopContextType
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post<LoginResponse>(
          backendUrl + '/api/user/register',
          { name, email, password }
        )

        if (response.data.success && response.data.token) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post<LoginResponse>(
          backendUrl + '/api/user/login',
          { email, password }
        )

        if (response.data.success && response.data.token) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError
      console.log(error)
      toast.error(axiosError.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col items-center w-[-90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
      >
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5] w-8 bg-gray-800' />
        </div>
        {currentState === 'Login' ? null : (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className='border border-gray-800 w-full py-2 px-3 rounded-sm'
            type='text'
            placeholder='Name'
            required
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className='border border-gray-800 w-full py-2 px-3 rounded-sm'
          type='email'
          placeholder='Email'
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className='border border-gray-800 w-full py-2 px-3 rounded-sm'
          type='password'
          placeholder='Password'
          required
        />
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot Password?</p>
          {currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>
              Create Account
            </p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>
              Login Here
            </p>
          )}
        </div>
        <button className='duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90 cursor-pointer bg-black text-white font-light px-8 py-2 mt-4'>
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Login
