import React from 'react';
import './ButtonCenter.css'; // Create a CSS file for styling
import { AppBar, Toolbar, Typography, IconButton, Box, Button, DialogTitle, Dialog, DialogContentText, DialogContent, DialogActions, Menu, Tooltip, MenuItem, ListItemIcon, } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChangePassword from './ChangePassword';
import { BASE_URL } from './config';



const handleLogout = () => {

  localStorage.removeItem('token');

  window.location.href = '/login';
};



const ButtonCenter = () => {

  const navigate = useNavigate(); // Initialize useNavigate
  const [empIdExists, setEmpIdExists] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data
  const [registrations, setRegistrations] = useState([]);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [Empmail, setEmpmail] = useState(atob(localStorage.getItem('empMail')));
  const [selectedImage, setSelectedImage] = useState(null);

  

  const [isHovering, setIsHovering] = useState(false);
  const [isHovering1, setIsHovering1] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);

  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseEnter1 = () => {
    setIsHovering1(true);

  };
  const handleMouseLeave1 = () => {
    setIsHovering1(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleChangePassword = () => {
    setShowChangePassword(true);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenProfileCard = async () => {
    const empid = localStorage.getItem('Empid'); // Make sure this contains the correct Empid
    try {
      // Fetch the user data based on empid
      const response = await fetch(`${BASE_URL}/GetKPI/${empid}`);
      const userData = await response.json();

      // console.log(userData.message[0].Image, "userData83");
      if (userData.message.length > 0) {
        // Assuming the API returns an array of users, use the first one
        setUserData(userData.message[0]);
        setIsProfileCardOpen(true); // Open the profile card
        handleCloseUserMenu(); 
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  // Function to toggle the Change Password component
  const toggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };


  const handleCloseProfileCard = () => {
    setIsProfileCardOpen(false); // Close the profile card
  };
  const fetchUserProfile = async () => {
    try {
      const empid = localStorage.getItem('Empid');
      const response = await fetch(`${BASE_URL}/GetKPI?Empid=${empid}`);
      const data = await response.json();

      // Filter the data to find the user with the matching Empid
      const userData = data.message.find(user => user.Empid === parseInt(empid, 10));

      if (userData) {
        // Now you have the user data
        console.log(userData);
        // setUserData(userData); // Set the user data in your state if needed
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const handleToggleImagePreview = () => {
    setShowImagePreview(!showImagePreview);
  };

  useEffect(() => {
    if (isProfileCardOpen) {
      fetchUserProfile();
    }
  }, [isProfileCardOpen]);


  const handleFillFormClick = async () => {
    const empIdExistsInAPI = empIdExists; // Use the value from state
    try {
      // Fetch the data from the endpoint
      const response = await fetch(`${BASE_URL}/EmployeeAllDataKPIGet`);
      const data = await response.json();

      // Check if empid from localStorage matches any of the Empid in the fetched data
      const isEmpidExists = data.employees.some((employee) => employee.Empid === parseInt(empid));

      if (!isEmpidExists) {
        // If empid exists, navigate to the form
        navigate('/eform');
      } else {
        // If empid does not exist, open the dialog
        setOpenDialog(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch the registration data from the server when the component mounts
    const fetchRegistrations = async () => {
      try {
        const response = await fetch(`${BASE_URL}/GetKPI`); // Replace with the correct URL for your backend
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setRegistrations(data.message);

        // Extract Firstname from the API response
        const firstnames = data.message.map(item => item.Firstname);

      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchRegistrations();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  
    const getBase64 = (file, callback) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => callback(reader.result);
      reader.onerror = (error) => console.error('Error converting file to base64:', error);
    };
  
    if (file) {
      getBase64(file, (base64Image) => {
        const formData = {
          firstname,
          lastname,
          Image: base64Image,
        };
  
        fetch(`${BASE_URL}/updateImage/${firstname}/${lastname}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          
        })
          .then((response) => {
            console.log('Raw Response:', response);
            window.location.reload();
            return response.json();
          })
          .then((data) => {
            console.log('Parsed Response:', data.message);
            if (data && data.message === 'Image updated successfully') {
              console.log('Image uploaded successfully');
           
            } else {
              console.error('Image upload failed');
            }
          })
          .catch((error) => {
            console.error('Error uploading image:', error);
          });
      });
    }
  };
  
  

  const empid = localStorage.getItem('Empid');
  const handleViewDetailsClick = () => {
    // Handle Fill KPI Form button click
    navigate(`/eget/${empid}`); // Navigate to the 'mform' route
  };

  const firstname = localStorage.getItem('firstname');
  const lastname = localStorage.getItem('lastname');
  const username = firstname + " " + lastname

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className="navigation-header">
          <img style={{ width: '60px', borderRadius: '50%' }} src='data:image/jpeg;base64,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' alt='not found' />

          <div className="userInfo">
            <Typography variant="h6" className="welcome-text">
              Welcome
            </Typography>
            <h3 className="userName-Style">{username.toUpperCase()}</h3>
          </div>
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="inherit"
            >
              <Tooltip title="Open settings">

                {registrations.map((registration) => (
                  registration.Firstname === firstname && (
                    <td>
                      {registration.Image && (
                        <img
                          src={registration.Image}
                          alt="Profile"
                          style={{
                            width: '60px', 
                            height: '60px', 
                            borderRadius: '50%',
                            marginRight: '8px',
                          }}

                        />
                      )}
                    </td>
                  )
                ))}
              </Tooltip>
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <MenuItem key="Profile" onClick={handleOpenProfileCard}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem key="ProfileChange">
                <label htmlFor="imageUpload">
                  <ListItemIcon>
                    <CameraAltIcon fontSize="small" /> {/* Add the CameraAltIcon */}
                  </ListItemIcon>
                  Profile Change
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </MenuItem>

              <MenuItem key="ChangePassword" onClick={handleChangePassword}>
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                Change Password
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {showChangePassword && (
        <IconButton
          aria-label="close"
          onClick={toggleChangePassword}
          style={{ marginLeft: '56%', marginBottom: '-17%' }}
        >
          <CloseIcon style={{ color: 'red', width: '10%', height: '40%' }} />
        </IconButton>
      )}
      {showChangePassword ? (

        <ChangePassword />

      ) : (
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor:'#c6e2ff', textAlign:'center' }}>
        <div className="button-center-container" style={{ flex: 1 }}>
          <div className='Paragraph-division'>
          <p className=" main-Heading" style={{ color: '#0d4166', marginBottom:'-10px' }}>Fill KPI Form and View Submitted Details.</p>
          <p  className='sub-Heading' style={{ marginBottom:'-10px' }}>Click the Fill KPI form button to provide the ratings on your performance.</p>
          <p  className='sub-Heading' style={{ marginBottom:'30px'}}>Click the view details button to review the previously submitted details.</p>
          
          </div>
          <div style={{textAlign:'center'}}>
          <Button style={{ backgroundColor: isHovering ? '#db764f' : '#d95623'}}
            className="kpi-form"
            variant="contained"
            onClick={handleFillFormClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Fill KPI Form
          </Button>
          <Button style={{ backgroundColor: isHovering1 ? '#db764f' : '#d95623', marginLeft: '20px' }} className="view-details" variant="contained"
            onClick={handleViewDetailsClick}
            onMouseEnter={handleMouseEnter1}
            onMouseLeave={handleMouseLeave1}>
            View Details
          </Button>
          </div>
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)} >
            <DialogContent style={{ width: '420px' }}>
              <img
                src="https://badge-exam.miraclesoft.com/assets/ecert/Completed-test.svg"
                alt="Your Image Alt Text"
                style={{ maxWidth: '100%', maxHeight: '200px', marginLeft: '23%' }}
              />
              <DialogContentText style={{ fontSize: '18px', marginLeft: '10%', fontWeight: 'bold', color: 'red' }}>
                You have already submitted the form.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      
        <div style={{ flex: 1 }}>
          <img
            src="https://empxtrack.com/wp-content/uploads/2021/03/employee-performance-appraisal-software.png"
            alt="Your Image Alt Text"
            style={{ height: '50%', width: '100%' }}
          />
        </div>
      </div>
      

      )}
      <Dialog
        open={isProfileCardOpen}
        onClose={handleCloseProfileCard}
        fullWidth // Makes the dialog take up the full width of its container
      >
        <DialogTitle style={{ marginLeft: '33%', fontSize: '24px', fontWeight: 'bolder' }}>Profile Details</DialogTitle>
        <DialogContent style={{ height: '400px' }}>
          {registrations.map((registration) => (
            registration.Firstname === firstname && (
              <div onClick={handleToggleImagePreview}>
                {registration.Image && (
                  <img
                  src={registration.Image}
                  alt="Profile"
                  style={{
                    borderRadius: "50%",
                    cursor: 'pointer',
                    height: '120px',
                    width: '120px'
                  }}
                />
                )}
              </div>
            )
          ))}<br />
{userData && (
            <>
              <div style={{ display: 'flex', flexDirection: 'row'  }}>
                <div>
                  <p style={{ fontSize: '18px', fontFamily: 'sans-serif', fontStyle: 'initial' }}>
                    <span style={{ fontWeight: 'bold', color: 'Black' }}>Empid:</span> {userData.Empid}
                  </p>
                  <p style={{ fontSize: '18px', fontFamily: 'sans-serif', fontStyle: 'initial' }}>
                    <span style={{ fontWeight: 'bold', color: 'Black' }}>First Name:</span> {userData.Firstname}
                  </p>
                  <p style={{ fontSize: '18px', fontFamily: 'sans-serif', fontStyle: 'initial' }}>
                    <span style={{ fontWeight: 'bold', color: 'Black' }}>Last Name:</span> {userData.Lastname}
                  </p>
                  <p style={{ fontSize: '18px', fontFamily: 'sans-serif', fontStyle: 'initial' }}>
                    <span style={{ fontWeight: 'bold', color: 'Black' }}>Email:</span> {atob(userData.Empmail)}
                  </p>
                  <p style={{ fontSize: '18px', fontFamily: 'sans-serif', fontStyle: 'initial' }}>
                    <span style={{ fontWeight: 'bold', color: 'Black' }}>Role:</span> {userData.Role}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '18px', fontFamily: 'sans-serif', fontStyle: 'initial' }}>
                    <span style={{ fontWeight: 'bold', color: 'Black' }}>Practice:</span> {userData.Practies}
                  </p>
                  <p style={{ fontSize: '18px', fontFamily: 'sans-serif', fontStyle: 'initial' }}>
                    <span style={{ fontWeight: 'bold', color: 'Black' }}>Reporting Manager:</span> {userData.Reportingmanager}
                  </p>
                  <p style={{ fontSize: '18px', fontFamily: 'sans-serif', fontStyle: 'initial' }}>
                    <span style={{ fontWeight: 'bold', color: 'Black' }}>Reporting HR:</span> {userData.Reportinghr}
                  </p>
                  <p style={{ fontSize: '18px', fontFamily: 'sans-serif', fontStyle: 'initial' }}>
                    <span style={{ fontWeight: 'bold', color: 'Black' }}>Location:</span> {userData.Location}
                  </p>
                
                </div>
              </div>

              
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfileCard} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showImagePreview} onClose={handleToggleImagePreview}>
        <DialogContent>
          {registrations.map((registration) => (
            registration.Firstname === firstname && (
              <div>
                {registration.Image && (
                  <img
                    src={registration.Image}
                    alt="Profile Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                  />
                )}
              </div>
            )
          ))}
        </DialogContent>
      </Dialog>

    </>
  );
};

export default ButtonCenter;





// import React, { useState } from 'react';

// const Base64ImageConverter = () => {
//   const [base64Data, setBase64Data] = useState('data:image/jpeg;base64,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'); // Your base64 data string goes here

//   return (
//     <div>
//       <h2>Base64 Image Converter</h2>
//       <img
//         src={base64Data}
//         alt="Converted Image"
//         style={{ maxWidth: '100%', maxHeight: '400px' }}
//       />
//     </div>
//   );
// };

// export default Base64ImageConverter;
