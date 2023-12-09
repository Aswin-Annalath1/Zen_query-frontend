import React from 'react'
import { useNavigate } from 'react-router-dom'

function Registerzen() {

const navigate = useNavigate()

const handleregister = async() => {
  console.log('register') 
const passwordInput = document.getElementById('password');
const password = passwordInput.value;

// Check if the password meets the required condition
if (/^\d{6}$/.test(password)) {
// Password is valid //Here datas are posted to the routed Db and created _id and token and that taken...
  fetch('https://zenquery-backend.onrender.com/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {console.log(data._id);
      navigate('/mainpagezen/' + data._id);
    });
  } else {
  // Password does not meet the required condition
  alert('Password must be a 6-digit number.');
  }}

  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: 'url("/images/zenQ.jpg")',backgroundSize: '1920px 960px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
      <div className="min-h-screen flex items-center justify-center">
        <div className=" bg-white bg-opacity-10 hover:bg-opacity-70 p-10 pl-20 pr-20 rounded-md shadow-md ">
          <div className="flex mb-3 ">
          <svg className="w-12 h-12 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 21">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.24 7.194a24.16 24.16 0 0 1 3.72-3.062m0 0c3.443-2.277 6.732-2.969 8.24-1.46 2.054 2.053.03 7.407-4.522 11.959-4.552 4.551-9.906 6.576-11.96 4.522C1.223 17.658 1.89 14.412 4.121 11m6.838-6.868c-3.443-2.277-6.732-2.969-8.24-1.46-2.054 2.053-.03 7.407 4.522 11.959m3.718-10.499a24.16 24.16 0 0 1 3.719 3.062M17.798 11c2.23 3.412 2.898 6.658 1.402 8.153-1.502 1.503-4.771.822-8.2-1.433m1-6.808a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
          </svg>
          <h2 className=" ml-4 text-3xl font-bold mb-4 text-green-500">ZEN Login</h2>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
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
              <p className="text-red-500 text-xs italic">Please choose a 6-digit password.</p>
            </div>
            <div className="flex items-center justify-between">
            <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" 
              onClick={handleregister}>Register</button>
            </div>
          </form>
          <p className='text-xs mt-4 mb-2'>Already have an Account? <a href='/login' className="text-blue-600">Go to Login Page</a></p>
          <p className=" mb-0 text-center text-gray-600 text-xs">
              &copy; 2023 <a href="https://flowbite.com/" className="hover:underline italic ">ASI™</a>. All Rights Reserved.
          </p>
        </div> 
      </div>
    </div>
  )
}

export default Registerzen