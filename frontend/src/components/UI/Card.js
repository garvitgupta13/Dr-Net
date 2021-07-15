import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles({

});

const DoctorCard = ({id,name,years,speciality,status,timing,pay} ) => {

    const classes = useStyle();

    return(
      <div className={classes.main}>
        <Card elevation={5}>
          <CardHeader
            avatar={
              <Avatar style={{ height: '70px', width: '70px' }} className={classes.avatar}>{name[0].toUpperCase}</Avatar>
            }
            title={name}
            subheader={`${years} years`}
          />
          <CardContent>
              <ListItem>
                 <h3>Speciality In:</h3>
                 <span>{speciality}</span>
              </ListItem>
              <ListItem>
                <h3>Timing :</h3>
                <span>{speciality}</span>
              </ListItem>
              <ListItem>
                  <span>status :</span>
                  <span>{status}</span>
              </ListItem>
          </CardContent>
        </Card>
      </div>
    )
};

export default DoctorCard;
