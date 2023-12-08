import React from 'react'
import { useEffect, useState } from "react"
import { useNavigate} from 'react-router-dom'


function Staffzen() {
  
const [taskList, setTaskList] = useState([]);

const navigate = useNavigate()
  
//Called for Api call
    useEffect(() => {
      fetch("https://zenquery-backend.onrender.com/staff/ticket") //In FE we have to write localhost:
      .then((res) => {return res.json()})
      .then((data) => {console.log(data)

      // Filter out tasks where status is not equal to "open"
      const filteredTasks = data.filter((task) => task.status === "IN PROGRESS" || task.status === "ATTENDED");
  
        //This is to make a normal id number to store with task name...
        filteredTasks.map((task) => {
           setTaskList((taskList) => [
            ...taskList,
            {
              id: taskList.slice(-1)[0] ? taskList.slice(-1)[0].id + 1 : 1,
              name: task.name,
              query_type: task.query_type,
              status: task.status,
              assignedTo: task.assignedTo,
              phone_no: task.phone_no,
              _id: task._id,
              userID: task.userID,
            },
          ]);
        })
      })
      .catch((err) => {console.log(err)})
  
    }, []); 

//Mentor Connect with Student...
  const[show,setShow] = useState('')
  
  //Here we assaign mentor and onClick it will be submitted and ticket removed.. 
  const pageChange = (i) => {
   let index = taskList.findIndex((obj) => obj.id === i); 
   if ( index > -1 ) {
    //This is Adding to BE
    fetch("https://zenquery-backend.onrender.com/staff/"+taskList[index].userID+"/"+taskList[index]._id,{
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({})  //Whatever i write currently in FE
    })
    .then((res) => {return res.json()})
    .then((data) => {console.log(data)
    setShow(index)
    navigate("/staffnextzen/"+taskList[index].userID+"/"+taskList[index]._id);
    })
    .catch((err) => {console.log(err)})
    return;
  }
  
};

//Here wew are doing logout...
const handlelogout = async()=>{
  fetch('https://zenquery-backend.onrender.com/users/logout',{
    method:'GET',
    headers:{'Content-Type':'application/json'},
  })
  .then(res=>res.json())
  .then(data=>{console.log(data) 
    navigate("/login")})
  }


return (
  <>
    <nav className="bg-violet-700 fixed top-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-5">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        <svg className="w-10 h-10 text-green-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
        </svg>
          <span className=" self-center text-2xl font-semibold whitespace-nowrap text-white">Staff Only</span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button" className=" inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button onClick={handlelogout} className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div className=" relative overflow-x-auto shadow-md sm:rounded-lg m-32 mt-40 ">
          <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-6">
                          Student name
                      </th>
                      <th scope="col" className="px-6 py-6">
                          Phone no
                      </th>
                      <th scope="col" className="px-6 py-6">
                          Query TITLE
                      </th>
                      <th scope="col" className="px-6 py-6">
                          Status
                      </th>
                      <th scope="col" className="px-6 py-6">
                          Mentor Assigned
                      </th>
                      <th scope="col" className="px-6 py-6">
                          <span className="sr-only">Edit</span>
                      </th>
                  </tr>
              </thead>
              
              {taskList.length > 0 ? (
              taskList.map((task, index) => (
              <tbody  key={index}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {task.name}
                      </th>
                      <td className="px-6 py-4">
                          {task.phone_no}
                      </td>
                      <td className="px-6 py-4">
                          {task.query_type}
                      </td>
                      <td className="px-6 py-4">
                          {task.status}
                      </td>
                      <td className="px-6 py-4">
                          {task.assignedTo}
                      </td>
                      <td className="px-6 py-4 text-right">
                      <button onClick={() => pageChange(task.id)} type="button" className={`text-white ${show === index ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80' : 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80'} font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}>{show === index ? 'Connecting' : 'Connect ?'}</button>
                      </td>
                  </tr>
              </tbody>
               ))
              ):(
                <tbody>
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-red-600 ">
                      No Tickets Assigned.
                    </td>
                  </tr>
                </tbody>
                )}
          </table>
      </div>
      <footer className="fixed bottom-0 w-full bg-violet-700 rounded-sm shadow m-0 dark:bg-gray-800  border-1  border-violet-700 hover:shadow-lg transition duration-300 ease-in-out">
      <div className="w-full mx-auto max-w-screen-xl p-1.5 md:flex md:items-center md:justify-between ">
        <span className="text-sm text-gray-200 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline italic ">ASI™</a>. All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-200 dark:text-gray-400 sm:mt-0">
          <li>
              
          </li>
      </ul>
      </div>
  </footer>
    
  </>
  )
}
export default Staffzen