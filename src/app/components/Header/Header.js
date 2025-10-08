"use client";

import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
// import { FiUser } from "react-icons/fi";
import { MdOutlineCheckCircle } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
// ----------------------react icons
import { IoSettingsOutline } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
import {
  FiTrendingUp,
  FiFilter,
  FiCalendar,
  FiTool,
  FiUser,
  FiCheckCircle,
  FiAlertCircle,
  FiEye,
} from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineReceipt } from "react-icons/md";
import { BsCalendar } from "react-icons/bs";
import { LuUser } from "react-icons/lu";

//  ---------------Date popup
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineAccessTime } from "react-icons/md";
import { MdOutlineCameraAlt } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { GoImage } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";
// import { FiCheckCircle } from "react-icons/fi";

// import { FiTool } from "react-icons/fi";
//  ---------------Date popup
// ------------------------------- photo documentation

// ------------------------------- photo documentation
// -----------------------------add service popup

function AddServiceModal({ isOpen, onClose, onCreate }) {
  if (!isOpen) return null;

  const [uploads, setUploads] = useState([]);
  const [formData, setFormData] = useState({
    serviceName: "",
    componentChanged: "",
    partName: "",
    quantity: "",
    serviceDate: "",
    serviceProvider: "",
    approvedBy: "",
    cost: "",
    paymentStatus: "",
    description: "",
  });




  function handleFileInput(event) {
    const files = Array.from(event.target.files);

    for (const file of files) {
      if (
        !["image/png", "image/jpeg", "image/gif", "application/pdf"].includes(
          file.type
        )
      ) {
        alert("Only image or PDF files allowed!");
        return;
      }
      if (file.size > 10485760) {
        alert("Max file size is 10MB.");
        return;
      }
    }

    files.forEach((file) => {
      const url = file.type.startsWith("image")
        ? URL.createObjectURL(file)
        : "";
      const newUpload = {
        name: file.name,
        size: file.size,
        type: file.type,
        url,
        progress: 0,
        status: "Uploading",
        id: `${file.name}-${file.size}-${Date.now()}`,
      };
      setUploads((prev) => [...prev, newUpload]);
      simulateUpload(newUpload.id);
    });
  }


  const handleCreateService = () => {
    if (!formData.serviceName || !formData.serviceDate) {
      alert("Please fill required fields");
      return;
    }

    onCreate(formData); // Parent ko data bhejna

    // Form reset
    setFormData({
      serviceName: "",
      componentChanged: "",
      partName: "",
      quantity: "",
      serviceDate: "",
      serviceProvider: "",
      approvedBy: "",
      cost: "",
      paymentStatus: "",
      description: "",
    });

    // Uploads reset
    setUploads([]);

    // File input reset
    const fileInput = document.getElementById("file-input");
    if (fileInput) fileInput.value = "";

    // Modal close karna
    onClose();
  };

  function simulateUpload(id) {
    let progress = 0;
    const interval = setInterval(() => {
      setUploads((prev) =>
        prev.map((file) => {
          if (file.id === id) {
            let newProgress = Math.min(file.progress + 13, 100);
            return {
              ...file,
              progress: newProgress,
              status: newProgress === 100 ? "Uploaded" : "Uploading",
            };
          }
          return file;
        })
      );
      progress += 13;
      if (progress >= 100) clearInterval(interval);
    }, 150);
  }

  function handleRemove(id) {
    setUploads((prev) => prev.filter((file) => file.id !== id));
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* -------------------------------popup up  */}
      <div className="modal-large" onClick={(e) => e.stopPropagation()}>
        {/* Popup Header */}
        <div className="modal-header">
          <span className="modal-icon">+</span>
          <div className="modal-heading-text">
            <h2>Add New Service Record</h2>
            <p>Create a comprehensive maintenance record with all details</p>
          </div>
          <span className="modal-arrow">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline
                points="5,10 7.5,7 10,10"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        {/* Basic Information */}

        <div className="form-sections-container">
          <div className="section-card">
            <div className="section-header">
              <span className="section-icon">
                <FiTool />
              </span>
              <div>
                <h3>Basic Information</h3>
                <small>Essential service details</small>
              </div>
            </div>
            <div className="section-content grid">
              {/* Left half */}
              <div className="section-left">
                <div className="input-group">
                  <label>
                    <span className="icon">
                      <FiTool />
                    </span>{" "}
                    Service Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Brake Maintenance, Oil Change"
                    value={formData.serviceName}
                    onChange={(e) => {
                      const onlyText = e.target.value.replace(
                        /[^A-Za-z\s]/g,
                        ""
                      );
                      setFormData({ ...formData, serviceName: onlyText });
                    }}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>
                    <span className="icon">
                      <IoSettingsOutline />
                    </span>{" "}
                    Component Changed *
                  </label>
                  <input
                    placeholder="e.g., Brake Pads, Oil Filter"
                    value={formData.componentChanged}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        componentChanged: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              {/* Right half */}
              <div className="section-right">
                <div className="part-qty-row">
                  <div className="input-group">
                    <label>
                      <span className="icon">
                        <IoSettingsOutline />
                      </span>{" "}
                      Part Name *
                    </label>
                    <input
                      placeholder="e.g., Front Brake System, Engine"
                      value={formData.partName}
                      onChange={(e) =>
                        setFormData({ ...formData, partName: e.target.value })
                      }
                    />
                  </div>
                  <div className="input-group quantity-no-label">
                    <label style={{ visibility: "hidden" }}>&nbsp;</label>
                    <input
                      type="number"
                      placeholder="No. of Quantity"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label>
                    <span className="icon">
                      <CiCalendarDate />
                    </span>{" "}
                    Service Date *
                  </label>
                  <input
                    type="date"
                    value={formData.serviceDate}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceDate: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------  Personnel & Financial  */}
          <div className="personnel-section-card">
            <div className="personnel-section-header">
              <span className="personnel-section-icon">
                <LuUser />
              </span>
              <div>
                <h3>Personnel & Financial</h3>
                <small>Who performed the service and cost details</small>
              </div>
            </div>
            <div className="personnel-section-content">
              <div className="personnel-input-row">
                <div className="personnel-input-group">
                  <label>
                    <span className="pi-icon">
                      <LuUser />
                    </span>{" "}
                    Service Provider *
                  </label>
                  <input
                    placeholder="Select service provider"
                    value={formData.serviceProvider}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        serviceProvider: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="personnel-input-group">
                  <label>
                    <span className="pi-icon">
                      <FiCheckCircle />
                    </span>{" "}
                    Approved By *
                  </label>
                  <input
                    placeholder="Select approver"
                    value={formData.approvedBy}
                    onChange={(e) =>
                      setFormData({ ...formData, approvedBy: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="personnel-input-row">
                <div className="personnel-input-group">
                  <label>
                    <span className="pi-icon">₹</span> Service Cost (₹) *
                  </label>
                  <input
                    type="number"
                    placeholder="₹ 0"
                    value={formData.cost}
                    onChange={(e) =>
                      setFormData({ ...formData, cost: e.target.value })
                    }
                  />
                </div>
                <div className="personnel-input-group">
                  <label>
                    <span className="pi-icon">
                      <MdOutlineAccessTime />
                    </span>{" "}
                    Payment Status *
                  </label>
                  <input
                    placeholder="Select payment status"
                    value={formData.paymentStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentStatus: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------  Personnel & Financial  */}
          {/* Photo Documentation */}

          <div className="section-card photo-section">
            <div className="section-header photo-header">
              <span className="section-icon photo-icon">
                <MdOutlineCameraAlt />
              </span>
              <div>
                <h3>Photo Documentation</h3>
                <small>Upload service photos for better record keeping</small>
              </div>
            </div>

            <div className="photo-upload-area">
              <label className="upload-label" htmlFor="file-input">
                <input
                  type="file"
                  id="file-input"
                  accept=".png, .jpg, .jpeg, .gif, .pdf"
                  onChange={handleFileInput}
                  multiple
                  hidden
                />
                <div className="upload-icon">
                  <LuUpload className="upload-icon-svg" />
                </div>
                <div className="upload-heading">Upload Service Photos</div>
                <div className="upload-desc">
                  Drag & drop files here or click to browse
                </div>
                <div className="upload-meta">
                  <span className="upload-meta-text">
                    <GoImage /> Images
                  </span>
                  <FaCircle className="upload-dot" size={8} />
                  <span className="upload-meta-text">📄 PDF</span>
                  <FaCircle className="upload-dot" size={8} />
                  <span className="upload-meta-text">Max 10MB</span>
                </div>
              </label>
            </div>

            {/* --------------------upload img background  */}
            <div className="upload-preview-list" style={{ marginTop: 20 }}>
              {uploads.map((file) => (
                <div
                  key={file.id}
                  style={{
                    background: "#edfff7",
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    padding: "1rem 1.5rem",
                    marginBottom: 18,
                    boxShadow: "0 4px 12px 0 #d6f6ee88",
                    position: "relative",
                  }}
                >
                  {/* ----------------------------------uplaod img background shado  */}
                  {/* Left-side thumbnail */}
                  {file.type.startsWith("image") ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      style={{
                        width: 86,
                        height: 86,
                        borderRadius: "15%",
                        objectFit: "cover",
                        background: "black",
                        border: "2.5px solid #ffffffff",
                        // boxShadow: "0 4px 16px #b4daf2",
                        marginRight: 20,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: "#eef0f4",
                        marginRight: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        color: "#3360cc",
                        border: "2px solid #fff",
                      }}
                    >
                      📄
                    </div>
                  )}

                  {/* File meta info and loading */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "1.09rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span>{file.name}</span>
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        marginTop: 2,
                        color: "#6b7280",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 6, // gap between elements
                      }}
                    >

                      {/* ----------------------------------------upload img dot  */}
                      {/* Dot before size */}
                      <FaCircle size={13} style={{ color: "#227c31" }} />

                      {/* File size */}
                      <span>{(file.size / 1024).toFixed(2)} KB</span>

                      {/* Dot before type */}
                      <FaCircle size={13} style={{ color: "#377affff" }} />

                      {/* File type */}
                      <span
                        style={{
                          color: "#6b7280",
                          fontWeight: 600,
                          fontSize: 13,
                        }}
                      >
                        {file.type.includes("pdf")
                          ? "PDF"
                          : file.type.replace("image/", "").toUpperCase()}
                      </span>
                    </div>

                    <div
                      style={{
                        marginTop: 12,
                        width: "100%",
                        background: "#ccfae7",
                        height: 7,
                        borderRadius: 5,
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: `${file.progress}%`,
                          background: "#08c97b",
                          height: 7,
                          borderRadius: 5,
                          transition: "width .3s",
                          position: "absolute",
                          left: 0,
                          top: 0,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: 7,
                        fontSize: 14,
                        color: "#08c977",
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                      }}
                    >
                      {file.progress === 100 ? (
                        <>
                          <span style={{ fontSize: 18, color: "#08c977" }}>
                            ✔️
                          </span>
                          Upload successful! Ready to save.
                        </>
                      ) : (
                        <>
                          <span style={{ fontSize: 17, color: "#227c31" }}>
                            ⏳
                          </span>
                          Uploading...
                        </>
                      )}
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => handleRemove(file.id)}
                    style={{
                      background: "#ffe5e5", // light red background
                      border: "1px solid #ffabbaff", // red border
                      borderRadius: "25px",
                      color: "#ee4e6b",
                      fontSize: 20,
                      width: 30, // button width
                      height: 30, // button height
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 20,
                      cursor: "pointer",
                      position: "absolute",
                      right: 25,
                      top: 12,
                    }}
                    title="Remove file"
                    tabIndex={0}
                  >
                    <RiDeleteBinLine size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Documentation */}

          {/* Service Description */}
          <div className="section-card service-description-section">
            <div className="section-header service-description-header">
              <span className="section-icon service-description-icon">📄</span>
              <div>
                <h3>Service Description</h3>
                <small>Detailed information about the service performed</small>
              </div>
            </div>
            <div className="service-description-content">
              <label className="input-label description-label">
                <span className="desc-label-icon">📄</span> Detailed Description
                *
              </label>
              <textarea
                className="service-textarea"
                maxLength={1000}
                rows={5}
                placeholder={`Provide comprehensive details about the service performed, including: • Reason for maintenance or repair • Condition of parts before service • Work performed and parts replaced • Any issues discovered during service • Recommendations for future maintenance • Quality of service and any concerns`}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <div className="char-count">0/1000 characters</div>
            </div>
          </div>
        </div>

        {/* ------------------ clear form create service  */}
 
        {/* ------------------ clear form create service  */}


               <div className="modal-actions-row">
          <button
            type="button"
            className="clear-form-btn"
            onClick={() => {
              // Reset form fields
              setFormData({
                serviceName: "",
                componentChanged: "",
                partName: "",
                quantity: "",
                serviceDate: "",
                serviceProvider: "",
                approvedBy: "",
                cost: "",
                paymentStatus: "",
                description: "",
              });

              // Reset uploads
              setUploads([]);

              // Optional: file input भी reset कर देंगे
              const fileInput = document.getElementById("file-input");
              if (fileInput) fileInput.value = "";
            }}
          >
            &#10005; Clear Form
          </button>

          {/* <button className="create-service-btn">
            <span role="img" aria-label="Save" style={{ fontSize: "18px" }}>
              📋
            </span>
            Create Service Record
          </button> */}

          <button className="create-service-btn" onClick={handleCreateService}>
  <span role="img" aria-label="Save" style={{ fontSize: "18px" }}>
    📋
  </span>
  Create Service Record
</button>

        </div>
      </div>




      {/* ------------------popup up  */}
    </div>
  );
}

