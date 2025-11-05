import React from 'react'

const UserProfile = async ({ params }: any) => {
    const { id } = await params;
    return (
        <div>
            <p>
                UserProfile {id}
            </p>
        </div>
    )
}

export default UserProfile