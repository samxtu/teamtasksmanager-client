import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline',
    justifyContent: 'center',
    // flexWrap: 'wrap',
    height:'100%',
    // padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsArray({files,cancelChip}) {
  const classes = useStyles();  
  const handleDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chip => chip.name !== chipToDelete.name))
    cancelChip(chipToDelete)
  };
  const [chipData, setChipData] = React.useState(files);
  useEffect(() => {
    setChipData(files)
  }, [files])
  return (
    <div
     className={classes.root}>{
        chipData.length>0?chipData.map(data => {
          return (
            <Chip
              key={data.name}
              label={data.name}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          );
        }):null
      }</div>
  );
}
