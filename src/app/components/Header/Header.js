'use client';

import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
// import { FiUser } from "react-icons/fi";
import { MdOutlineCheckCircle } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
// ----------------------react icons
import { IoSettingsOutline } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FiTrendingUp, FiFilter, FiCalendar, FiTool, FiUser, FiCheckCircle, FiAlertCircle, FiEye } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineReceipt } from "react-icons/md";
import { BsCalendar } from "react-icons/bs";

function Header() {



  const [status, setStatus] = useState('All Status');
  const [showStatus, setShowStatus] = useState(false);
  const [date, setDate] = useState('All Dates');
  const [showDate, setShowDate] = useState(false);

  const statusRef = useRef();
  const dateRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (statusRef.current && !statusRef.current.contains(e.target)) setShowStatus(false);
      if (dateRef.current && !dateRef.current.contains(e.target)) setShowDate(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statusOptions = ['All Status', 'Active', 'Pending', 'Completed'];
  const dateOptions = ['All Dates', 'Today', 'This Week', 'This Month'];

  // ==================== Service Data ====================
  const serviceData = [
    {
      title: "Brake Maintenance",
      part: "Brake Pad",
      date: " 15 Jan 2025",
      priority: "High",
      changedBy: "Rajesh Kumar (Driver)",
      approvedBy: "Admin Sharma",
      amount: 2500,
      status: "Settled",
      description: "Routine brake pad replacement due to wear and tear. Front brake pads were completely worn out.",
    },
    {
      title: "Engine checkup",
      part: "Engine Oil",
      date: " 10 Jan 2025",
      priority: "Medium",
      changedBy: "City Auto Workshop",
      approvedBy: "Supervisor",
      amount: 1200,
      status: "Pending",
      description: "Engine oil changed with synthetic oil.",
    },
    
  {
    title: "Tire Replacement",
    part: "Front Tires",
    date: " 08 Jan 2025",
    priority: "High",
    changedBy: "MRF Service Center",
    approvedBy: "Admin Sharma",
    amount: "4,500",
    status: "Pending",
    description:
      "Emergency tire replacement after puncture. Both front tires needed replacement due to damage.",
  },
  {
    title: "AC Service",
    part: "AC Filter",
    date: " 05 Jan 2025",
    priority: "Low",
    changedBy: "Cool Air Services",
    approvedBy: "Supervisor Patel",
    amount: "650",
    status: "Settled",
    description:
      "Air conditioning system cleaning and filter replacement for better cooling efficiency.",
  },
  {
    title: "Battery Replacement",
    part: "Car Battery",
    date: " 03 Jan 2025",
    priority: "High",
    changedBy: "Exide Service Point",
    approvedBy: "Admin Sharma",
    amount: "3,200",
    status: "Pending",
    description:
      "Battery replacement due to complete discharge and inability to hold charge.",
  },
];

  

  // ==================== Priority + Status Map ====================
  const PRIORITY = {
    High: { color: "#f75555", bg: "#fff4f4" },
    Medium: { color: "#5286fa", bg: "#f3f7ff" },
    Low: { color: "#31cf6c", bg: "#e6fff3" },
  };

  const STATUS = {
    Settled: { color: "#27c48a", bg: "#ebfff7", icon: <FiCheckCircle size={17} /> },
    Pending: { color: "#ffbe37", bg: "#fffbe8", icon: <FiAlertCircle size={17} /> },
  };






const [filteredServices, setFilteredServices] = useState(serviceData);


useEffect(() => {
  const filtered = serviceData.filter(service => {
    const matchesStatus = status === 'All Status' || service.status === status;
    const matchesDate = date === 'All Dates' || service.date.includes(date);
    return matchesStatus && matchesDate;
  });
  setFilteredServices(filtered);
}, [status, date]);

  
  return (
    <>
      {/* ================= Header ================= */}
      <header className="main-header">
        <div className="header-left">
          <span className="app-title">My Cabs</span>
          <span className="cab-manage">Manage your rides and vehicle</span>
        </div>
        <div className="header-right">
          <input type="text" placeholder="Search cabs..." className="search-bar" />
          <button className="filter-btn">Filter</button>
          <button className="add-cab-btn">+ Add Cab</button>
        </div>
      </header>

      <div className="content-container">
        {/* ================= Breadcrumbs ================= */}
        <div className="breadcrumbs-box">
          <div className="breadcrumbs">
            <div className="breadcrumb-item">
              <span className="breadcrumb-icon">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L2 9h2v7h4v-5h4v5h4V9h2L10 2z" fill="#8D99AE" />
                </svg>
              </span>
              <span>My Cabs</span>
            </div>
            <div className="breadcrumb-separator">{'<'}</div>
            <div className="breadcrumb-item">
              <span>Active Cabs</span>
            </div>
            <div className="breadcrumb-separator">{'<'}</div>
            <div className="breadcrumb-item active-cab-id">
              <span>BR 01AB 1234</span>
            </div>
          </div>
        </div>

        {/* ================= Stats Cards ================= */}
        <div className="stats-row">
          {/* Blue Card */}
          <div className="stat-card card-blue">
            <div className="stat-icon-top-left"><IoSettingsOutline size={36} color="#fff" /></div>
            <div className="stat-card-decor-topright"></div>
            <div className="stat-card-arrow-icon"><FiTrendingUp size={26} color="#fff" style={{ opacity: 0.3 }} /></div>
            <div className="stat-value">5</div>
            <div className="stat-title">Total Services</div>
          </div>

          {/* Orange Card */}
          <div className="stat-card card-orange">
            <div className="stat-icon-top-left"><RiErrorWarningLine size={36} color="#fff" /></div>
            <div className="stat-card-decor-topright"></div>
            <div className="stat-card-arrow-icon"><FiTrendingUp size={26} color="#fff" style={{ opacity: 0.3 }} /></div>
            <div className="stat-value">7,700</div>
            <div className="stat-title">Pending Amount</div>
          </div>

          {/* Green Card */}
          <div className="stat-card card-green">
            <div className="stat-icon-top-left"><IoMdCheckmarkCircleOutline size={36} color="#fff" /></div>
            <div className="stat-card-decor-topright"></div>
            <div className="stat-card-arrow-icon"><FiTrendingUp size={26} color="#fff" style={{ opacity: 0.3 }} /></div>
            <div className="stat-value">2,650</div>
            <div className="stat-title">Settled Amount</div>
          </div>

          {/* Purple Card */}
          <div className="stat-card card-purple">
            <div className="stat-icon-top-left"><LiaRupeeSignSolid size={36} color="#fff" /></div>
            <div className="stat-card-decor-topright"></div>
            <div className="stat-card-arrow-icon"><FiTrendingUp size={26} color="#fff" style={{ opacity: 0.3 }} /></div>
            <div className="stat-value">2070</div>
            <div className="stat-title">Avg. Cost</div>
          </div>
        </div>

        {/* ================= Service Header ================= */}
        <div className="service-header-card">
          <div className="service-header-left">
            <div className="service-header-icon"><IoSettingsOutline size={28} color="#fff" /></div>
            <div>
              <div className="service-header-title">Service History</div>
              <div className="service-header-desc">Comprehensive vehicle maintenance tracking</div>
            </div>
          </div>
          <div className="service-header-right">
            <div className="service-header-record">
              <span className="service-header-count">5</span>
              <span className="service-header-record-label">Total Records</span>
            </div>
            <button className="service-header-btn">+ Add Service</button>
          </div>
        </div>

        {/* ================= Searchbar + Filters ================= */}
<div className="searchbar-row">
  <input type="text" className="searchbar-input" placeholder="Search services, parts, or providers..." />
  
  <div className="status-button-row">
    {statusOptions.map(item => (
      <button
        key={item}
        className={`status-button${status === item ? ' active' : ''}`}
        onClick={() => setStatus(item)}
      >
        {item}
      </button>
    ))}
  </div>

  <div className="date-button-row">
    {dateOptions.map(item => (
      <button
        key={item}
        className={`date-button${date === item ? ' active' : ''}`}
        onClick={() => setDate(item)}
      >
        {item}
      </button>
    ))}
  </div>
</div>


        {/* ================= Render Service Cards ================= */}
{/* ================= Render Filtered Service Cards ================= */}
{filteredServices.map((item, index) => (
  <div className="custom-service-card" key={index}>
    <div className="custom-card-main">
      <div className="custom-meta-col">
        <div className="custom-meta-main-group">
          <div className="custom-meta-mainicon">
            <FiTool size={22} color="#619cf7" />
          </div>
          <div>
            <div className="custom-service-title">{item.title}</div>
            <div className="custom-service-part">Part: {item.part}</div>
          </div>
        </div>
        <div className="custom-meta-date-row">
          <div className="custom-meta-date">
            <BsCalendar size={15} style={{ marginRight: 5 }} /> {item.date}
          </div>
          <span
            className="custom-meta-prio"
            style={{
              background: PRIORITY[item.priority]?.bg,
              color: PRIORITY[item.priority]?.color,
            }}
          >
            {item.priority}
          </span>
        </div>
      </div>
      <div className="custom-info-col">
         <div className="custom-meta-changed">
        <FiUser style={{ marginRight: '6px', verticalAlign: 'middle' }} />
        <span>Changed By</span>
      </div>
        <div className="custom-meta-changed-value">
          {item.changedBy}
        </div>
      <div className="custom-meta-approved">
        <MdOutlineCheckCircle style={{ marginleft: '6px', verticalAlign: 'middle' }} />
        <span>Approved By</span>
      </div>
        <div className="custom-meta-approved-value">
          {item.approvedBy}
        </div>
      </div>
      <div className="custom-amt-col">
        <div className="custom-service-amount">
          <LiaRupeeSignSolid size={20} color="#26c280" />
          <span className="custom-amt-num">₹ {item.amount}</span>
        </div>
        <div
          className="custom-service-status"
          style={{
            background: STATUS[item.status]?.bg,
            color: STATUS[item.status]?.color,
          }}
        >
          {STATUS[item.status]?.icon}
          <span style={{ marginLeft: 5 }}>{item.status}</span>
        </div>
      </div>
      <div className="custom-desc-col">
        <div>
          <div className="custom-desc-label">Service Description</div>
          <div className="custom-desc-value">{item.description}</div>
        </div>
        {/* <div className="custom-action-btnrow">
          <button className="custom-btn custom-btn-view">
            <FiEye size={17} style={{ marginRight: 4 }} /> View
          </button>
          <button className="custom-btn custom-btn-invoice">
            <MdOutlineReceipt size={18} style={{ marginRight: 4 }} /> Invoice
          </button>
        </div> */}
      </div>
       <div className="custom-desc-co2">
   <div className="custom-action-btnrow">
          <button className="custom-btn custom-btn-view">
            <FiEye size={17} style={{ marginRight: 4 }} /> View
          </button>
          <button className="custom-btn custom-btn-invoice">
            <MdOutlineFileDownload size={18} style={{ marginRight: 4 }} /> Invoice
          </button>
        </div>
          </div>
    </div>
  </div>
))}



    

      </div>
    </>
  );
}

export default Header;
