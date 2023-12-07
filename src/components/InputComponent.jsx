//all received inside an arrow function from app.jsx..
const InputComponent = ({editTaskId,setEditTaskId,taskList,setTaskList,text,setText,text1,setText1,text2,setText2,text3,setText3,userid}) => {
    const handleTextchange = (event) => {
      setText(event.target.value)
    };
    const handleTextchange1 = (event) => {
      setText1(event.target.value)
    };
    const handleTextchange3 = (event) => {
      setText3(event.target.value)
    };
    const handleTextchange2 = (event) => {
      setText2(event.target.value)
    };
  
    const changeTask = () => {
      //Add todo case..
      if (!!text && !!text1 && !!text2 && !!text3 && editTaskId < 1) {
        //This is Adding to BE
        fetch("http://localhost:5000/ticket/"+userid,{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ query_type: text,name: text1,discription: text2,phone_no: text3})  //Whatever i write currently in FE
        })
        .then((res) => {return res.json()})
        .then((data) => {console.log(data)
        //This is Adding to FE
        setTaskList((taskList) => [
          ...taskList,   //It take whatever in the list and also going to add new one...
          {
            id: taskList.slice(-1)[0] ? taskList.slice(-1)[0].id + 1 : 1,  //here we take id = last index of tasklist array object and then take 1st key(id) of that object.
            query_type: text,
            name: text1,
            discription: text2,
            phone_no: text3,
            _id: data._id,
            userID: data.userID
          },
        ])
        setText("")
        setText1("")
        setText2("")
        setText3("")
        })
        .catch((err) => {console.log(err)})
        return;
      }
  
  //Edit a current todo case...
  
      let index = taskList.findIndex((obj) => obj.id === editTaskId);  //editTaskId we got from app.jsx
      if (index > -1) {
      //This is Edited add to BE
      fetch("http://localhost:5000/ticket/"+userid+"/"+taskList[index]._id,{
        //PUT help again edit by admin if required..
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ 
          query_type:text,
          name:text1,
          discription:text2,
          phone_no:text3
        })  //Whatever i write currently in FE 
        })
        .then((res) => {return res.json()})
        .then((data) => {console.log(data)})
        .catch((err) => {console.log(err)})
  
        //This is Edited add to FE taskList
        taskList[index].query_type = text;
        taskList[index].name = text1;
        taskList[index].discription = text2;
        taskList[index].phone_no = text3;  //here name is set to current text.
        setTaskList([...taskList]); //setting tasklist with edited task..
        setEditTaskId(-1);
        setText("");
        setText1("");
        setText2("");
        setText3("");
      }
    };
    return(

        
        <form>
          <div className="grid gap-6 mb-6 md:grid-cols-2 mt-10">
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" value={text1} onChange={handleTextchange1} required/>
              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                  <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+91 " value={text3} onChange={handleTextchange3} required/>
              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Query Title</label>
                  <input type="text" id="first_nam" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" value={text} onChange={handleTextchange} required/>
              </div>

          </div>
          <div className="mb-6">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <input type="text" id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write query details here..." value={text2} onChange={handleTextchange2} required/>
          </div>
          <div>
            <button onClick={changeTask} type="submit" className=" mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>
        </form>
    ) 
};
export default InputComponent;