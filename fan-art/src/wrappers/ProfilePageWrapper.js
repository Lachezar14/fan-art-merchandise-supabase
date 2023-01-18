import Profile from '../pages/Profile';
import AdminProfile from "../pages/AdminProfile";
import {useProfileSetup} from "../contexts/UserProfileSetupContext";

const ProfilePage = () => {

    const {userProfile} = useProfileSetup();

    return (
        <div>
            {userProfile?.role === "ADMIN" ? <AdminProfile/> : <Profile/>}
        </div>
    )
};

export default ProfilePage;