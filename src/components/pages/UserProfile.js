import  { useEffect, useState } from 'react';
import API from '../../api/axiosInstance';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { user, setUser } = useAuth(); // assuming you have setUser in context to update user data after edit
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
const [profilePic, setProfilePic] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Assuming your backend has an endpoint to get the current user's profile
        const res = await API.get('/users/me'); 
        setProfile(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('username', username);
  formData.append('email', email);
  if (profilePic) formData.append('profilePicture', profilePic);

  try {
    const res = await API.put('/users/me', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setProfile(res.data);
    setUser(res.data);
    alert('Profile updated');
    setIsEditing(false);
  } catch (err) {
    alert(err.response?.data?.message || 'Update failed');
  }
};


  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <div className="user-profile">
      <h2>Your Profile</h2>

      {isEditing ? (
       <form onSubmit={handleUpdate} encType="multipart/form-data">
 <div> 
  <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />
          
            <label>Username:</label><br />
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Email:</label><br />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit">Save</button>
          <button type="button" onClick={handleEditToggle} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <img
  src={`http://localhost:5000/uploads/profile/${user.profilePic}`}
  alt="Profile"
  style={{ width: '100px', borderRadius: '50%' }}
/>

          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <button onClick={handleEditToggle}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
