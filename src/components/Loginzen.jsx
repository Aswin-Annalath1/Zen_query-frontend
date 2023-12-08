import React from 'react'
import { useNavigate } from 'react-router-dom'

function Loginzen() {

const navigate = useNavigate()

const handlelogin = async()=>{

  // https://zenquery-backend.onrender.com
  fetch('https://zenquery-backend.onrender.com/users/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      email:document.getElementById('email').value,
      password:document.getElementById('password').value
    })
  }).then(res=>res.json())
  //Here we are trying to direct the user to his datas...(navigating..)
  .then(data=>{console.log(data)
    //when we enter correct login detail then only data._id exists..
    if(data._id!=undefined){
      //To check admin login
      if(data.role==='admin'){
        navigate("/admin")
      }else if (data.role==='staff') {
      navigate("/staff")
      }else{
      navigate("/mainpagezen/"+data._id)
      }}else {
        // Password is incorrect, show an alert
        alert('Incorrect email or password. Please try again.');
      }
    })
  navigate("/login")
}
return (
    <div className="bg-cover bg-center" style={{ backgroundImage: 'url("https://magesh.io/static/45f0705b94a4891ecd348babf1b36f28/81f49/img_1630.jpg")' }}>
      <div className="min-h-screen flex items-center justify-center">
        <div className=" bg-white bg-opacity-80 p-10 pl-20 pr-20 rounded-md shadow-md ">
          <div className="flex mb-3 ">
          <svg className="w-12 h-12 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 21">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.24 7.194a24.16 24.16 0 0 1 3.72-3.062m0 0c3.443-2.277 6.732-2.969 8.24-1.46 2.054 2.053.03 7.407-4.522 11.959-4.552 4.551-9.906 6.576-11.96 4.522C1.223 17.658 1.89 14.412 4.121 11m6.838-6.868c-3.443-2.277-6.732-2.969-8.24-1.46-2.054 2.053-.03 7.407 4.522 11.959m3.718-10.499a24.16 24.16 0 0 1 3.719 3.062M17.798 11c2.23 3.412 2.898 6.658 1.402 8.153-1.502 1.503-4.771.822-8.2-1.433m1-6.808a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
          </svg>
          <h2 className=" ml-4 text-3xl font-bold mb-4 text-green-500">ZEN Login</h2>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
              />
          </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                required
              />
              <p className="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
            <div className="flex items-center justify-between">
            <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handlelogin}>Login</button>
            </div>
          </form>
          <p className='text-xs mt-4 mb-2'>Already have an Account? <a href='/' className="text-blue-600">Go to Register Page</a></p>
          <p className=" mb-0 text-center text-gray-600 text-xs">
              &copy; 2023 <a href="https://flowbite.com/" className="hover:underline italic ">ASI™</a>. All Rights Reserved.
          </p>
        </div> 
      </div>
    </div>
)
}

export default Loginzen
