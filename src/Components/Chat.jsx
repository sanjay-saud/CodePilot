import '../index.css';

import { useState, useEffect } from 'react';
import {useKindeAuth} from '@kinde-oss/kinde-auth-react';

const Chat = () => {

  const {logout} = useKindeAuth();
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

  const getMessages = async () => {
    const options = {
      method: "POST",
      body : JSON.stringify({
        message: value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try{
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json()
      setMessage(data.choices[0].message)
    }catch (error){
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(currentTitle, value, message)
    if(!currentTitle && value && message){
      setCurrentTitle(value)
    }

    if(currentTitle && value && message){
      setPreviousChats(prevChats => (
        [...prevChats, 
         {
          title: currentTitle,
          role: "user",
          content: value
         },
         
         {
          title :currentTitle,
          role: message.role,
          content: message.content
          }
        ]
      ))
    }
  },[message, currentTitle])
  console.log(previousChats)

  const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChats => previousChats.title)))
 
  return (
    <><div>
      <div className='app'>
         {/* we can create a chat component itself, it starts here*/}

        {/* creating a side bar */}
        <section className='side-bar'>
          <button onClick={createNewChat}>+ New chat</button>
          <ul className='history'>
            {uniqueTitles?.map((uniqueTitle, index) => (
              <li key={index} onClick={() => handleClick(uniqueTitle)}>
                {uniqueTitle}
              </li>
            ))}
          </ul>
          <nav>
            <button onClick={logout} type="button">Log out</button>
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
          <div className='botton-section'>
            <div className='input-container'>
              <textarea value={value} onChange={(e) => setValue(e.target.value)} rows="1" />
              <div id='submit' onClick={getMessages}>➤</div>
            </div>
            <p className='info'>
              Copyright CodePilot 2023
            </p>
          </div>
        </section>

      </div>
    </div></>
  );
}

export default Chat;


