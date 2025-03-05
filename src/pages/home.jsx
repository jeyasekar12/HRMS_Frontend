import { useEffect, useState } from "react"
import { auth } from "../firebase/firebase"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


function Home() {

    const navigate = useNavigate(); 
    const [userDetails, setUserDetails] = useState("")

    const fetchData = async () => {
        auth.onAuthStateChanged(async (user) => {
            console.log(user, "userrrr")
            setUserDetails(user)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])


    async function handlelogout() {
        try {
            await auth.signOut();
            navigate("/log-in")
            toast.success("logout sucess")
        } catch (error) {
            console.log("errr")
            toast.error(error.message)
        }

    }



    return (
        <>
            <div>
                <div className="w-[500px] h-[300px] bg-white flex flex-col gap-4 rounded items-center">
                    <div className="flex justify-center">
                        <img
                            src={userDetails?.photoURL || "default-image.jpg"}
                            alt="User"
                            width={40}
                            className="rounded-2xl"
                        />
                    </div>
                    <p>Email:{userDetails?.email || ""}</p>
                    <p>name:{userDetails?.displayName || "" }</p>

                    <button className="bg-red-500 w-[100px] p-3 text-white" onClick={handlelogout}>Logout</button>
                </div>
            </div>
        </>
    )
}

export default Home