import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom'
function Exercise() {
    const params = useParams()
    const exercise = {
        userlist: [],
        duration: 1
    }
    const [status, setstatus] = useState()
    const [username, setusername] = useState('')
    const [data, setdata] = useState(exercise)
    const [description, setdescription] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [title, settitle] = useState('')

    useEffect(() => {
        if (window.location.href.indexOf("user") > 0)
            setstatus('user')
        else if (window.location.href.indexOf('edit') > 0)
            setstatus('edit')
        else
            setstatus('create')
    })

    useEffect(() => {
        if (window.location.href.indexOf("user") > 0) {
            setusername('')
            setstatus('user')
            settitle('Create User')
        }
        else {
            console.log(window.location.href)
            if (window.location.href.indexOf('edit') > 0)
                settitle('Edit Exercise Log')
            else
                settitle('Create Exercise Log')
        }

    }, [status])

    useEffect(() => {
        let userlist = [];
        if (window.location.href.indexOf("create") > 0) {
            axios.get("http://localhost:5000/users/")
                .then(res => {
                    if (res && res.data.length > 0) {
                        userlist = res.data.map(x => x.username)
                        setusername(userlist[0])
                        setdata({ userlist, duration: 1 })
                        setdescription('')
                        setStartDate(new Date())
                    }
                }
                )

        }

        //For Edit data
        if (window.location.href.indexOf('edit') > 0) {
            if (params.id)
                axios.get("http://localhost:5000/exercise/" + params.id)
                    .then(res => {
                        console.log("res:", res.data)
                        setdata({ userlist: [res.data.username], duration: res.data.duration })
                        setusername(res.data.username)
                        setdescription(res.data.description)
                        setStartDate(new Date(res.data.date))
                        settitle("Edit Exercise Log")

                    })
        }
    }, [status])

    const handleUserName = (e) => {
        //handle empty spaces
        if (e.indexOf(" ") === 0) {
            const val = e.trim();
            setusername(val)
        } else {

            setusername(e)
        }
    }

    const CheckSpace = (val) => {
        if (val.indexOf(" ") === 0) {
            const value = val.trim();
            return value
        } else
            return val;
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (status === "user") {
            const user = {
                username
            }
            axios.post(`http://localhost:5000/users/add`, user)
                .then(res => console.log(res))
                .catch(er => console.log("Error ", er))
            setusername('')

        }
        else if (status === "edit") {

            const exercise = {
                username,
                description,
                duration: data.duration,
                date: startDate
            }
            console.log("update Exercise", exercise)
            axios.post("http://localhost:5000/exercise/update/" + params.id, exercise)
                .then(res => console.log(res))
                .catch(e => console.log("err", e))
            window.location = "/";
        }
        else {
            const exercise = {
                username,
                description,
                duration: data.duration,
                date: startDate
            }
            console.log(exercise)
            axios.post("http://localhost:5000/exercise/add", exercise)
                .then(res => console.log("Exercise res", res))
            window.location = "/"
        }
    }

    const handleForm = (e) => {
        let selectedField = e.target.name;
        if (selectedField === "user")
            setusername(e.target.value)
        else if (selectedField === "description")
            setdescription(CheckSpace(e.target.value))
        else {

            setdata({
                ...data,
                duration: e.target.value
            })
        }
    }

    return (
        <div className='exercise-form'>
            <h1>{status} Form</h1>
            {
                status === 'user' ?
                    <>
                        <Form onSubmit={handleOnSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" value={username} onChange={(e) => handleUserName(e.target.value)}
                                    placeholder="Enter user name" />
                                <Form.Text className="text-muted">
                                    We'll never share your credientials.
                                </Form.Text>
                            </Form.Group>

                            <Button variant="primary" type="submit" name='user'
                                disabled={username && username !== 'undefined' ? false : true}>
                                {title}
                            </Button>
                        </Form>
                    </>
                    :
                    <>
                        <Form onSubmit={handleOnSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Select name='user' aria-label="Default select example" value={username}
                                    onChange={handleForm}>
                                    {
                                        data.userlist && data.userlist.map((user, i) => <option selected={data.userlist[0]} key={i} value={user}>{user}</option>)
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name='description' value={description}
                                    onChange={handleForm} placeholder="Write description" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Duration</Form.Label>
                                <Form.Control type="number" name='duration' value={data.duration}
                                    onChange={handleForm} placeholder="Enter duration" min="1" step="1" />
                            </Form.Group>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                            <br />
                            <br />
                            <Button variant="primary" type="submit"
                                disabled={data.userlist && data.duration != 0 && data.duration >= 0 && description && startDate ? false : true}>
                                {title}
                            </Button>
                        </Form>
                    </>
            }
        </div>
    )
}

export default Exercise
