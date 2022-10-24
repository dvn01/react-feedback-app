import { Link } from 'react-router-dom'
import Card from "../components/shared/Card"

function AboutPage() {
  return (
    <Card>
      <h1>About this project</h1>
      <p>This is a React app to leave feedback for a product</p>
      <p>Version: 1.0.0</p>
    
      <p>
          <Link to='/'>Back To Home</Link>
        </p>
    </Card>
  )
}

export default AboutPage
