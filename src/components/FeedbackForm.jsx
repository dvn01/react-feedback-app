import { useState, useContext, useEffect } from "react"

import RatingsSelect from "./RatingsSelect"
import Button from "./shared/Button"

import Card from "./shared/Card"

import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {

    const [text, setText] = useState("")
    const [rating, setRating] = useState("")
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState("")

    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)

    useEffect(() => {
        if (feedbackEdit.edit === true){
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    const handleChange = (e) => {
        if (text === ''){
            setBtnDisabled(true)
            setMessage(null)
        } else if (text !== "" && text.trim().length <= 10) {
            setMessage("Text must be at least 10 characters")
        } else {
            setBtnDisabled(false)
            setMessage(null)
        }
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim().length > 10){
            const newFeedback = {
                text: text,
                rating: rating
            }

            if (feedbackEdit.edit === false){
                addFeedback(newFeedback)
            } else {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            }
            setText("")
        }
    }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
            <RatingsSelect select={(rating) => setRating(rating)} />
             <div className="input-group">
                <input onChange={handleChange} 
                        type="text" 
                        placeholder="Write a Review"
                        value={text}  />
                        <Button type="submit" isDisabled={btnDisabled}>Send</Button>
             </div>
             {message && <div className="message">{message}</div>}
            </form>
    </Card>
  )
}

export default FeedbackForm