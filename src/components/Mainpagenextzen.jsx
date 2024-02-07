import React from 'react'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'


function Mainpagenextzen() {
  
  const navigate = useNavigate();
  const handleChange = async () => {
    navigate(-1);
  };

  const [taskList, setTaskList] = useState([]);

//This is to fetch userid and ticket id coming from urls..
    const {userid,id} = useParams()

// Function to generate HTML for each comment
  const renderComments = (comments) => {
    return comments.map((comment, index) => (
        <div key={index} className="p-1 m-1 border border-violet-500 bg-violet-200 hover:bg-violet-100 rounded-lg">
            <div className="p-1">
              <div className="mb-1 text-xs text-gray-400 sm:order-last sm:mb-0 font-style: italic ">{comment.username}</div>
              <div className="flex justify-between items-center">
                  <div> {comment.content} </div>
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
          
           // Check if task.comments exists and is an array
            
            const formattedComments = task.comments.map((comment) => {
            const createdAtDate = new Date(comment.createdAt);
            return {
              content: comment.content,
              username:comment.username,
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
              comments: formattedComments.map((comment) => comment.content),
              _id: task._id,
              userID: task.userID,
            },
          ]);
        
      })
      .catch((err) => {console.log(err)})
  
<<<<<<< HEAD
    },[taskList]); 
=======
    }, [taskList]); 
>>>>>>> 962badabd6673926b00f332854fd657a50d8a049

//Add a Comment...
  const[text,setText] = useState("")

  const handleTextchange = (event) => {
  setText(event.target.value);
  }

  const addComment = () => {
  if (!!text ) {
    //This is Adding to BE
    fetch("https://zenquery-backend.onrender.com/ticket/"+userid+"/"+id,{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ content: text})  //Whatever i write currently in FE
    })
    .then((res) => {return res.json()})
    .then((data) => {console.log(data)
    setText("");
<<<<<<< HEAD
=======
    
>>>>>>> 962badabd6673926b00f332854fd657a50d8a049
    })
    .catch((err) => {console.log(err)})
    return;
  }};

//Close the Ticket....

  const editStatus = () => {
  fetch("https://zenquery-backend.onrender.com/ticket/status/"+userid+"/"+id,{
      //PUT Method help again to edit by admin if required..
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ status: "CLOSED"})  //Whatever i write currently in FE 
      })
      .then((res) => {return res.json()})
      .then((data) => {console.log(data)
<<<<<<< HEAD
=======
      
>>>>>>> 962badabd6673926b00f332854fd657a50d8a049
      })
      .catch((err) => {console.log(err)})
}

return (
  <>

  <nav className="bg-violet-700 fixed top-0 w-full z-50">
      <div className="max-w-screen-xll flex flex-wrap items-center justify-between mx-6 p-5">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        <svg className="w-10 h-10 text-green-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
          <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z"/>
        </svg>
          <span className=" self-center text-2xl font-semibold whitespace-nowrap text-white">Zen Query</span>
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
        <button onClick={handleChange} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
          <span class="relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
           Back
          </span>
        </button>
        <div className="mb-16 border border-gray-300 hover:shadow-lg  rounded-lg px-8 py-8 transition duration-300 ease-in-out m-16 border p-4 group bg-gray-300">
          <div className="m-2">
            <h3 className=" mb-10 text-center text-3xl font-bold dark:text-white">Query Details</h3>
            <div className="mt-2 mb-4"><h5 className="text-xl font-bold dark:text-white">Ticket Generated On : <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{taskList[0].time}</span></h5></div>
            <div className="mt-2 mb-4"><h5 className="text-xl font-bold dark:text-white">Created By : <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{taskList[0].name}</span></h5></div>
            <div className="mt-2 mb-4"><h5 className="text-xl font-bold dark:text-white">Phone No : <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{taskList[0].phone_no}</span></h5></div>
            <div className="mt-2 mb-4"><h5 className="text-xl font-bold dark:text-white">Query Title : <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 ">{taskList[0].query_type} </span></h5></div>
            <div className="mt-2 mb-4"><h5 className="text-xl font-bold dark:text-white">Assigned To : <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{taskList[0].assignedTo}</span></h5></div>
            <div className="mt-2 mb-4"><h5 className="text-xl font-bold dark:text-white">Status :<span className="text-gray-500 hover:text-white border border-gray-300 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">{taskList[0].status}</span></h5></div>
            <div className="mt-2 mb-4"><h5 className="text-xl font-bold dark:text-white">Description : <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{taskList[0].discription}</span></h5></div>
            <div className="mt-10 text-right">
              <button onClick={editStatus} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Close !</button>
            </div>
          </div>
        </div>

        <div className="m-16 flex items-center justify-between">
        <input value={text} onChange={handleTextchange} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-transparent block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-transparent" placeholder='Type to Chat'/>
          <button onClick={addComment} type="button" className="m-1 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-full text-sm p-3.5 text-center inline-flex items-center me-2 ">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-shrink w-2/5 overflow-auto bg-gray-300 p-4 mb-6">
        {renderComments(taskList[0].timecomment)}  
      </div>
    </div> 
    )} 
      <footer className="fixed bottom-0 w-full bg-violet-700 rounded-sm shadow m-0 dark:bg-gray-800  border-1  border-violet-700 hover:shadow-lg transition duration-300 ease-in-out">
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
export default Mainpagenextzen
