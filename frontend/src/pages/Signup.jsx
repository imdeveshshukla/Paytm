import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



function Signup(){
  const [name , setname] = useState("");
  const [username,setEmail] = useState("");
  const [password,setpass] = useState("");
  const navigate = useNavigate();

    return <div className="bg-slate-100 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your Information to Create an account"} />
        <InputBox placeholder={"Rishi"} label={"Name"}
        onchange={(e)=>setname(e.target.value)}
        ></InputBox>
        <InputBox onchange={(e)=>setEmail(e.target.value)} placeholder="rishi@xyz.com" label={"Email"} />
        <InputBox 
        onchange={(e)=>setpass(e.target.value)}
        placeholder="123456" label={"Password"} />
        <div>
          <Button onClick={async()=>{
            const res = await axios.post("http://localhost:3000/api/v1/user/signup",{
              username,
              name,
              password
            })
            if(res.data.token){
              localStorage.setItem("token",res.data.token)
              navigate("/dashboard");
            }
            else{
              alert("Error :"+res.data);
            }

          }} label={"Sign Up"} />
        </div>
        <BottomWarning label={"Already Have an Account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>

}

export default Signup;