import {
  Paper, 
  Box,
  Stack,
  Typography,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { getLocalTimeFromTimestamp } from '../../../helpers/datetime';

export default function TransactionListItem({
  data = {}
}) {

  return (
    <Paper variant="outlined">
      <Box padding={1}>
        <Typography variant='body2' noWrap>
          <b>Transaction #</b>{data.id}
        </Typography>
        <Typography noWrap variant='subtitle2'>
          <b>From: </b> 
          <Link 
            underline='hover'
            component={RouterLink} 
            to={`/wallet/${data.fromAddress}`}
          >
            {data.fromAddress}
          </Link>
        </Typography>
        <Typography noWrap variant='subtitle2'>
          <b>To: </b> 
          <Link 
            underline='hover'
            component={RouterLink} 
            to={`/wallet/${data.toAddress}`}
          >
            {data.toAddress}
          </Link>
        </Typography>
        <Typography variant='subtitle2'><b>Amount:</b> {data.amount}</Typography>

        <Box marginTop={1}>
          <Typography variant='body2'>Metadata</Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
          >
            <Typography variant='subtitle2'><b>Status:</b> {data.transactionStatus}</Typography>
            <Typography variant='subtitle2'>
              <b>Block: </b>
              <Link 
                underline='hover'
                component={RouterLink} 
                to={`/block/${data.blockIndex}`}
              >
                {data.blockIndex}
              </Link>
            </Typography>
            <Box>
              <Typography variant='subtitle2'><b>Timestamp:</b> {data.timestamp}</Typography>
              <Typography variant='caption'>
                <i>({getLocalTimeFromTimestamp(data.timestamp)}</i>)
              </Typography>
            </Box>
            
          </Stack>
        </Box>
      </Box>
    </Paper>
  )
}
