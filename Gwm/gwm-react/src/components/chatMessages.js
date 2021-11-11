import React, {useState} from 'react';
import { inputClasses } from '@mui/material'

export default function ChatMessage(props) {
    const [text, setText] = useState('');

    return (
        <div class="d-flex" style={{ height:'80vh'}}>
            <div class="d-flex flex-column flex-grow-1">
                <div class="flex-grow-1 overflow-auto">
                    <p>HEEELO {this.props.msgId}</p>
                </div>
                <form>
                    <inputClasses>
                        <formControlClasses
                        as="textarea"
                        required
                        value={text}
                        onChange={e => setText(e.target.value)}
                        style ={{ height:'75px', resize:'none'}}
                        />
                    </inputClasses>
                </form>

            </div>
        </div>
    )
}