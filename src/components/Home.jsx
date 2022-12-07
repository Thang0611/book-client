import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { Link , useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";
// import { useCookies } from '@js-smart/react-cookie-service';
// import Detail from '../page/Detail';

function Home() {
  const navigate=useNavigate();
    const { deleteCookie, deleteAllCookies } = useCookies();
  const [books, setBooks] = useState([]);
  // axios.defaults.withCredentials = true
  const URLBase = "http://localhost:3000/book";
  const handleLogout=()=>{
      axios.get(`${URLBase}/logout`)
      .then(res=>{
        console.log(res)
        setBooks([])
        
      })
      .catch(err=>{
        console.log(err)
      })
  }
  async function getAll() {
    axios
      .get(`${URLBase}`)
      .then(
        (res) => {
          // console.log(res)
          setBooks(res.data)
          // console.log(books)
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAll();
  }, []);
  return (
    <div className="bg-slate-200 min-h-screen relative ">
      <div>
        <h1 className="font-serif font-bold text-3xl pt-8 pb-12 text-center">
          Books List
        </h1>
      </div>
      <Link
        className="absolute top-0 right-0 px-3 py-2 m-2 bg-blue-500 mr-5 rounded-md"
        to={"/login"}
      >
        <button>Login</button>
        
      </Link>
      

      <div className="w-full flex justify-center">
        {
          <div className=" max-w-4xl flex flex-row justify-center bg-slate-300 ">
            <table className="table-auto">
              <thead className="bg-cyan-700">
                <tr>
                  <th>Tiêu đề </th>
                  <th>Tác giả</th>
                  <th>Năm phát hành</th>
                  <th>Thể loại</th>
                  <th>Số trang</th>
                  <th>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.date}</td>
                    <td>{book.category}</td>
                    <td>{book.amount}</td>
                    <td>{book.numOfPage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
}

export default Home;
