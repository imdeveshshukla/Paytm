import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signin(){
  const [username, setEmail] = useState();
  const [password,setPass] = useState();
  const navigate = useNavigate();
    return (
        <div className="bg-slate-100 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onchange={(e)=>setEmail(e.target.value)} placeholder="rishi@xyz.com" label={"Email"} />
        <InputBox onchange={(e)=>setPass(e.target.value)} placeholder="123456" label={"Password"} />
        <div className="">
          <Button label={"Sign in"} onClick={async()=>{
            const res =await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
                password
              })
              if(res.data.token){
              localStorage.setItem("token",res.data.token)
              navigate("/dashboard");
            }
            else{
              alert("Error :"+res.data);
            }

          }}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>

    )
}


export default Signin;