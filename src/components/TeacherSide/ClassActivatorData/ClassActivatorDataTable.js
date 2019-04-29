
import React, { Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ClassActivatorDataRow from './ClassActivatorDataRow';


var moment = require('moment');


class ClassActivatorDataTable extends Component {

  state ={
    currentlyEditing: false,
  }


  componentDidMount(){
    // this.props.dispatch({type:'GET_CLASS'});
    // this.props.dispatch({type:'GET_STUDENT'})
  }


handleDelete = (event) => {
//   event.preventDefault();
//   console.log('in handleDelete');
//   let studentId = event.currentTarget.value;
//   console.log('Student Id is:', studentId);
//   this.props.dispatch({type:'DELETE_STUDENT', payload: studentId});
}

handleEdit = (event) => {
//   console.log('in handleEdit');
//   let studentId = event.currentTarget.value;
//   console.log(studentId);
//   this.setState({
//     currentlyEditing: true,
//   })
//   console.log(this.state.currentlyEditing);


}


  render() {
    const {classes} = this.props;
    console.log(this.state.currentlyEditing);
    return (
      <section>

        <Table className={classes.table}>
          <TableHead >
              <TableRow>
                <TableCell className={classes.tableFontHeader}>Date Assigned</TableCell>
                <TableCell className={classes.tableFontHeader}>Student Name</TableCell>
                <TableCell className={classes.tableFontHeader}>Activator Question</TableCell>
                <TableCell className={classes.tableFontHeader}>Student Answer</TableCell>
                <TableCell className={classes.tableFontHeader}>Score</TableCell>
                <TableCell className={classes.tableFontHeader}>Edit Score</TableCell>
                <TableCell className={classes.tableFontHeader}>Delete</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {this.props.reduxState.classData.map( (student) =>
                <ClassActivatorDataRow key={student.id} student={student} classData={this.props.classData}/> 
            )}
          </TableBody>
      </Table>             

      </section>
    );
  }
}

const styles = theme => ({
  formControl:{
    margin: '0 auto',
    
  },
  form:{
    backgroundColor: 'white',
    padding: '0',
    margin: '0 auto',
  },
  addStudents:{
    textAlign: 'center',
  },
  table:{
    width: '90%',
    margin: '0 auto',
    marginBottom: '50px',
    marginTop: '100px',
   },
   
   tableFont:{
     fontSize: '22px',
     color: '#ff65af',
   },
   tableFontHeader:{
     fontSize: '22px',
     color: '#ff65af',
   },
   tableFontCenter:{
     fontSize: '22px',
     textAlign: '#ff65af',
     color: '#ff65af',
   },
   tableFontHeaderCenter:{
     fontSize: '22px',
     textAlign: 'center',
     color: '#ff65af' 
   },
   tableRowHover: {
     '&:hover': {
       backgroundColor: 'primary',
     },
   },
  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(ClassActivatorDataTable));