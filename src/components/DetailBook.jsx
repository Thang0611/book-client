import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function DetailBook() {
  const URLBase = 'http://localhost:3000/book'
  const navigate =useNavigate()
    const [add,setAdd]=useState(false)
    const [edit,setEdit]=useState(true)
    const [save,setSave]=useState(false)
    const [cancel,setCancel]=useState(false)
    const [effect,setEffect]=useState('pointer-events-none')
    const [bookDetail,setBookDetail]=useState('')
    const {state}=useLocation()
    const [picture,setPicture] =useState(null)
    const [imgData,setImgData] =useState(null)
    const [input,setInput]=useState({})
    const [err,setError]=useState('')
    const params=useParams()

    const handleChange = e => setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  
    const setHeader=()=>{
      let token = localStorage.getItem('token');
      return { headers: {"Authorization" : `Bearer ${token}`} }
  }

    const onChangePicture = e => {
      if (e.target.files[0]) {
        
        setPicture(e.target.files[0]);
        const reader = new FileReader();
        
        reader.addEventListener("load", () => {
          console.log(reader.result)
          setImgData(reader.result);
          setInput(prevState => ({ ...prevState, image : reader.result }))
        });
        reader.readAsDataURL(e.target.files[0]);
        
      
      }
    }
  const handleCancel=()=>{
    setInput(
      {
        author: bookDetail.author,
        date:bookDetail.date,
        detail:bookDetail.detail,
        numOfPage: bookDetail.numOfPage,
        title: bookDetail.title,
        type: bookDetail.type,
        urlImage:  bookDetail.urlImage
      })
  }
  // const handleAdd=async (input)=>{
  //   console.log(input)
  //   await axios.post(`${URLBase}`,input,setHeader())
  //   .then(res=>{
  //     alert('Thêm sách thành công')
  //   })
  //   .catch(err=>{
  //     console.log(err)
  //     setError(err.response.data.message||err.response.data.message[0])
  //   })

  // }
  const handleAdd=async (input)=>{
    let formData = new FormData();
    // formData.append('image', picture, picture.name)
    formData.append('image', picture)
    formData.append("title", input.title||null);
    formData.append("author", input.author||null);
    formData.append('category', input.category||null);
    formData.append('date', input.date||null);
    formData.append('numOfPage', input.numOfPage||null);
    formData.append('decription', input.decription||null);
    formData.append('amount', input.amount||null);
    console.log(input)
    axios.post(`${URLBase}`,formData,setHeader())
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      setError(err.response.data.message||err.response.data.message[0])
      console.log(err)
    })
  }

  const handleSave=(input)=>{
    setEffect(' pointer-events-none ')
    setEdit(true)
    setSave(false)
    setCancel(false)
  }

  const handleEdit=()=>{
    setEffect(' ')
    setEdit(false)
    setSave(true)
    setCancel(true)
  }


  // axios.defaults.withCredentials = true

 
  const getDetail=()=>{
    axios.get(`${URLBase}/${state.id}`)
    .then(res=>{
      console.log(res.data)
      setBookDetail(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    if (state){
      if(state.id){
        getDetail()
        console.log('add1')
      }
    }
    else {
        setEdit(false)
        setAdd(true)
        setEffect(" ")
      // handleEdit()
    }
  },[state])

  // useEffect(() => {
  //   if(edit){
  //     setInput({author: bookDetail.author,
  //               date:bookDetail.date,
  //               detail:bookDetail.detail,
  //               numOfPage: bookDetail.numOfPage,
  //               title: bookDetail.title,
  //               type: bookDetail.type,
  //               urlImage:  bookDetail.urlImage
  //             })
  //           }
  // }, [edit])

  return (
    <div className='flex flex-row w-screen h-screen '>
       <div className='bg-slate-200 w-1/2 '>
        <div className='flex flex-row ml-14 py-5'>
        <div>
          <p className=' text-xl'>Tiêu đề</p>
          <input className={' h-8 w-96 px-2 py-1 rounded-md '+(effect)} type="text" name="title" id="title" value={input.title||bookDetail.title||''} onChange={handleChange}/>
        </div>
        </div>

        <div className='flex flex-row ml-14 py-5'>
        
        <div>
          <p className=' text-xl' >Tác giả</p>
          <input className={' h-8 w-96 px-2 py-1 rounded-md '+ (effect)}  type="text" name="author" id="author" value={input.author||bookDetail.author||''} onChange={handleChange}/>
        </div>
        </div>
        
        <div className='flex flex-row justify-around py-5'>
        <div>
          <p className=' text-xl' >Số trang</p>
          <input className={' h-8 w-60 px-2 py-1 rounded-md '+(effect)}  type="number" name="numOfPage" id="numOfPage" value={input.numOfPage||bookDetail.numOfPage||''} onChange={handleChange}/>
        </div>
        <div>
          <p className=' text-xl' >Năm xuất bản</p>
          <input className={' h-8 w-60 px-2 py-1 rounded-md '+(effect)} type="date" name="date" id="date" value={input.date||bookDetail.data||''}  onChange={handleChange}/>
        </div>
        </div>
        <div className='flex flex-row justify-around py-5'>
        <div>
          <p className=' text-xl' >Thể loại</p>
          <input className={' h-8 w-60 px-2 py-1 rounded-md '+(effect)} type="text" name="category" id="category" value={input.category||bookDetail.category||''} onChange={handleChange}/>
        </div>
        <div>
          <p className=' text-xl' >Số lượng</p>
          <input className={' h-8 w-60 px-2 py-1 rounded-md '+(effect)} type="number" name="amount" id="amount" value={input.amount||bookDetail.amount||''} onChange={handleChange}/>
        </div>

        </div>
        <div className=' mx-14 py-5 w-4/6'>
        <div>
          <p className=' text-xl' >Mô tả</p>
          <textarea className={' h-8 w-96 h-20 px-2 py-1 rounded-md '+(effect)} type="text" name="decription" id="decription" value={input.decription||bookDetail.decription||''} onChange={handleChange}></textarea>
        </div>
        </div>


        <div className='mx-14 py-5 text-red-600 text-[18px]'>
             {err&&<div>{err}</div>}
        </div>
        
       </div> 
       <div className='bg-slate-200 w-1/2 flex flex-col items-center relative'>
          <input className={'py-6 '+(effect)} type="file" name="file" id="file" accept='image/*'  onChange={onChangePicture}/>
          <div className='w-3/4 bg-slate-100 object-contain'>
              {/* <div className="flex justify-center"> */}
                  <img className='object-fit'  src={bookDetail.image?.url||imgData} />
              {/* </div> */}
          </div>
        </div>
        {add&&<div>
        <button className='bg-green-500 w-20 h-10 rounded-md absolute bottom-9 right-40' value="Add" onClick={()=>handleAdd(input)}>Add</button>
        <button className='bg-green-500 w-20 h-10 rounded-md absolute bottom-9 right-10 ' type='submit' value="Cancel" onClick={()=>handleCancel()}>Cancel</button>
        </div>}
        {edit&&<div>
        <button className='bg-green-500 w-20 h-10 rounded-md absolute bottom-9 right-10' value="Edit" onClick={()=>handleEdit()}>Edit</button>
        </div>}
        {save&&<div>
          <button className='bg-green-500 w-20 h-10 rounded-md absolute bottom-9 right-10 ' type='submit' value="Cancel" onClick={()=>handleCancel()}>Cancel</button>
        <button className='bg-green-500 w-20 h-10 rounded-md absolute bottom-9 right-40' type="button" value="Save" onClick={()=>handleSave(input)}>Save</button>
        </div>}
        
    </div>
    
  )
}

export default DetailBook