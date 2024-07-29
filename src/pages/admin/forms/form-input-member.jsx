import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'
import MultipleSelect from '../../../components/admin/multiple-select';
import { ref, push } from "firebase/database";
import { database } from "../../../firebase/firebase";
import { format } from 'date-fns';



const FormInputMember = () => {
    const navigate = useNavigate()
    const { userLoggedIn, currentUser } = useAuth()

    const [formData, setFormData] = useState({
        memberName: '',
        roleMember: '',
      });

      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
        ...formData,
        [id]: value
        });
        console.log(formData)
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        try {
          const newMemberRef = ref(database, 'party_members');
          await push(newMemberRef, {
            ...formData,
            timestamp: timestamp
          });
          alert('Data has been submitted');
          navigate(-1);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      };
    
    return (
        <form method='POST' onSubmit={handleSubmit}>
            <div className="card-body">
                <div className="form-group">
                <label htmlFor="memberName">Member Name</label>
                <input type="text" id="memberName" className="form-control" placeholder="Type Member Name" value={formData.memberName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                <label htmlFor="roleMember">Role</label>
                    <select name="roleMember" className="custom-select form-control-border" id="roleMember" value={formData.roleMember} onChange={handleChange} required>
                    <option value="" disabled selected>Choose</option>
                    <option value="Admin">Admin</option>
                    <option value="Officer">Officer</option>
                    </select>
                </div>
            </div>
            <div className="card-footer">
                <button type="submit" className="btn btn-secondary">Submit</button>
            </div>
        </form>
    );
}
    
export default FormInputMember               