import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";




function Signup(){
    return (
        <div className="signUp flex flex-col border border-solid border-black rounded-md">
        
        <Heading label={"Signup"}></Heading>
            <SubHeading label={"Enter Your Information to Create Your account"}/>
            <InputBox label={"Name"} placeholder={"Rishi"}/>
            <InputBox label={"Username"} placeholder={"ris@example.com"}></InputBox>
            <InputBox label={"Password"} placeholder={""}/>
            <label htmlFor="Password"></label>
            <input type="password" name="password" id="password" />
            <button type="submit">Sign Up</button>
            <hr />
            <p>Already have an account? <a href="">link</a></p>
        </div>

    )
}

export default Signup;