// -----------------------------add service popup
function Header() {
  const [status, setStatus] = useState("All Status");
  const [showStatus, setShowStatus] = useState(false);
  const [date, setDate] = useState("All Dates");
  const [showDate, setShowDate] = useState(false);
  

  const statusRef = useRef();
  const dateRef = useRef();

  // / -----------------------------add service popup

  const [isModalOpen, setModalOpen] = useState(false);
  


    // Naya service record add karne ke liye function
  // const addNewService = (newService) => {
  //   const formattedService = {
  //     title: newService.serviceName,
  //     part: newService.partName,
  //     date: new Date(newService.serviceDate).toLocaleDateString("en-GB", {
  //       day: '2-digit',
  //       month: 'short',
  //       year: 'numeric',
  //     }),
  //     priority: 'Medium', // Default priority, aap form se customize kar sakte hain
  //     changedBy: newService.componentChanged,
  //     approvedBy: newService.approvedBy,
  //     amount: newService.cost,
  //     status: 'Pending', // Default status
  //     description: newService.description,
  //   };

  //   setServiceData((prev) => [formattedService, ...prev]);
  // };


  const addNewService = (newService) => {
  const formattedService = {
    title: newService.serviceName,
    part: newService.partName,
    date: new Date(newService.serviceDate).toLocaleDateString("en-GB", { day:'2-digit', month:'short', year:'numeric' }),
    priority: 'Medium',
    changedBy: newService.componentChanged,
    approvedBy: newService.approvedBy,
    amount: newService.cost,
    status: 'Pending',
    description: newService.description,
  };

  setServiceData((prev) => [formattedService, ...prev]);
};



         
  
  // / -----------------------------add service popup
  useEffect(() => {
    function handleClickOutside(e) {
      if (statusRef.current && !statusRef.current.contains(e.target))
        setShowStatus(false);
      if (dateRef.current && !dateRef.current.contains(e.target))
        setShowDate(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statusOptions = ["All Status", "Active", "Pending", "Completed"];
  const dateOptions = ["All Dates", "Today", "This Week", "This Month"];

  // ==================== Service Data ====================
  // const serviceData = [
  //   {
  //     title: "Brake Maintenance",
  //     part: "Brake Pad",
  //     date: " 15 Jan 2025",
  //     priority: "High",
  //     changedBy: "Rajesh Kumar (Driver)",
  //     approvedBy: "Admin Sharma",
  //     amount: 2500,
  //     status: "Settled",
  //     description:
  //       "Routine brake pad replacement due to wear and tear. Front brake pads were completely worn out.",
  //   },
  //   {
  //     title: "Engine checkup",
  //     part: "Engine Oil",
  //     date: " 10 Jan 2025",
  //     priority: "Medium",
  //     changedBy: "City Auto Workshop",
  //     approvedBy: "Supervisor",
  //     amount: 1200,
  //     status: "Pending",
  //     description: "Engine oil changed with synthetic oil.",
  //   },

  //   {
  //     title: "Tire Replacement",
  //     part: "Front Tires",
  //     date: " 08 Jan 2025",
  //     priority: "High",
  //     changedBy: "MRF Service Center",
  //     approvedBy: "Admin Sharma",
  //     amount: "4,500",
  //     status: "Pending",
  //     description:
  //       "Emergency tire replacement after puncture. Both front tires needed replacement due to damage.",
  //   },
  //   {
  //     title: "AC Service",
  //     part: "AC Filter",
  //     date: " 05 Jan 2025",
  //     priority: "Low",
  //     changedBy: "Cool Air Services",
  //     approvedBy: "Supervisor Patel",
  //     amount: "650",
  //     status: "Settled",
  //     description:
  //       "Air conditioning system cleaning and filter replacement for better cooling efficiency.",
  //   },
  //   {
  //     title: "Battery Replacement",
  //     part: "Car Battery",
  //     date: " 03 Jan 2025",
  //     priority: "High",
  //     changedBy: "Exide Service Point",
  //     approvedBy: "Admin Sharma",
  //     amount: "3,200",
  //     status: "Pending",
  //     description:
  //       "Battery replacement due to complete discharge and inability to hold charge.",
  //   },
  // ];

   const [serviceData, setServiceData] = useState([
    {
      title: "Brake Maintenance",
      part: "Brake Pad",
      date: " 15 Jan 2025",
      priority: "High",
      changedBy: "Rajesh Kumar (Driver)",
      approvedBy: "Admin Sharma",
      amount: 2500,
      status: "Settled",
      description:
        "Routine brake pad replacement due to wear and tear. Front brake pads were completely worn out.",
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
  ]);

  // ==================== Priority + Status Map ====================
  const PRIORITY = {
    High: { color: "#f75555", bg: "#fff4f4" },
    Medium: { color: "#5286fa", bg: "#f3f7ff" },
    Low: { color: "#31cf6c", bg: "#e6fff3" },
  };

  const STATUS = {
    Settled: {
      color: "#27c48a",
      bg: "#ebfff7",
      icon: <FiCheckCircle size={17} />,
    },
    Pending: {
      color: "#ffbe37",
      bg: "#fffbe8",
      icon: <FiAlertCircle size={17} />,
    },
  };

  

  const [filteredServices, setFilteredServices] = useState(serviceData);

  // useEffect(() => {
  //   const filtered = serviceData.filter((service) => {
  //     const matchesStatus =
  //       status === "All Status" || service.status === status;
  //     const matchesDate = date === "All Dates" || service.date.includes(date);
  //     return matchesStatus && matchesDate;
  //   });
  //   setFilteredServices(filtered);
  // }, [status, date]);

  useEffect(() => {
  const filtered = serviceData.filter((service) => {
    const matchesStatus = status === "All Status" || service.status === status;
    const matchesDate = date === "All Dates" || service.date.includes(date);
    return matchesStatus && matchesDate;
  });
  setFilteredServices(filtered);
}, [status, date, serviceData]);


  // ------------------------------------Add service popup

  // ------------------------------------Add service popup
  return (
    <>
      {/* ================= Header ================= */}
      <header className="main-header">
        <div className="header-left">
          <span className="app-title">My Cabs</span>
          <span className="cab-manage">Manage your rides and vehicle</span>
        </div>
        <div className="header-right">
          <input
            type="text"
            placeholder="Search cabs..."
            className="search-bar"
          />
          <button className="filter-btn">Filter</button>
          <button className="add-cab-btn">+ Add Cab</button>
        </div>
      </header>
      <div className="scroll-container">

          {/* ------------------------------------------------------------------------content-container  */}
        <div className="content-container">
          {/* ================= Breadcrumbs ================= */}
          <div className="breadcrumbs-box">
            <div className="breadcrumbs">
              <div className="breadcrumb-item">
                <span className="breadcrumb-icon">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 2L2 9h2v7h4v-5h4v5h4V9h2L10 2z"
                      fill="#8D99AE"
                    />
                  </svg>
                </span>
                <span>My Cabs</span>
              </div>
              <div className="breadcrumb-separator">{"<"}</div>
              <div className="breadcrumb-item">
                <span>Active Cabs</span>
              </div>
              <div className="breadcrumb-separator">{"<"}</div>
              <div className="breadcrumb-item active-cab-id">
                <span>BR 01AB 1234</span>
              </div>
            </div>
          </div>

          {/* ================= Stats Cards ================= */}
          <div className="stats-row">
            {/* Blue Card */}
            <div className="stat-card card-blue">
              <div className="stat-icon-top-left">
                <IoSettingsOutline size={36} color="#fff" />
              </div>
              <div className="stat-card-decor-topright"></div>
              <div className="stat-card-arrow-icon">
                <FiTrendingUp size={26} color="#fff" style={{ opacity: 0.3 }} />
              </div>
              <div className="stat-value">5</div>
              <div className="stat-title">Total Services</div>
            </div>

            {/* Orange Card */}
            <div className="stat-card card-orange">
              <div className="stat-icon-top-left">
                <RiErrorWarningLine size={36} color="#fff" />
              </div>
              <div className="stat-card-decor-topright"></div>
              <div className="stat-card-arrow-icon">
                <MdAccessTime size={26} color="#fff" style={{ opacity: 0.3 }} />
              </div>
              <div className="stat-value">7,700</div>
              <div className="stat-title">Pending Amount</div>
            </div>

            {/* Green Card */}
            <div className="stat-card card-green">
              <div className="stat-icon-top-left">
                <IoMdCheckmarkCircleOutline size={36} color="#fff" />
              </div>
              <div className="stat-card-decor-topright"></div>
              <div className="stat-card-arrow-icon">
                <FiTrendingUp size={26} color="#fff" style={{ opacity: 0.3 }} />
              </div>
              <div className="stat-value">2,650</div>
              <div className="stat-title">Settled Amount</div>
            </div>

            {/* Purple Card */}
            <div className="stat-card card-purple">
              <div className="stat-icon-top-left">
                <LiaRupeeSignSolid size={36} color="#fff" />
              </div>
              <div className="stat-card-decor-topright"></div>
              <div className="stat-card-arrow-icon">
                <FiTrendingUp size={26} color="#fff" style={{ opacity: 0.3 }} />
              </div>
              <div className="stat-value">2070</div>
              <div className="stat-title">Avg. Cost</div>
            </div>
          </div>

          {/* ================= Service Header ================= */}
          <div className="service-header-card">
            <div className="service-header-left">
              <div className="service-header-icon">
                <IoSettingsOutline size={28} color="#fff" />
              </div>
              <div>
                <div className="service-header-title">Service History</div>
                <div className="service-header-desc">
                  Comprehensive vehicle maintenance tracking
                </div>
              </div>
            </div>
            <div className="service-header-right">
              <div className="service-header-record">
                <span className="service-header-count">5</span>
                <span className="service-header-record-label">
                  Total Records
                </span>
              </div>

              {/* ----------------------------------------service history  */}

              {/* <button className="service-header-btn">+ Add Service</button> */}

              {/* ----------------------------------------service history Button */}
              <button
                className="service-header-btn"
                onClick={() => setModalOpen(true)}
              >
                + Add Service
              </button>
        <AddServiceModal
  isOpen={isModalOpen}
  onClose={() => setModalOpen(false)}
  onCreate={addNewService}  // Ensure yeh ek function hi hai
/>
              {/* ----------------------------------------service history Button */}

              {/* ----------------------------------------service history  */}
            </div>
          </div>

          {/* ================= Searchbar + Filters ================= */}
          <div className="searchbar-row">
            <input
              type="text"
              className="searchbar-input"
              placeholder="Search services, parts, or providers..."
            />

            <div className="status-button-row">
              {statusOptions.map((item) => (
                <button
                  key={item}
                  className={`status-button${status === item ? " active" : ""}`}
                  onClick={() => setStatus(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="date-button-row">
              {dateOptions.map((item) => (
                <button
                  key={item}
                  className={`date-button${date === item ? " active" : ""}`}
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
                      <div className="custom-service-part">
                        Part: {item.part}
                      </div>
                    </div>
                  </div>
                  <div className="custom-meta-date-row">
                    <div className="custom-meta-date">
                      <BsCalendar size={15} style={{ marginRight: 5 }} />{" "}
                      {item.date}
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
                    <FiUser
                      style={{ marginRight: "6px", verticalAlign: "middle" }}
                    />
                    <span>Changed By</span>
                  </div>
                  <div className="custom-meta-changed-value">
                    {item.changedBy}
                  </div>
                  <div className="custom-meta-approved">
                    <MdOutlineCheckCircle
                      style={{ marginleft: "6px", verticalAlign: "middle" }}
                    />
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
                   
                </div>
                <div className="custom-desc-co2">
                  <div className="custom-action-btnrow">
                    <button className="custom-btn custom-btn-view">
                      <FiEye size={17} style={{ marginRight: 4 }} /> View
                    </button>
                    <button className="custom-btn custom-btn-invoice">
                      <MdOutlineFileDownload
                        size={18}
                        style={{ marginRight: 4 }}
                      />{" "}
                      Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ------------------------------------------------------------------------content-container  */}
      </div>
    </>
  );
}

export default Header;
