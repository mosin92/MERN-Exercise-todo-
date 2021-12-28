import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
function ExerciseList() {
    const [exerciselist, setexercise] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/exercise", exerciselist)
            .then((res) => {
                setexercise(res.data)
                // console.log("response",res.data)
                console.log("Res", res.data)
            })
    }, [])

    const handleDelete = (id) => {
        axios.delete("http://localhost:5000/exercise/" + id)
            .then(res => {
                console.log("Response after delete")
                setexercise(exerciselist.filter(x => x._id != id))
            })
    }

    if (exerciselist.length <= 0) {
        <h1>Empty Exercise List</h1>
    }
    return (
        <div className='list'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciselist.map((x, i) => (
                        <tr key={i}>
                            <td>{x.username}</td>
                            <td>{x.description}</td>
                            <td>{x.duration}</td>
                            <td>{x.date}</td>
                            <td><Link className='edit'style={{color:'blue'}} to={`/edit/${x._id}`}> Edit </Link> {' '}{' '}
                                <Button variant="danger" onClick={() => handleDelete(x._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ExerciseList
