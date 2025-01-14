import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = () => {
  return (
    <div>
      <Card sx={{width:345}}>
        <CardMedia sx={{height:345}} image='https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
        <CardContent>
            <Typography variant='h5' >
                Canteen food items
            </Typography>
            <Typography variant='body2' >
                50% off on your first order
            </Typography>
            <div className='py-2 space-y-2'>
                <p>{"Banasthali Vidyapith"}</p>
                <p className='text-sm text-blue-500'>July 1,1025 12:00 AM</p>
                <p className='text-sm text-red-500'> July 2,1025 12:00 AM</p>
            </div>
        </CardContent>
        {false && <CardActions>
            <IconButton>
                 <DeleteIcon/>
            </IconButton>
        </CardActions>}
      </Card>
    </div>
  )
}

export default EventCard
