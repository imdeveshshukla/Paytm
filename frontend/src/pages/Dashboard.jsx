import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

function Dashboard(){
    return (
        <div >
            <Appbar/>
            <div className="m-2">
                <Balance value={"1000"}/>
            </div>
            <div className="p-5 m-2 border rounded-sm">
                <Users/>
            </div>
        </div>
    )
}

export default Dashboard;