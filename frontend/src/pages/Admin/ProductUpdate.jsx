import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteProductMutation, useGetProductByIdQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../redux/api/productsApiSlice'
import { useGetCategoriesQuery } from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'


const ProductUpdate = () => {
  const { _id } = useParams()
  const navigate = useNavigate()
  

  console.log(_id)
  return (
    <div>ProductUpdate</div>
  )
}

export default ProductUpdate