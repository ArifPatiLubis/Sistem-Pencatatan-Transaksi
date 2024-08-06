import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'
import { getDatabase, ref, update } from 'firebase/database';
import Header from "../../../components/user/header";
import Footer from "../../../components/user/footer";
import Sidebar from "../../../components/user/sidebar";
import ProfilImage from '../../../components/user/profil-image';
import ChangePasswordUsername from './change-profil';

const Profil = () => {
    const navigate = useNavigate()
    const { userLoggedIn, currentUser } = useAuth()
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentUser && username) {
            try {
                const db = getDatabase();
                const userRef = ref(db, `users/${currentUser.uid}`);

                await update(userRef, {
                    username: username
                });

                alert('Username updated successfully!');
            } catch (error) {
                console.error('Error updating username:', error);
                alert('Error updating username. Please try again.');
            }
        } else {
            alert('Please fill in the username.');
        }
    };
    

    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
        <Header />
          <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                </div>
            </div>

            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <ProfilImage />
                        </div>
                            <ChangePasswordUsername></ChangePasswordUsername>
                    </div>
                </div>
            </div>
          </div>
        <Footer />
        </div>
      </div>
      );
    }
    
export default Profil