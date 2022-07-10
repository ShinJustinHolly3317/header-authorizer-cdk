exports.handler = async function(event: any) {
  console.log(event)
    const auth = event.headers.authorization
    
    const [account, password] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':')
    
    console.log(`account, password: '${account}', '${password}'`)
    
    if(account === 'admin' && password === 'secret') {
        return {
          isAuthorized: true,
          context: {
            isAuthorized: true
          }
        }
    }
    
    return {
      isAuthorized: true,
      context: {
        isAuthorized: false
      }
    }
};