import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { useTranslation } from "react-i18next";
import { actions } from '../../features/user';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
export function LoginMenu () {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const userStore = useAppSelector(state => state.user || '');
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if(user === 'admin' && password === 'admin'){
      dispatch(actions.setUserActive(user));
      setPassword('');
      setUser('')
    }
    handleClose();
  }

  return (
    <React.Fragment>
      {
        userStore === ''
        ? <Button onClick={handleOpen} sx={{ color: 'inherit' }}>{t('login').split('*')[0]}</Button>
        : <Button onClick={() => dispatch(actions.unsetUserActive(''))} sx={{ color: 'inherit' }}>{t('login').split('*')[4]} {userStore}</Button>
      }

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 270 }}>
          <TextField
            id="outlined-basic"
            label={t('login').split('*')[2]}
            variant="outlined"
            value={user}
            onChange={(event) => setUser(event.target.value)}
          />

          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{t('login').split('*')[3]}</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button onClick={handleClose}>{t('login').split('*')[1]}</Button>
            <Button onClick={handleSubmit} disabled={user === '' || password === ''}>{t('login').split('*')[0]}</Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
