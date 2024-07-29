import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'
import { getDatabase, ref, update } from 'firebase/database';
import Header from "../../../components/user/header";
import Footer from "../../../components/user/footer";
import Sidebar from "../../../components/user/sidebar";
import ProfilImage from '../../../components/user/profil-image';

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
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-header p-2">
                                    <ul className="nav nav-pills">
                                        <li className="nav-item"><a className="nav-link active" style={{backgroundColor: "indigo"}}data-toggle="tab">Change Username</a></li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                <div className="tab-content">
                                <div className="active tab-pane" id="settings">
                                    <form className="form-horizontal" onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Username</label>
                                        <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            id="username"
                                            placeholder="Type New Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        </div>
                                        </div>
                                        <div className="form-group row">
                                        <div className="offset-sm-2 col-sm-10">
                                            <button type="submit" className="btn btn-secondary">Submit</button>
                                        </div>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
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