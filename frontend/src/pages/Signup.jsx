import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";



function Signup(){
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your Information to Create an account"} />
        <InputBox placeholder={"Rishi"} label={"Name"}></InputBox>
        <InputBox placeholder="rishi@xyz.com" label={"Email"} />
        <InputBox placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign Up"} />
        </div>
        <BottomWarning label={"Already Have an Account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>

}

export default Signup;