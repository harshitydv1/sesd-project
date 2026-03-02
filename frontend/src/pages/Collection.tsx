import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { Product, ShopContextType } from '../types'

const Collection: React.FC = () => {
  const { products, search, showSearch } = useContext(ShopContext) as any

  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [filterProduct, setFilterProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<string[]>([])
  const [subCategory, setSubCategory] = useState<string[]>([])
  const [sortType, setSortType] = useState<string>('relevant')

  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value))
    } else {
      setCategory((prev) => [...prev, value])
    }
  }

  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value))
    } else {
      setSubCategory((prev) => [...prev, value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice()

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProduct.slice()

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price))
        break
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price))
        break
      default:
        applyFilter()
        break
    }
  }

  useEffect(() => {
    setFilterProducts(products)
  }, [])

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Option */}
      <div className='min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=''
          />
        </p>
        {/* Categories Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? ' ' : 'hidden'} sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value='Men'
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value='Women'
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value='Kids'
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>
        {/* SubCategories Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? ' ' : 'hidden'} sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value='Topwear'
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value='Bottomwear'
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value='winterwear'
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select
            className='border border-gray-300 text-sm px-2'
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProduct.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection
