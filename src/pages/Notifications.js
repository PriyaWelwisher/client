import React from 'react'
import Layout from "../components/Layout"
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertSlice';
import toast from "react-hot-toast";
import axios from 'axios';
import { setUser } from "../redux/userSlice";

function Notifications() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("http://localhost:3000/api/user/mark-all-notifications-as-seen", { userId: user._id }, { 
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // Detailed error handling
      toast.error("Something went wrong");

      if (error.response) {
        // If the server returned an error
        toast.error(error.response.data.message || "Server error occurred.");
      } else if (error.request) {
        // If the request was made but no response was received
        toast.error("No response from server. Check server connection.");
      } else {
        // Other errors
        toast.error("Error occurred. Please try again.");
      }
    }
  }

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("http://localhost:3000/api/user/delete-all-notifications", { userId: user._id }, { 
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // Detailed error handling
      toast.error("Something went wrong");

      if (error.response) {
        // If the server returned an error
        toast.error(error.response.data.message || "Server error occurred.");
      } else if (error.request) {
        // If the request was made but no response was received
        toast.error("No response from server. Check server connection.");
      } else {
        // Other errors
        toast.error("Error occurred. Please try again.");
      }
    }
  }

  return (
    <Layout>
      <h1 className="page-title">Notifications</h1>
      <Tabs>
        <Tabs.TabPane tab="unseen" key={0}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={() => markAllAsSeen()}>Mark all as seen</h1>
          </div>
          {user?.unseenNotifications.map((notification) => (
            <div className='card p-2' onClick={() => navigate(notification.onClickPath)}>
              <div className='card-text'>{notification.message}</div>

            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="seen" key={1}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor"onClick={()=>deleteAll()}>Delete all</h1>
          </div>
          {user?.seenNotifications.map((notification) => (
            <div className='card p-2' onClick={() => navigate(notification.onClickPath)}>
              <div className='card-text'>{notification.message}</div>

            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>

    </Layout>
  )
}

export default Notifications