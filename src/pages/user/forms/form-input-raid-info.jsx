import React, {useState,  useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'
import MultipleSelect from '../../../components/admin/multiple-select';
import FetchMembers from '../../../components/admin/fetchmember';
import { ref, push } from "firebase/database";
import { database } from "../../../firebase/firebase";
import { format } from 'date-fns';



const FormInputRaid = () => {
    const navigate = useNavigate()
    const { userLoggedIn, currentUser } = useAuth()
    const [partyMemberOptions, setPartyMemberOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
      // Ambil data members dari Firebase dan simpan dalam state
      const loadMembers = async () => {
        const members = await FetchMembers();
        setPartyMemberOptions(members);
      };
      loadMembers();
    }, []);

    const [formData, setFormData] = useState({
        itemName: '',
        bossName: '',
        crowsGet: '',
        minted: '',
        raidMembers: [],
        crowsReceive: '',
        description: ''
      });

      const handleChange = (e) => {
        const { id, value } = e.target;
        const updatedFormData = {
          ...formData,
          [id]: value
        };


        if (id === 'crowsGet' || id === 'raidMembers') {
          updatedFormData.crowsReceive = calculateCrowsReceive(updatedFormData.crowsGet, updatedFormData.raidMembers.length);
        }
        setFormData(updatedFormData);
      };

      
  

      const handleSelectChange = (selectedOptions) => {
        const updatedFormData = {
          ...formData,
          raidMembers: selectedOptions
        };
        console.log("Selected Raid Members: ", selectedOptions);

        updatedFormData.crowsReceive = calculateCrowsReceive(formData.crowsGet, selectedOptions.length);

        setFormData(updatedFormData);
      };

      const calculateCrowsReceive = (crowsGet, membersCount) => {
        if (crowsGet && membersCount) {
          return (parseInt(crowsGet) / membersCount).toFixed(2);
        }
        return '';
      };
    

      const handleSubmit = async (e) => {
        e.preventDefault();
        const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        try {
          const newRaidRef = ref(database, 'raids_activity');
          await push(newRaidRef, {
            ...formData,
            raidMembers: formData.raidMembers.map(member => member.value),
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
                <label htmlFor="itemName">Item Name</label>
                <input type="text" id="itemName" className="form-control" placeholder="Type Item Name Get" value={formData.itemName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                <label htmlFor="bossName">Boss Name</label>
                <input type="text" id="bossName" name="bossName" value={formData.bossName} className="form-control" placeholder="Type Boss Raid Name" onChange={handleChange} required />
                </div>
                <div className="form-group">
                <label htmlFor="crowsGet">Item Price</label>
                <input type="number" id="crowsGet" name="crowsGet" value={formData.crowsGet} className="form-control" placeholder="Type Amount of Price Item" onChange={handleChange} required />
                </div>
                <div className="form-group">
                <label htmlFor="minted">Minted</label>
                    <select name="minted" className="custom-select form-control-border" id="minted" value={formData.minted} onChange={handleChange} required>
                    <option value="" disabled selected>Choose</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    </select>
                </div>
                <div className="form-group">
                <label htmlFor="raidMembers">Select Member Raid</label>
                <MultipleSelect selectedOptions={formData.raidMembers}handleChange={handleSelectChange} options={partyMemberOptions}></MultipleSelect>
                </div>
                <div className="form-group">
                <label htmlFor="crowsReceive">Crows Receive</label>
                <input type="number" id="crowsReceive" name="crowsReceive" value={formData.crowsReceive} className="form-control" placeholder="Type Amount of Crows Get" onChange={handleChange} required />
                </div>
                <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" value={formData.description} className="form-control" placeholder="Type Description" onChange={handleChange} />
                </div>
            </div>
            <div className="card-footer">
                <button type="submit" className="btn btn-secondary">Submit</button>
            </div>
        </form>
    );
}
    
export default FormInputRaid               