import React from 'react'
import { mount } from 'enzyme'
import assert from 'power-assert'

import Message from './Message'

const render = (props) => mount(
    <Message {...props} />
)

describe('<Message />', () => {
    it('should render text', () => {
        const component = render({
            text: 'This is a message',
        })

        assert(component.text() === 'This is a message')
    })
})
