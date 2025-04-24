import * as React from 'react'
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
  Typography,
  Modal,
  Button
} from '@mui/material'
import Logout from '@mui/icons-material/Logout'
import { useSelector } from 'react-redux'

export default function AccountMenu({ handeLogOut }) {
  const { user } = useSelector(s => s.auth)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const [profileModalOpen, setProfileModalOpen] = React.useState(false)

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const openProfileModal = () => {
    setProfileModalOpen(true)
    handleClose()
  }
  const closeProfileModal = () => setProfileModalOpen(false)

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              src='https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png'
              sx={{ width: 32, height: 32 }}
            >
              M
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={openProfileModal}>
          <ListItemIcon>
            <Avatar
              src='https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png'
              sx={{ width: 28, height: 28 }}
            />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handeLogOut}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Profile Modal */}
      <Modal open={profileModalOpen} onClose={closeProfileModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 3,
            p: 4,
            textAlign: 'center'
          }}
        >
          <Avatar
            src='https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png'
            sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
          />
          <Typography variant='h6'>{user?.name}</Typography>
          <Typography variant='body2' color='text.secondary'>
            {user?.email}
          </Typography>
          <Button
            variant='contained'
            onClick={closeProfileModal}
            sx={{ mt: 3, borderRadius: 2 }}
            fullWidth
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  )
}
