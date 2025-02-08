import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed)

    const fetchFeed = async () => {
        if(feed) return;
        try{
            const feed = await axios.get(BASE_URL+'/feed',{withCredentials: true});
            // console.log(feed.data.users);
            dispatch(addFeed(feed.data.users));
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchFeed();
    }, []);

    return feed && (
        <>
            <div className="flex justify-center pt-4">
                <UserCard user={feed[4]} />
            </div>
        </>
    )
}

export default Feed;