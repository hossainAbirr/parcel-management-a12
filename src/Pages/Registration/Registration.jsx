
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google'; // Import Google Icon
import bg from '../../assets/bg.json'
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { imageUpload } from '../../hooks/imageUpload';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const Registration = () => {
    const axiosPublic = useAxiosPublic();
    const { googleLogIn, createUser, logOut } = useAuth();
    const navigate = useNavigate();
    const [role, setRole] = useState('');

    const handleChange = (event) => {
        setRole(event.target.value);
    };
    const handleGoogle = () => {
        googleLogIn()
            .then(result => {
                console.log(result);
                navigate('/')
                Swal.fire({
                    title: "Registration Successful",
                    text: "Welcome To Parcel Management",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const usertype = form.usertype.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.files[0];

        const imageUrl = await imageUpload(photo);
        console.log(imageUrl.success);

        const userInfo = {
            name: username,
            usertype: usertype,
            email: email,
            photoURL: imageUrl.data.display_url,
        }

        createUser(email, password)
            .then(result => {
                if (result.user) {
                    navigate('/login')
                    logOut();
                    Swal.fire({
                        title: "Registration Successful",
                        text: "Welcome To Parcel Management",
                        icon: "success"
                    });
                    if (imageUrl.success) {
                        updateProfile(result.user, {
                            displayName: username,
                            photoURL: imageUrl.data.display_url,
                        })
                    }
                    axiosPublic.post('http://localhost:2132/users', userInfo)
                        .then(result => {
                            console.log(result);
                        })
                        .catch(error => {
                            console.error(error);
                        })
                }
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className='py-20'>
            <Container maxWidth="lg">
                {/* Title */}
                <Typography variant="h4" sx={{
                    textAlign: 'center', fontWeight: 'bold', background: `linear-gradient(to right, #00b4d8, #184e77)`,
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                }} gutterBottom>
                    Welcome
                    To
                    Parcel Mangement
                </Typography>

                {/* Flex Container with Form and Image */}
                <Grid container spacing={4} style={{ marginTop: '20px', alignItems: 'center' }}>
                    {/* Form Container */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" sx={{
                            mb: 4,
                            background: `linear-gradient(to right, #00b4d8, #184e77)`,
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                        }} gutterBottom>
                            Register with your Email And Password
                        </Typography>
                        <form onSubmit={handleSubmitRegister}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={role}
                                            label="User Type"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'user'}>User</MenuItem>
                                            <MenuItem value={'delivery'}>Delivery Man</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="photo"
                                        id="photo"
                                        type='file'
                                        accept='image/*'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" fullWidth variant="contained" color="primary">
                                        Register
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="secondary"
                                        startIcon={<GoogleIcon />}
                                        onClick={handleGoogle}
                                    >
                                        Register with Google
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        <Typography variant="h6" sx={{
                            mt: 4, background: `linear-gradient(to right, #00b4d8, #184e77)`,
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                        }} gutterBottom>
                            Already have an acoount? Please <Link to='/login'>
                                <Button sx={{ color: '#5a189a' }}>Login</Button>
                            </Link>
                        </Typography>
                    </Grid>

                    {/* Image Container */}
                    <Grid item xs={12} sx={{ height: '20%' }} md={6} style={{}}>
                        <div className='h-1/2'>
                            <Lottie animationData={bg} loop={true}></Lottie>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Registration;
