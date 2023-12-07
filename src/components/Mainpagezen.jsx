import React from 'react'
import { useEffect, useState } from "react"
import InputComponent from './InputComponent';
import { useNavigate, useParams } from 'react-router-dom'


const Mainpagezen = () => {
  
  const [taskList, setTaskList] = useState([]);
//This is to fetch userid and paste it with urls..
    const {userid}=useParams()
// //This is to handle to go to another mainpage...
const navigate = useNavigate()

    const [show,setShow]=useState(false)

    const [text, setText] = useState("");
    const [text1,setText1] = useState("");
    const [text2,setText2] = useState("");
    const [text3,setText3] = useState("");

    const [editTaskId, setEditTaskId] = useState(-1);
  
  //Called for Api call
    useEffect(() => {
      fetch("https://zenquery-backend.onrender.com/ticket/"+userid) //In FE we have to write localhost:
      .then((res) => {return res.json()})
      .then((data) => {console.log(data)
  
        //This is to make a normal id number to store with task name...
        data.map((task) => {
          setTaskList((taskList) => [
            ...taskList,   //It take whatever in the list and also going to add new one...
            {
              id: taskList.slice(-1)[0] ? taskList.slice(-1)[0].id + 1 : 1,  //here we take id = last index of tasklist array object and then take 1st key(id) of that object.
              name: task.name,
              query_type: task.query_type,
              discription: task.discription,
              phone_no: task.phone_no,
              _id: task._id,      
              userID: task.userID
            },
          ]);
        })
      })
      .catch((err) => {console.log(err)})
  
    },[])
  //Here wew are deleting task..
  const deleteTask = (i) => {
    let index = taskList.findIndex((obj) => obj.id === i); //here checking task.id == obj.id
    if (index > -1) {
    //This is removal from BE
      fetch(`https://zenquery-backend.onrender.com/ticket/${userid}/${taskList[index]._id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}})
        .then((res) => {return res.json()})  //The rest todo after deletion is got as response
        .then((data) => {console.log(data)
    //This is removal from FE
           taskList.splice(index, 1);    // 1 represent to delete 1 item after that index.
           setTaskList([...taskList]);   //To take current list that we have after delete
        })
        .catch((err) => {console.log(err)})

        setText("");
        setText1("");
        setText2("");
        setText3("");       //here setting text in search bar as null when we delete anything
        setEditTaskId(-1); //here settind id in search bar as -1 during deletion
    }
  };

//Here we are editing task 
  const editTask = (id) => {
    let index = taskList.findIndex((obj) => obj.id === id);
    if (index > -1) {
      setText(taskList[index].query_type);
      setText1(taskList[index].name);
      setText2(taskList[index].discription);
      setText3(taskList[index].phone_no);

      setEditTaskId(id);
    }
  };  

//Here We navigate to another page...
  const pageChange = (id) => {
    let index = taskList.findIndex((obj) => obj.id === id);
    if (index > -1) {
      navigate("/mainpagenextzen/"+userid+"/"+taskList[index]._id)
    }
  }  

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
        <svg className="w-10 h-10 text-green-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
          <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z"/>
        </svg>
          <span className=" self-center text-2xl font-semibold whitespace-nowrap text-white">Zen Query</span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button" className=" inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
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

      <div className="flex h-screen mt-20">
      <div className="flex-grow w-2/3 overflow-auto bg-gray-200 p-4">
        <div className="mt-5">
          <button onClick={()=>{setShow(!show)}} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              {show? "Back" :"+Create Query"}
            </span>
          </button>
        </div>
        {/* 2 task ---- add the todo and to edit a todo */}
        {show && 
        <InputComponent
          editTaskId={editTaskId}  //It help to know wheather to add or edit case. if edit it will not be -1
          setEditTaskId={setEditTaskId}
          text={text}       
          setText={setText}
          text1={text1}       
          setText1={setText1}
          text2={text2}       
          setText2={setText2}
          text3={text3}       
          setText3={setText3}
          taskList={taskList} //it contain all the elements in array so sended
          setTaskList={setTaskList} 
          userid={userid} 
        />
        }
      </div>
      <div className="flex-shrink w-1/3 overflow-auto bg-gray-300 p-4">
      {taskList.map((task, index) => (
          <div
            key={index}
            className="p-1 m-1 border border-violet-500 bg-violet-200 hover:bg-violet-100 rounded-md"
          >
            <div key={task.id} className="p-1">
              <div className="flex justify-between items-center">
                <div> {task.query_type}</div>
                <div className="flex ">
                <div
                    onClick={() => pageChange(task.id)}
                    className="bg-green-100 hover:bg-green-200 px-2 py-1 mx-1 rounded-lg cursor-pointer"
                  >
                <svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="background"><rect fill="none" height="32" width="32"/></g><g id="view"><circle cx="16" cy="16" r="6"/><path d="M16,6C6,6,0,15.938,0,15.938S6,26,16,26s16-10,16-10S26,6,16,6z M16,24c-8.75,0-13.5-8-13.5-8S7.25,8,16,8s13.5,8,13.5,8   S24.75,24,16,24z"/></g></svg>
                </div>
                  <div
                    onClick={() => {
                      setShow(true)
                      editTask(task.id)}}
                    className="bg-green-100 hover:bg-green-200 px-2 py-1 mx-1 rounded-md cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </div>
                  <div
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-100 hover:bg-red-200 px-2 py-1 mx-1 rounded-md cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-red-500 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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

export default Mainpagezen