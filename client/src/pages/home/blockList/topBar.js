import {Toolbar, IconButton, Typography, Stack, Box} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function BlockListTopbar({
  chainStatus = { valid: true, difficulty: 0},
  handleRefresh = () => {},
}) {
  return (
    <Toolbar>
      <Box sx={ {flexGrow: 1}}>
        <Typography variant='h6'>
          <b>Blocks</b>
        </Typography>
        <Typography variant='caption'>
          (Difficulty: {chainStatus.difficulty} - Validity: {chainStatus.valid.toString()})
        </Typography>
      </Box>
      
      <Stack direction='row' spacing={1}>
        <IconButton
          onClick={handleRefresh}
        >
          <RefreshIcon/>
        </IconButton>
      </Stack>
    </Toolbar>

  )
}
