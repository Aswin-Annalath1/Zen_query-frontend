import React from 'react'
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'


function Staffnextzen() {
  
  const [taskList, setTaskList] = useState([]);

// //This is to fetch userid and id from url and paste it...
  const {userid,id}=useParams()


// Function to generate HTML for each comment
  const renderComments = (comments) => {
    return comments.map((comment, index) => (
        <div key={index} className="p-1 m-1 border border-violet-500 bg-violet-200 hover:bg-violet-100 rounded-md">
            <div className="p-1">
              <div className="mb-1 text-xs text-gray-400 sm:order-last sm:mb-0 font-style: italic ">{comment.username}</div>
              <div className="flex justify-between items-center">
                  <div>{comment.content}</div>
                  <div className="flex ">
                    <time className="mb-1 ml-10 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{comment.createdAt}</time>  
                  </div>
              </div>
            </div>
          </div>
    ));
  };
  
//Called for Api call
    useEffect(() => {
      fetch("https://zenquery-backend.onrender.com/ticket/"+userid+"/"+id) //In FE we have to write localhost:
      .then((res) => {return res.json()})
      .then((data) => {console.log(data)
  
        //This is to make a normal id number to store with task name...
          const task = data; // Assuming data is a single task

            const formattedComments = task.comments.map((comment) => {
            const createdAtDate = new Date(comment.createdAt);
            return {
              content: comment.content,
              username: comment.username,
              createdAt: createdAtDate.toLocaleString('en-IN', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              }),
            };
            });

          const taskCreatedAtDate = new Date(task.createdAt);
          const formattedTaskCreatedAt = taskCreatedAtDate.toLocaleString('en-IN', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          });

           setTaskList([
            {
              time: formattedTaskCreatedAt, // Use the formatted createdAt of the task as id
              name: task.name,
              query_type: task.query_type,
              discription: task.discription,
              status: task.status,
              assignedTo: task.assignedTo,
              phone_no: task.phone_no,
              timecomment: formattedComments,
              username: formattedComments.map((comment) => comment.username),
              comments: formattedComments.map((comment) => comment.content),
              _id: task._id,
              userID: task.userID,
            },
          ]);
      })
      .catch((err) => {console.log(err)})
  
    }, []); 

//Add a Comment...
  const[text,setText] = useState('')

  const handleTextchange = (event) => {
  setText(event.target.value);
  }

  const addComment = () => {
  if (!!text ) {
    //This is Adding to BE
    fetch("https://zenquery-backend.onrender.com/staff/"+userid+"/"+id,{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ content: text})  //Whatever i write currently in FE
    })
    .then((res) => {return res.json()})
    .then((data) => {console.log(data)
    setText("");
    window.location.reload();
    })
    .catch((err) => {console.log(err)})
    return;
  }};


return (
  <>

    <nav className="bg-violet-700 fixed top-0 w-full z-50">
      <div className="max-w-screen-xll flex flex-wrap items-center justify-between mx-6 p-5">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        <svg className="w-10 h-10 text-green-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 21">
          <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.24 7.194a24.16 24.16 0 0 1 3.72-3.062m0 0c3.443-2.277 6.732-2.969 8.24-1.46 2.054 2.053.03 7.407-4.522 11.959-4.552 4.551-9.906 6.576-11.96 4.522C1.223 17.658 1.89 14.412 4.121 11m6.838-6.868c-3.443-2.277-6.732-2.969-8.24-1.46-2.054 2.053-.03 7.407 4.522 11.959m3.718-10.499a24.16 24.16 0 0 1 3.719 3.062M17.798 11c2.23 3.412 2.898 6.658 1.402 8.153-1.502 1.503-4.771.822-8.2-1.433m1-6.808a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
        </svg>
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Zen Ticket</span>
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
              
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {taskList.length > 0 && (
    <div className="flex h-screen mt-20">
      <div className="flex-grow w-3/5 overflow-auto bg-gray-200 p-4">
        <div className=" border border-gray-300 hover:shadow-lg  rounded-lg px-8 py-8 transition duration-300 ease-in-out mt-16 m-12 border p-4 group bg-gray-300">
          <div className="m-2">
            <h3 className=" mb-16 text-center text-3xl font-bold dark:text-white">Query Details</h3>
            <div className="mt-2 mb-4"><h5 className="text-xl font-bold dark:text-white">Ticket Generated On : <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{taskList[0].time}</span></h5></div>
            <div className="mt-2 mb-4"><h5 className="text-xl font-bold dark:text-white">Created By : <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{taskList[0].name}</span></h5></div>
            <div className="mt-2 mb-4"><h5 className="text-xl font-bold dark:text-white">Phone No : <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{taskList[0].phone_no}</span></h5></div>
            <div className="mt-2 mb-4"><h5 className="text-xl font-bold dark:text-white">Query Title : <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 ">{taskList[0].query_type} </span></h5></div>
            <div className="mt-2 mb-4"><h5 className="text-xl font-bold dark:text-white">Assigned To : <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{taskList[0].assignedTo}</span></h5></div>
            <div className="mt-2 mb-4"><h5 className="text-xl font-bold dark:text-white">Status :<span className="text-gray-500 hover:text-white border border-gray-300 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">{taskList[0].status}</span></h5></div>
            <div className="mt-2 mb-4"><h5 className="text-xl font-bold dark:text-white">Description : <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{taskList[0].discription}</span></h5></div>
          </div>
        </div>

        <div className=" ml-10 mr-10 mt-18 flex items-center justify-between">
        <input value={text} onChange={handleTextchange} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-transparent block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-transparent" placeholder='Type to Chat'/>
          <button onClick={addComment} type="button" className="m-1 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-full text-sm p-3.5 text-center inline-flex items-center me-2 ">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </button>
        </div>

        <div className="ml-10 mr-10 mt-4 border border-gray-300 hover:shadow-lg rounded-lg px-2 py-2 transition duration-300 ease-in-out border p-4 group bg-gray-300">
        <div className="text-base text-red-600 underline">Note:</div>
        <ul className="mt-1 ml-10 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          <li className="text-teal-700 text-xs">The Mentor can provide the Google Meet if needed.</li>
          <li className="text-teal-700 text-xs">The Mentor can make a call via the phone number if needed.</li>
        </ul>
        </div>
      </div>

      <div className=" vh-screen flex-shrink w-2/5 overflow-auto bg-gray-300 p-4">
        {renderComments(taskList[0].timecomment)}  
      </div>
    </div> 
    )} 
    
  <footer className="bg-violet-700 rounded-sm shadow m-0 dark:bg-gray-800  border-1  border-violet-700 hover:shadow-lg transition duration-300 ease-in-out">
      <div className="w-full mx-10 max-w-screen-xl p-1 md:flex md:items-center md:justify-between ">
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
export default Staffnextzen