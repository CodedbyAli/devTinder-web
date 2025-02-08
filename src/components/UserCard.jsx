import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";


const UserCard = ({user}) => {
    
    const dispatch = useDispatch();
    const handleSendRequest = (status,userId) => {
            try {
                axios.post(BASE_URL+'/send/request/' + status + '/' + userId, {}, {withCredentials:true});
                dispatch(removeUserFromFeed(userId));
                
            } catch (err) {
                console.log(err.message);
            }
        }

    return (
        <>
            <div className="card bg-base-300 w-96 shadow-xl">
                <figure>
                    <img
                    src={user.imageUrl ? user.imageUrl : "https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-623.jpg?semt=ais_hybrid"}
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                    <div className="flex items-center">
                        <h2 className="card-title">{user.firstName + " " + user.lastName} ({user.age})</h2>
                        <p className="text-end font-semibold">{user.gender}</p>
                    </div>
                    <p>Skills: {user.skills}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => handleSendRequest('IGNORED',user._id)}>Ignore</button>
                        <button className="btn btn-secondary" onClick={() => handleSendRequest('INTERESTED',user._id)}>Interested</button>
                    </div>
                </div>
                </div>
        </>
    )
}

export default UserCard;