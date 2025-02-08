

const UserCard = ({user}) => {
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
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                    </div>
                </div>
                </div>
        </>
    )
}

export default UserCard;