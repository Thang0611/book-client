import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import Detail from '../page/Detail';

function Books() {

    const setHeader=()=>{
        let token = localStorage.getItem('token');
        return { headers: {"Authorization" : `Bearer ${token}`} }
    }
    const navigate=useNavigate()
    const [books, setBooks] = useState([])
    // axios.defaults.withCredentials = true
    const URLBase = 'http://localhost:3000/book'

    const handleDetail=(id)=>{
        axios.get(`${URLBase}/${id}`)
        .then(res=>{
            console.log('detail')
            navigate('/detail',{ state: { id: id}} )
        })
        .catch(err=>console.log(err))
    }

    const handleLogout = () => {
        axios.get(`${URLBase}/logout`)
        .then((res)=>
            navigate('/')
        )
        .catch(err=>{
            console.log(err)
        })
    }


    const deleteBook = (id) => {
        console.log(id)
        // let token = localStorage.getItem('token')
        axios.delete(`${URLBase}/${id}`,setHeader())
            .then(res => {
                console.log('ban da xoa sach')
                getAll()
            })
            .catch(err => {
                console.log(err)
            })
    }


    const checkDelete = (bookId) => {
        if (window.confirm("Bấm Ok để tiếp tục xóa") === true) {
            deleteBook(bookId)
        }
        else {
            console.log("Huy Xoa")
        }

    }


    const handleAdd = () => {
        navigate('/detail')
        // axios.delete(`${URLBase}/delete-book/${bookId}`)
        //     .then((res) => {
        //         console.log(res.data)
        //         setBooks(res)
        //         getAll()
        //     })
        //     .catch(err => console.log(err))
    }


    async function getAll() {
        axios.get(`${URLBase}/`)
            .then((res) =>{
                console.log(res.data);
                setBooks(res.data)
            }
            )
            .catch(err => {
                console.log(err)
            })
    }


    useEffect(() => {
        getAll()
    }, [])


    return (
        <div className='bg-slate-200 min-h-screen relative '>
            <div>
                <h1 className='font-serif font-bold text-3xl pt-8 pb-12 text-center'>Books List</h1>
            </div>
            <Link className='absolute top-0 right-0 px-3 py-2 m-2 bg-blue-500 mr-5 rounded-md' ><button onClick={()=>handleLogout()}>Logout</button></Link>
            <div className='flex justify-center'>
                <button  className='px-3 py-2 bg-green-600 m-2 rounded-md' onClick={()=>handleAdd()} >Add Book</button>
            </div>
            <div className='w-full flex justify-center'>



                {<div className=' max-w-4xl flex flex-row justify-center bg-slate-300 ' >
                    <table className='table-auto'>
                        <thead className='bg-cyan-700'>
                            <tr>
                                <th>Tiêu đề </th>
                                <th>Tác giả</th>
                                <th>Năm phát hành</th>
                                <th>Thể loại</th>
                                <th>Số trang</th>
                                <th>Số lượng</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books.map((book) => (
                                    <tr key={book.id}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.date}</td>
                                        <td>{book.category}</td>
                                        <td>{book.numOfPage}</td>
                                        <td>{book.amount}</td>
                                        <td>
                                            <button className='px-2 py-1 bg-green-700 m-2 ' type='button' onClick={()=>handleDetail(book.id)}>View</button>
                                            <button className='px-2 py-1 bg-red-700 m-2' type='button' onClick={() => checkDelete(book.id) }>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
                }
            </div>
        </div>


    )
}

export default Books