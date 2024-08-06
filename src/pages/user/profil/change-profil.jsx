import React, { useState } from 'react';
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { ref, update } from "firebase/database";
import { database } from "../../../firebase/firebase";
import { useAuth } from '../../../context/authContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

const ChangePasswordUsername = () => {
    const { currentUser } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [reauthEmail, setReauthEmail] = useState('');
    const [reauthPassword, setReauthPassword] = useState('');

    const handleSubmitUsername = async (e) => {
        e.preventDefault();
        if (currentUser) {
            const userRef = ref(database, `users/${currentUser.uid}`);
            try {
                await update(userRef, { username });
                setMessage({ severity: 'success', summary: 'Success', detail: 'Username updated successfully.' });
            } catch (error) {
                setMessage({ severity: 'error', summary: 'Error', detail: `Error updating username: ${error.message}` });
            }
        } else {
            setMessage({ severity: 'warn', summary: 'Warning', detail: 'No user is signed in.' });
        }
    };

    const reauthenticate = async (email, password) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (email && password) {
            const credential = EmailAuthProvider.credential(email, password);
            try {
                await reauthenticateWithCredential(user, credential);
                setMessage({ severity: 'success', summary: 'Success', detail: 'Re-authentication successful.' });
                return true;
            } catch (error) {
                setMessage({ severity: 'error', summary: 'Error', detail: `Error re-authenticating: ${error.message}` });
                return false;
            }
        } else {
            setMessage({ severity: 'warn', summary: 'Warning', detail: 'Email and password are required for re-authentication.' });
            return false;
        }
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            try {
                await updatePassword(user, password);
                setMessage({ severity: 'success', summary: 'Success', detail: 'Password updated successfully.' });
            } catch (error) {
                if (error.code === 'auth/requires-recent-login') {
                    const authenticated = await reauthenticate(reauthEmail, reauthPassword);
                    if (authenticated) {
                        try {
                            await updatePassword(user, password);
                            setMessage({ severity: 'success', summary: 'Success', detail: 'Password updated successfully after re-authentication.' });
                        } catch (updateError) {
                            setMessage({ severity: 'error', summary: 'Error', detail: `Error updating password: ${updateError.message}` });
                        }
                    }
                } else {
                    setMessage({ severity: 'error', summary: 'Error', detail: `Error updating password: ${error.message}` });
                }
            }
        } else {
            setMessage({ severity: 'warn', summary: 'Warning', detail: 'No user is signed in.' });
        }
    };

    return (
        <div className="p-grid">
            {/* Change Username Section */}
            <div className="p-col-12 p-md-12">
                <div className="card">
                    <h5 className="card-header">Change Username</h5>
                    <div className="card-body">
                        <form className="p-fluid" onSubmit={handleSubmitUsername}>
                            <div className="p-field">
                                <label htmlFor="username">Username</label>
                                <InputText
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter new username"
                                />
                            </div>
                            <Button type="submit" label="Submit" className="p-button-help mt-3" />
                        </form>
                    </div>
                </div>
            </div>

            {/* Change Password Section */}
            <div className="p-col-12 p-md-12">
                <div className="card">
                    <h5 className="card-header">Change Password</h5>
                    <div className="card-body">
                        <form className="p-fluid" onSubmit={handleSubmitPassword}>
                            <div className="p-field">
                                <label htmlFor="password">New Password</label>
                                <InputText
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                />
                            </div>
                            {message && message.detail.includes('re-authentication') && (
                                <>
                                    <div className="p-field">
                                        <label htmlFor="reauthEmail">Email</label>
                                        <InputText
                                            id="reauthEmail"
                                            type="email"
                                            value={reauthEmail}
                                            onChange={(e) => setReauthEmail(e.target.value)}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="p-field">
                                        <label htmlFor="reauthPassword">Password</label>
                                        <InputText
                                            id="reauthPassword"
                                            type="password"
                                            value={reauthPassword}
                                            onChange={(e) => setReauthPassword(e.target.value)}
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                </>
                            )}
                            <Button type="submit" label="Submit" className="p-button-help mt-3" />
                        </form>
                    </div>
                </div>
            </div>

            {/* Message Display */}
            {message && (
                <div className="p-col-12">
                    <Message severity={message.severity} text={message.detail} />
                </div>
            )}
        </div>
    );
};

export default ChangePasswordUsername;
