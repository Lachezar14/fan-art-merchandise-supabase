import ProductUpload from '../pages/ProductUpload';
import AdminProfile from "../pages/AdminProfile";
import {useProfileSetup} from "../contexts/UserProfileSetupContext";

const ProfilePage = () => {

    const {userProfile} = useProfileSetup();

    return (
        <div>
            {userProfile?.role === "ADMIN" ? <AdminProfile/> : <ProductUpload/>}
        </div>
    )
};

export default ProfilePage;