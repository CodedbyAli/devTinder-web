import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchConnections = async () => {

        const res = await axios.get(BASE_URL+'/connections/confirmed',{withCredentials: true});
        dispatch(addConnection(res.data.data));        
    }

    useEffect(()=>{

        fetchConnections();

    },[])

    if(!connections) return;

    if(connections.length === 0) return (<div><h3>No Connections Established Currently</h3></div>)

  return (
    <>
        <h1 className="text-2xl font-bold text-center mt-4">Connections</h1>

        <div className="my-8 flex flex-col space-y-4 items-center justify-center">
            {connections.map((connection) => {
                return (
                    <div key={connection._id} className="bg-base-200 py-4 rounded-2xl px-4 flex items-center justify-between w-1/3">
                <div className="flex items-center space-x-4">
                    <img src={connection.imageUrl} className="rounded-full w-12 h-12"/>
                    <p>{connection.firstName + ' ' + connection.lastName}</p>
                </div>
                <div>
                    <p>{connection.gender + ' / ' + connection.age}</p>
                </div>
            </div>
                )
            })}
        </div>
    </>
  )
}

export default Connections