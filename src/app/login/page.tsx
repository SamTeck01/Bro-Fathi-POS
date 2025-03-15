'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {

  const router = useRouter();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login=()=>{
    if(username === null || username.length < 3 ) {
      alert('Username cannot be empty and it must be more than 3 ');
    }else if(password === null) {
      alert('Why is there no password');
    }else if(username === 'SamTeck' && password === 'Samad@87' ){
      router.push('/');
    }else{
      alert('Incorrect Username or Password');
    }    
  }

  const styles = {
    backdropFilter: 'blur(1px)',
    backgroundColor: '#2d71f810',
  }

  return (
    <section className="max_padd_container flexCenter pt-32" >
      <div className="max-w-[555px] min-w-[500px] h-fit m-auto mx-14 px-12 pt-12 rounded-md " style={styles} >
        <h3 className="text-[30px] leading-tight md:text-[32px] md:leading-[1.3] mb-4 font-semibold">Login</h3>
        <div className="flex flex-col gap-5 mt-7" >
          <input type="text" placeholder="Username" className="outline-green-100  h-14 w-full pl-5 bg-slate-900/5 rounded-xl" onChange={(e)=> setUsername(e.target.value) } />
          <input type="password" placeholder="Password" className="outline-green-100  h-14 w-full pl-5 bg-slate-900/5 rounded-xl" onChange={(e)=> setPassword(e.target.value) } />
        </div>
        <button className="blue-hover my-4 p-4 w-full !rounded-md" onClick={login} ><span>Continue</span></button>
      </div>
    </section>
  )
}
