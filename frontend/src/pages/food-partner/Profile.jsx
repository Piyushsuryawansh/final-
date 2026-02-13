import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/profile.css';

const Profile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/food-partner/${id}`,
          { withCredentials: true }
        );

        console.log('API RESPONSE 👉', res.data);

        setProfile(res.data.foodPartner);
        setVideos(res.data.foodPartner.foodItems || []);
      } catch (err) {
        console.error('API ERROR ❌', err);
        setError(
          err.response?.data?.message || 'Something went wrong'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <p style={{ padding: '2rem' }}>Loading profile...</p>;
  }

  if (error) {
    return (
      <p style={{ padding: '2rem', color: 'red' }}>
        {error}
      </p>
    );
  }

  return (
    <main className="profile-page">
      {/* ================= HEADER ================= */}
      <section className="profile-header">
        <div className="profile-meta">
          <img
            className="profile-avatar"
            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500"
            alt="Profile"
          />

          <div className="profile-info">
            <h1 className="profile-pill profile-business">
              {profile?.name}
            </h1>
            <p className="profile-pill profile-address">
              {profile?.address}
            </p>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat-label">
              Total meals
            </span>
            <span className="profile-stat-value">
              {videos.length}
            </span>
          </div>

          <div className="profile-stat">
            <span className="profile-stat-label">
              Customer served
            </span>
            <span className="profile-stat-value">
              {videos.length}
            </span>
          </div>
        </div>
      </section>

      <hr className="profile-sep" />

      {/* ================= VIDEOS ================= */}
      <section
        className="profile-grid"
        aria-label="Food videos"
      >
        {videos.length === 0 ? (
          <p style={{ padding: '1rem' }}>
            No food items uploaded yet.
          </p>
        ) : (
          videos.map((v) => (
            <div
              key={v._id}
              className="profile-grid-item"
            >
              <video
                className="profile-grid-video"
                src={v.video}
                muted
                controls
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default Profile;
