import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

const useStyle = makeStyles({

});

const DoctorCard = ({id,name,years,speciality,staus,timing,pay} ) => {

    console.log(id,' ',name,' years ',years);
    const classes = useStyle();

    return(
      <div className={classes.main}>
        <Card elevation={5}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>A</Avatar>
            }
            title={name}
            subheader={`${years} years`}
          />
        </Card>
      </div>
    )
};

export default DoctorCard;
