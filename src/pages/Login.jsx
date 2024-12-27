import { Visibility, VisibilityOff } from "@mui/icons-material"
import LoadingButton from "@mui/lab/LoadingButton";

import { Box, FormLabel, Grid2 as Grid, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useForm } from "react-hook-form"
import img1 from '../images/img1.png'
import { useLogin } from "../features/auth/useLogin";
import { useAdmin } from "../features/auth/useAdmin";
import { Navigate } from "react-router-dom";

function Login() {
    const { register, formState: { errors: formErrors }, handleSubmit } = useForm()
    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoading } = useLogin();
    const { isAuthenticated } = useAdmin();

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = async (data) => {
        if (!data)
            return

        await login(data)
    }

    if (isAuthenticated)
        return <Navigate replace to={'/admin'} />

    return (
        <Grid container component='form' onSubmit={handleSubmit(handleLogin)} width={'100dvw'} height={'100dvh'} alignItems={'center'} justifyContent={'center'} padding={2} >
            <Grid container component={Paper} borderRadius={8} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} spacing={4} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} padding={4}>
                <Typography variant="h6">
                    القاعة الملكية
                </Typography>
                <Grid container flexDirection={'column'} spacing={1} size={12}>
                    <FormLabel htmlFor='address'>
                        الايميل
                    </FormLabel>
                    <TextField id='email' type='email'
                        disabled={isLoading}
                        fullWidth
                        error={!!formErrors.password}
                        helperText={formErrors.password?.message}
                        {...register('email', {
                            required: "Email is required"
                        })
                        }
                    />
                </Grid>
                <Grid container flexDirection={'column'} spacing={1} size={12}>
                    <FormLabel htmlFor='address'>
                        كلمة السر
                    </FormLabel>
                    <TextField id='password' margin='dense' fullWidth
                        type={showPassword ? 'text' : 'password'}
                        disabled={isLoading}
                        error={!!formErrors.password}
                        helperText={formErrors.password?.message}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }
                        }}
                        {...register('password', {
                            required: "Password is required"
                        })
                        }
                    />
                </Grid>
                <LoadingButton
                    type="submit"
                    disabled={isLoading}
                    fullWidth
                    variant="contained"
                    aria-label="Login"
                    loading={isLoading}
                >
                    تسجيل الدخول
                </LoadingButton>
            </Grid>

            <Box width={'100%'} height={'100%'} position={'absolute'} zIndex={-1} sx={{ opacity: 0.5 }}>
                <img src={img1} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
        </Grid>
    )
}

export default Login