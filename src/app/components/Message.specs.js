import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import Message from './Message'

const render = (props) => mount(
    <Message {...props} />
)

describe('<Message />', () => {
    it('should render text', () => {
        const component = render({
            text: 'This is a message',
        })

        expect(component.text())
            .toMatch(/This is a message/)
    })
})
