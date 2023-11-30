
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google'; // Import Google Icon
import login from '../../assets/login.json'
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
const Login = () => {

    const { googleLogIn, logIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { data: usersInDatabase = [] } = useQuery({
        queryKey: ['usersInDatabase'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            const userMaped = await res.data.map(obj => obj.email)
            return userMaped
        }
    })
    console.log(usersInDatabase);
    const handleGoogle = () => {
        googleLogIn()
            .then(result => {
                console.log(result);
                navigate('/')
                Swal.fire({
                    title: "Log In Successful",
                    text: "Welcome To Parcel Management",
                    icon: "success"
                });
                const duplicateUser = usersInDatabase.find(email => email === result.user.email)
                console.log(duplicateUser);
                if (!duplicateUser) {
                    const userInfo = {
                        name: result.user?.displayName,
                        email: result.user?.email,
                        role: '',
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

    const handleLogIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        logIn(email, password)
            .then(result => {
                console.log(result);
                navigate('/')
                Swal.fire({
                    title: "Log In Successful",
                    text: "Welcome To Parcel Management",
                    icon: "success"
                });
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
                            Login with your Email And Password
                        </Typography>
                        <form onSubmit={handleLogIn}>
                            <Grid container spacing={2}>
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
                                    <Button type="submit" fullWidth variant="contained" color="primary">
                                        Login
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
                                        Login with Google
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        <Typography variant="h6" sx={{
                            mt: 4, background: `linear-gradient(to right, #00b4d8, #184e77)`,
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                        }} gutterBottom>
                            Don&apos;t have an acoount? Please <Link to='/register'>
                                <Button sx={{ color: '#5a189a' }}>Register</Button>
                            </Link>
                        </Typography>
                    </Grid>

                    {/* Image Container */}
                    <Grid item xs={12} sx={{ height: '20%' }} md={6} style={{}}>
                        <div className='h-1/2'>
                            <Lottie animationData={login} loop={true}></Lottie>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Login;
