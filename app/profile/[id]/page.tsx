import React, {FC} from 'react';

import {getProjectsOfUser} from "@/graphql/requests";
import {UserProfile} from "@/common.types";
import ProfilePage from "../ProfilePage";

type Props = {
    params: {
        id: string,
    },
}

const Profile: FC<Props> = async ({params: {id}}) => {
    const result = await getProjectsOfUser(id, 100) as { user: UserProfile }

    if (!result?.user) return (
        <p className="no-result-text">Failed to fetch user info</p>
    )

    return <ProfilePage user={result?.user}  />
};

export default Profile;