import { useState } from 'react'
import './App.css'
import Mainbody from './Component/Mainbody'
import Navbar from './Component/Navbar'
const auth_key = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjFiOTVhM2Q2YTJjMDQ2YmVmZGE5OTZiYjUxMzg4OCIsInN1YiI6IjY0MWQxYjdiZTFmYWVkMDBjNTBlY2Y1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1PuIc1utVEW6ABx5kk29fJLWhmz5f1h6_uWJO3xdllo'
function App() {
  const [initial_render,setintial_render] = useState(true)
  const [searchvalue,setsearchvalue] = useState('')
  return (
   <div className='app'>
   <Navbar setintial={setintial_render}setsearchvalue={setsearchvalue}/>
   <Mainbody initial={initial_render} searchvalue={searchvalue}setintial={setintial_render}/>
   </div>
  )
}

export default App
