import {Link} from 'react-router-dom'

const RouterTest = () => {
  return (
    <>
    <Link to={'/'}>HOME</Link>
    <Link to={'/diary'}>diary</Link>
    <Link to={'/new'}>new</Link>
    <Link to={'/edit'}>edit</Link>
    </>
  )
}

export default RouterTest