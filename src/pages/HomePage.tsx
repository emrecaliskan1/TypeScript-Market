import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductType, UserType } from '../types/Types'
import { setCurrentUser, setLoading, setProducts } from '../redux/appSlice'
import productService from '../services/ProductService'
import { toast } from 'react-toastify'
import { RootState } from '../redux/store'
import ProductCard from '../components/ProductCard'
import '../css/HomePage.css'

function HomePage() {

  const dispatch = useDispatch()
  const {products} = useSelector((state:RootState)=>state.app)

  const getAllProducts = async() => {
    try {
      dispatch(setLoading(true))
      const response:ProductType[] = await productService.getAllProducts()

      if(response){
        dispatch(setProducts(response))
      }

    } catch (error) {
      toast.error("Ürünler getirilirken hata oluştu.")
    }finally{
      dispatch(setLoading(false))
    }
  }

  useEffect(()=>{
    getAllProducts()
  },[])

  useEffect(()=>{
   const result = localStorage.getItem("currentUser")
   if(result){
      const currentUser:UserType = JSON.parse(result) as UserType
      dispatch(setCurrentUser(currentUser))
   }
  },[])


  return (
    <div className='product-div'>
      {
        products && products.map((product:ProductType,index:number)=>(
          <ProductCard key={index} product={product}></ProductCard>
        ))
      
      
      }
      </div>
  )
}

export default HomePage