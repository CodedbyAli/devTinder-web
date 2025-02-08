import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const fetchRequests = async () => {
        try{
            const res = await axios.get(BASE_URL+'/connections/recieved', {withCredentials: true});
            dispatch(addRequest(res.data.data));

        }catch(err){
            console.log(err.message);
        }
    }

    const reviewRequest = async (status, _id) => {

        try {
            const res = await axios.post(BASE_URL + '/review/request/' + status + '/' + _id, {}, {withCredentials:true});
            dispatch(removeRequest(_id));
            console.log(res);
        } catch (err) {
            console.log(err.message);
        }

    }

    useEffect(()=>{
        fetchRequests();
    },[])

    if(!requests) return;

    if(requests.length === 0) return(<><h3 className="text-2xl font-semibold text-center my-4">No Request found at this moment.</h3></>)

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-4">Requests</h1>

      <div className="my-8 flex flex-col space-y-4 items-center justify-center">
        {requests.map((request) => {
          return (
            <div
              key={request._id}
              className="bg-base-200 py-4 rounded-2xl px-4 flex items-center justify-between w-1/3"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={request.fromUserId.imageUrl}
                  className="rounded-full w-12 h-12"
                />
                <p>{request.fromUserId.firstName + " " + request.fromUserId.lastName}</p>
              </div>
              <div>
                <p>{request.fromUserId.gender + " / " + request.fromUserId.age}</p>
              </div>
              <div className="space-x-2">
                <button className="btn btn-primary" onClick={() => reviewRequest('REJECTED', request._id)}>Reject</button>
                <button className="btn btn-secondary" onClick={() => reviewRequest('ACCEPTED', request._id)}>Accept</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Requests