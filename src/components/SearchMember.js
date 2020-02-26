/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Grid from '@material-ui/core/Grid';

export default function SearchMember({searchTo,team,departmentSelect,searchMember,company}) {
    const [state, setState] = React.useState({
        department: '',
        departments: company.departments,
        branches: company.branches,
        branch:'',
        searchTo: searchTo,
        team: team
      });
      const handleChange = (name) => event => {
      if(event.target.value === '') setState({ searchTo: team, department: '',branch:'' })
      else{
        let res = [];
        for (var i=0; i < team.length; i++) {
            if (team[i].department === event.target.value) {
                res.push(team[i]);
            }
        }
        setState({
            ...state,
            searchTo: res,
            [name]: event.target.value,
        })
      }
      return departmentSelect(event.target.value)
      }
      const handleSearch = (val) => {
      if(val) return searchMember(val.handle)
      }
      const handleBranchChange = (name) => event =>{
          console.log(event.target.value+': '+name)
      }
    
  return (
    <Paper style={{ width: '100%',padding:'0px 0px 5px 0px',marginBottom:'10px' }}>
        <Grid container>
            <Grid item sm={4}>
                <Autocomplete
                id="searchValue"
                onChange={(event,value)=>handleSearch(value)}
                options={state.searchTo}
                getOptionLabel={option => option.handle}
                renderInput={params => (
                    <TextField {...params} label="Search team member" margin="normal" variant="outlined" fullWidth/>
                )}
                />
            </Grid>
            <Grid item sm={4}>
                <FormControl style={{width:'85%',margin:'20px 0px 0px 5px'}}>
                    <InputLabel shrink htmlFor="department-native-label-placeholder">
                       Department
                    </InputLabel>
                    <NativeSelect
                    value={state.department}
                    onChange={handleChange('department')}
                    inputProps={{
                        name: 'department',
                        id: 'department-native-label-placeholder',
                    }}
                    >
                    <option key='all' value="">All</option>
                    {state.departments.map(d=>(
                    <option key={d} value={d}>{d}</option>
                    ))}
                    </NativeSelect>
                </FormControl>
            </Grid>
            <Grid item sm={4}>
                <FormControl style={{width:'85%',margin:'20px 0px 0px 5px'}}>
                    <InputLabel shrink htmlFor="branch-native-label-placeholder">
                       Branch
                    </InputLabel>
                    <NativeSelect
                    value={state.branch}
                    onChange={handleBranchChange('branch')}
                    inputProps={{
                        name: 'branch',
                        id: 'branch-native-label-placeholder',
                    }}
                    >
                    <option key='all' value="">All</option>
                    {state.branches.map(d=>(
                    <option key={d} value={d}>{d}</option>
                    ))}
                    </NativeSelect>
                </FormControl>
            </Grid>
        </Grid>
    </Paper>
  );
}
