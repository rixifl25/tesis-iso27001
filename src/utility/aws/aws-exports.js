export default {
  Auth: {
    region: process.env.REACT_APP_REGION?.toString(),
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID?.toString(),
    userPoolWebClientId: process.env.REACT_APP_CONITO_CLIENTE_ID?.toString()
  }
}