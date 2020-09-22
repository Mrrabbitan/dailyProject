import Axios from 'axios'

const datafromMock = Axios.get('http://localhost:3721/api/user', {})
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })

export { datafromMock }
