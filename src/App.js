import logo from './Components/Assets/logo.png'
import './App.css';
import { Login_Signup } from './Components/Login-Signup/Login-Signup';

import { useState, useEffect } from 'react';

const App = () => {

  const [ value, setValue] = useState(null)
  const [ message, setMessage] = useState(null)

  const [previousChats , setPreviousChats] = useState([])
  const [currentTitle , setCurrentTitle] = useState([null])

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }


  const handleClick = (uniqueTitles) => {
    setCurrentTitle(uniqueTitles)
    setMessage(null)
    setValue("")
  }



  // const getMessages = async () => {

  //   const options = {
  //     method: "POST",
  //     body : JSON.stringify({
  //       message: value
  //     }),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }

  //   }
  //   try{
  //     const response = await fetch('http://localhost:8000/completions', options)
  //     const data = await response.json()

  //     setMessage(data.choices[0].messages)
  //   }catch (error){
  //     console.error(error)
  //   }
  // }



  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const response = await fetch('http://localhost:8000/completions', options);
      const data = await response.json();
  
      if (data.choices && data.choices.length > 0) {
        setMessage(data.choices[0].messages);
      } else {
        // Handle the case where there are no choices in the response.
        // You might want to set a default message or handle it accordingly.
        setMessage('No response available');
      }
    } catch (error) {
      console.error(error);
    }
  };
  



  // useEffect(() => {
  //   console.log(currentTitle, value, message)
  //   if(!currentTitle && value && message){
  //     setCurrentTitle(value)
  //   }

  //   if(currentTitle && value && message){
  //     setPreviousChats(prevChats => (
  //       [...prevChats, 
  //        {
  //         title: currentTitle,
  //         role: "user",
  //         content: value
  //        },
         
  //        {
  //         title :currentTitle,
  //         role: message.role,
  //         content: message.content
  //         }
  //       ]
  //     ))
  //   }
  // },[message, currentTitle])



 

  useEffect(() => {
    // This effect runs when 'message' changes.
    console.log(currentTitle, value, message);
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
  }, [message]);
  
  useEffect(() => {
    // This effect runs when 'currentTitle' changes.
    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [currentTitle, value, message]);
  




  console.log(previousChats)

  const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChats => previousChats.title)))
  console.log(uniqueTitles)

  return (
    <div >
      <Login_Signup/>


    <div className="app">
      {/* we can create a chat component itself, it starts here*/}

      {/* creating a side bar */}
      <section className='side-bar'>
        <button onClick={createNewChat}> + New Chat</button>

        {/* <ul className='history'>

          {uniqueTitles?.map((uniqueTitles, index) => <li key={index} onClick={handleClick(uniqueTitles)}>{uniqueTitles}</li>)}
        </ul> */}

        <ul className='history'>
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li key={index} onClick={() => handleClick(uniqueTitle)}>
              {uniqueTitle}
            </li>
          ))}
        </ul>


        <nav>
          <p>Logout</p>
        </nav>
      </section>



      {/* creating a main bar */}
      <section className='main'>
        {!currentTitle && <h1>CodePilot</h1>} 
        <ul className='feed'>
          {currentChat?.map((chatMessage, index) => <li key={index}>
            <p className='role'>{chatMessage.role}</p>
            <p>{chatMessage.content}</p>

          </li>)}

        </ul>

        <div className='bottom-section'>
          <div className='input-container'>


            {/* <input value={value} onChange={(e) => setValue(e.target.value)}/> */}
            <input value={value || ''} onChange={(e) => setValue(e.target.value)} />

           
           
            <div id='submit' onClick={getMessages}>➤</div>
          </div>

          <p className='info'>
            Copyright CodePilot 2023
          </p>
        </div>
      </section>
      


    </div>
    {/* chat component ends here */}


    </div>
  );
}

export default App;


