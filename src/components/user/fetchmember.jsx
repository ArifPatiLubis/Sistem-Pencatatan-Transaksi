import { getDatabase, ref, get, child } from "firebase/database";

// Fungsi untuk mengambil data dari Firebase
const FetchMembers = async () => {

  const db = getDatabase();
  const membersRef = ref(db, 'users');
  const snapshot = await get(child(membersRef, `/`));

  if (snapshot.exists()) {
    const membersData = snapshot.val();
    return Object.keys(membersData).map(key => ({
      value: membersData[key].username, // Asumsikan data member memiliki field 'name'
      label: membersData[key].username
    }));
  } else {
    console.log("No data available");
    return [];
  }
};

export default FetchMembers;
