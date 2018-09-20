import jwt_decode from 'jwt-decode'
export default token => (sessionStorage.getItem('token') ? jwt_decode(sessionStorage.getItem('token')) : null)
