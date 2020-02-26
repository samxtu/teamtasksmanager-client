/* eslint-disable no-use-before-define */
import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DUF from './DisplayUploadedFiles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop:"10px",
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  button:{
    display:'flex'
}
}));

export default function ChipSelector({selectFile,removeFile}) {
  const classes = useStyles();
  const [files, setFiles] = React.useState([])
  const isHere = (element) =>{
      let r = false;
      for(let i=0;i<files.length;i=i+1){
          if(files[i].name===element.name){
              r=true
              break
          }
      }
      return r;
  };
  const onFileSelect = (event) =>{
    let filesToSend = [];
    [...event.target.files].forEach(fl=>{
        filesToSend.push(!files.includes(fl)?fl:null)
        let c = filesToSend.findIndex(isHere)
        if(c !== -1){
            filesToSend.splice(c,1)
        }
    })
    setFiles(files.concat(filesToSend))
    selectFile(filesToSend)
  }
  const removeSelectedFile = (file)=>{
    let r = files.indexOf(file)
    files.splice(r,1)
    removeFile(files)
  }
  return (
    <div className={classes.root}>
      <DUF files={files} cancelChip={removeSelectedFile} />
    <label htmlFor="outlined-button-file" style={{display:'inline'}}>
    <Button startIcon={<AttachFileIcon />} variant="outlined" component="span" color='primary' className={classes.button}>
        Attach files
    </Button>
    </label>
      <input
        className={classes.input}
        onChange={onFileSelect}
        style={{ display: 'none' }}
        id="outlined-button-file"
        multiple
        type="file"
        />
    </div>
  );
}