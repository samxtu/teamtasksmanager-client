/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop:"10px",
    width: "100%",
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function ChipSelector({data,user,label,selectMember,selected}) {
  const classes = useStyles();
  const isMe = (element) => element.handle === user.handle;
  let disableIndex;
  let i = 0;
  let inputProps={}
  let team = data.filter(f => {
    let r = true;
    for(let c=0; c<selected.length; c=c+1){
      if(selected[c].handle === f.handle){
        r= false;
        break;
      }
    }
    return r;
  })
  if(label==='Supervisors'){
    team.push(user)
    disableIndex = team.findIndex(isMe);
    inputProps = {
      defaultValue:[team[disableIndex]],
    }
  } else{
    disableIndex = data.length+1;
    i= data.length+1;
  }
  const onMemmberSelect = (event,value) =>{
    selectMember(value,label)
  }
  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        {...inputProps}
        options={team}
        onChange={(event,value)=>onMemmberSelect(event,value)}
        getOptionLabel={option => option.handle}
        getOptionDisabled= {option => option === team[disableIndex]}
        disableClearable
        filterSelectedOptions
        style={{width:'100%'}}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip  avatar={<Avatar src={option?option.imageUrl:'#'} />} label={option?option.handle:''} {...getTagProps({ index })} disabled={index === i} />
          ))
        }
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            style={{width:'100%'}}
            label={label+':'}
            placeholder={label}
          />
        )}
      />
    </div>
  );
}