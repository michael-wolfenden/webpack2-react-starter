import React, { PropTypes } from 'react'
const { string } = PropTypes

const Message = ({ text }) =>
    <h1>{text}</h1>

Message.propTypes = {
    text: string,
}

export default Message
