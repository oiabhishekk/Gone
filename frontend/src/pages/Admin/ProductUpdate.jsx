import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteProductMutation, useGetProductByIdQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../redux/api/productsApiSlice'
import { useGetCategoriesQuery } from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'


const ProductUpdate = () => {
  const { _id } = useParams()
  const navigate = useNavigate()

  const { data: productData } = useGetProductByIdQuery(_id)
  const { data: categories = [] } = useGetCategoriesQuery()
  const [uploadProductImage] = useUploadProductImageMutation()
  const [updateProduct] = useUpdateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()


  const [image, setImage] = useState(productData?.image || "")
  const [name, setName] = useState(productData?.name || "")
  const [description, setDecription] = useState(productData
    ?.description || "")
  const [price, setPrice] = useState(productData?.price || "")
  const [category, setCategory] = useState(productData?.category || "")
  const [brand, setBrand] = useState(productData?.brand || "")
  const [stock, setStock] = useState(productData?.stock || "")
  const [quantity, setQuantity] = useState(productData?.quantity || "")
  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name)
      setDecription(productData.description)
      setPrice(productData.price)
      setCategory(productData.category)
      setQuantity(productData.quantity)
      setBrand(productData.brand)
      setImage(productData.image)
    }
  }, [productData])
  return (
    <div>ProductUpdate</div>
  )
}

export default ProductUpdate