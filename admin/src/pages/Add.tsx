import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios, { AxiosError } from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

interface AddProps {
  token: string
}

interface AddProductResponse {
  success: boolean
  message: string
}

const Add: React.FC<AddProps> = ({ token }) => {
  const [image1, setImage1] = useState<File | boolean>(false)
  const [image2, setImage2] = useState<File | boolean>(false)
  const [image3, setImage3] = useState<File | boolean>(false)
  const [image4, setImage4] = useState<File | boolean>(false)

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [category, setCategory] = useState<string>('Men')
  const [subCategory, setSubCategory] = useState<string>('Topwear')
  const [bestSeller, setBestSeller] = useState<boolean>(false)
  const [sizes, setSizes] = useState<string[]>([])

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subcategory', subCategory)
      formData.append('bestseller', String(bestSeller))
      formData.append('sizes', JSON.stringify(sizes))

      if (image1 && image1 instanceof File) formData.append('image1', image1)
      if (image2 && image2 instanceof File) formData.append('image2', image2)
      if (image3 && image3 instanceof File) formData.append('image3', image3)
      if (image4 && image4 instanceof File) formData.append('image4', image4)

      const response = await axios.post<AddProductResponse>(
        backendUrl + '/api/product/add',
        formData,
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      const axiosError = error as AxiosError
      console.error(error)
      toast.error(axiosError.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor='image1'>
            <img
              className='w-20'
              src={
                !image1
                  ? assets.upload_area
                  : URL.createObjectURL(image1 as File)
              }
              alt=''
            />
            <input
              onChange={(e) => setImage1(e.target.files?.[0] || false)}
              type='file'
              id='image1'
              hidden
            />
          </label>

          <label htmlFor='image2'>
            <img
              className='w-20'
              src={
                !image2
                  ? assets.upload_area
                  : URL.createObjectURL(image2 as File)
              }
              alt=''
            />
            <input
              onChange={(e) => setImage2(e.target.files?.[0] || false)}
              type='file'
              id='image2'
              hidden
            />
          </label>

          <label htmlFor='image3'>
            <img
              className='w-20'
              src={
                !image3
                  ? assets.upload_area
                  : URL.createObjectURL(image3 as File)
              }
              alt=''
            />
            <input
              onChange={(e) => setImage3(e.target.files?.[0] || false)}
              type='file'
              id='image3'
              hidden
            />
          </label>

          <label htmlFor='image4'>
            <img
              className='w-20'
              src={
                !image4
                  ? assets.upload_area
                  : URL.createObjectURL(image4 as File)
              }
              alt=''
            />
            <input
              onChange={(e) => setImage4(e.target.files?.[0] || false)}
              type='file'
              id='image4'
              hidden
            />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className='w-full max-w-[500px] px-3 py-2'
          type='text'
          placeholder='Enter product name'
          required
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='w-full max-w-[500px] px-3 py-2'
          placeholder='Enter product description'
          required
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className='w-full px-3 py-2'
          >
            <option value='Men'>Men</option>
            <option value='Women'>Women</option>
            <option value='Kids'>Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className='w-full px-3 py-2'
          >
            <option value='Topwear'>Topwear</option>
            <option value='Bottomwear'>Bottomwear</option>
            <option value='Winterwear'>Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            className='w-full px-3 py-2 sm:w-[120px]'
            type='number'
            placeholder='25'
          />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes('S') ? prev.filter((item) => item !== 'S') : [...prev, 'S']
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes('S') ? 'bg-pink-100' : 'bg-slate-200'
              }`}
            >
              S
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes('M') ? prev.filter((item) => item !== 'M') : [...prev, 'M']
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes('M') ? 'bg-pink-100' : 'bg-slate-200'
              }`}
            >
              M
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes('L') ? prev.filter((item) => item !== 'L') : [...prev, 'L']
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes('L') ? 'bg-pink-100' : 'bg-slate-200'
              }`}
            >
              L
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes('XL')
                  ? prev.filter((item) => item !== 'XL')
                  : [...prev, 'XL']
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes('XL') ? 'bg-pink-100' : 'bg-slate-200'
              }`}
            >
              XL
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes('XXL')
                  ? prev.filter((item) => item !== 'XXL')
                  : [...prev, 'XXL']
              )
            }
          >
            <p
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes('XXL') ? 'bg-pink-100' : 'bg-slate-200'
              }`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestSeller}
          type='checkbox'
          id='bestselletr'
        />
        <label htmlFor='bestselletr' className='cursor-pointer'>
          Add to Best Sellers
        </label>
      </div>

      <button
        type='submit'
        className='w-28 py-3 mt-4 bg-black text-white cursor-pointer duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90'
      >
        ADD
      </button>
    </form>
  )
}

export default Add
