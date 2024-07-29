import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, onValue} from 'firebase/database';
import { useAuth } from '../../context/authContext'

function ProfilImage() {

    const { userLoggedIn, currentUser } = useAuth()
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (currentUser) {
            const db = getDatabase();
            const userRef = ref(db, `users/${currentUser.uid}`);

            const unsubscribe = onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setUserData(data);
                } else {
                    setUserData(null);
                }
            });

            // Cleanup subscription on unmount
            return () => unsubscribe();
        }
    }, [currentUser]);

    return(
        <div className="card card-indigo card-outline">
            <div className="card-body box-profile">
                <div className="text-center">
                <img src={currentUser.photoURL ?? "/../../dist/img/user2-160x160.jpg"} className="profile-user-img img-fluid img-circle" alt="User Image" />
                </div>
                <h3 className="profile-username text-center">{userData ? userData.username : 'Loading...'}</h3>
                <p className="text-muted text-center">{userData ? userData.email : 'Loading...'}</p>
                <ul className="list-group list-group-unbordered mb-3">
                <li className="list-group-item">
                    <b>Guild</b> <a className="float-right">Syndicates</a>
                </li>
                <li className="list-group-item">
                    <b>Role</b> <a className="float-right">Warrior</a>
                </li>
                </ul>
            </div>
        </div>
    );
}

export default ProfilImage;