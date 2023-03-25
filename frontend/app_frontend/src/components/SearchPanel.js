import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


function SearchPanel() {
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}`)
        }
    }

    return (
        <Form onSubmit={submitHandler}>
                <Form.Group className="d-flex">
                    <Form.Control type='text' name='q' size="sm" onChange={(event) => setKeyword(event.target.value)}/>
                    <Button type='submit' variant='outline-success' size="sm" >Submit</Button>
                </Form.Group>

        </Form>
    )
}

export default SearchPanel