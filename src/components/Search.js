import React, { useState } from 'react'
import { TextField, Button, LinearProgress } from '@material-ui/core'
import shrtcode from '../api/shrtcode'

const HTTP_URL_VALIDATOR_REGEX = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
const Search = () => {
  const [link, setLink] = useState('')
  const [short, setShort] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateURL = (string) => {
    return string.match(HTTP_URL_VALIDATOR_REGEX)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateURL(link)) {
      getLink()
      setLink('')
      setIsLoading(!isLoading)
    }
    else {
      setShort("Please input a valid URL")
    }
  }

  const getLink = async () => {
    await shrtcode.get(`shorten?url=${link}`)
      .then((response) => {
        setShort(response.data.result.short_link)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })

  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} style={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          style={{ marginBottom: '20px' }}
          label="Input Your Link"
          varient="outlined"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button
          style={{ marginBottom: '20px' }}
          onClick={(e) => handleSubmit(e)}
          varient='contained'
          color='primary'>
          Submit
        </Button>
      </form>
      {isLoading && <LinearProgress />}
      {short && <h1>Short Link: {short}</h1>}
    </div>
  )
}

export default Search