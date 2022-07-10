exports.handler = async function(event: any) {
  const auth = event.headers.apikey
  
  const [account, password] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':')
  
  console.log(`account, password: '${account}', '${password}'`)
  
  if(account === 'admin' && password === 'secret') {
    return {
      isAuthorized: true,
    }
  }
  
  return {
    isAuthorized: false,
  }
};