import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
import {Link} from 'react-router-dom';

class EmployeeListComponent extends Component 
{
 constructor(props)
 {
   super(props);

   this.state={
    employees:[]
   }
 }
 componentDidMount()
 {
    EmployeeService.getEmployees().then((res)=>{
       this.setState({employees:res.data});
    })
 }

 deleteEmployee=(employeeId)=>
 {
   EmployeeService.deleteEmployee(employeeId).then(res=>{
      EmployeeService.getEmployees().then(res=>{
         this.setState({employees:res.data});
      })
   })
   .catch(error=>{
      console.log(error);
   })
 }

  render()
  {
    return (
      <div className='container mt-3'>
         <h4 className='text-center'>Employee List</h4>
         <div className='row mt-4'>
            <Link to="/addEmployee" className='btn btn-primary mb-3'>Add Employee </Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                        <th>EMAIL</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       this.state.employees.map((employee)=>{
                        return <tr key={employee.id}>
                                  <td>{employee.id}</td>
                                  <td>{employee.firstName}</td>
                                  <td>{employee.lastName}</td>
                                  <td>{employee.email}</td>
                                  <td>
                                    <Link to={`/updateEmployee/${employee.id}`} className='btn btn-info'>update</Link>
                                    <button className='btn btn-danger ms-4' onClick={()=>this.deleteEmployee(employee.id)}>delete</button>
                                  </td>
                               </tr>
                       }) 
                    }
                </tbody>
            </table>
         </div>
      </div>
    )
  }
}

export default EmployeeListComponent