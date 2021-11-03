import {FC, useState} from "react";
import TeX from '@matejmazur/react-katex'
import 'katex/dist/katex.min.css';

// const _ = String.raw;

export const Katex1: FC = () => {

    const [selected, setSelected] = useState<Selection>();
    const [text1, setText1] = useState('');
    const [input_text, setInput_text] = useState(
        '\\f\\relax{x} = \\int_{-\\infty}^\\infty\n' +
        '    \\f\\hat\\xi\\,e^{2 \\pi i \\xi x}\n' +
        '    \\,d\\xi');
    const [rect, setRect] = useState<DOMRect>();


    return (
        <div>
            <textarea onChange={(e) => {
                setInput_text(e.target.value);
            }}>
                {input_text}
            </textarea>
            <div style={{borderStyle: 'dashed'}} onMouseUp={() => {
                console.log(selected?.rangeCount);
                setSelected(
                    window?.getSelection() ?? undefined);
                setText1(
                    window?.getSelection()?.toString() ?? ''
                );
                setRect(selected?.getRangeAt(0).getBoundingClientRect());
            }}>

                {/*The original katex*/}
                <TeX block={true} settings={{macros: { '\\f': `#1f(#2)` }}}>
                    {input_text}
                </TeX>

                {/*This div will wrap your selected text*/}
                <div style={{
                    borderStyle: 'dashed', position: 'absolute',
                    left: rect?.x, top: rect?.y, width: rect?.width, height: rect?.height
                }}/>

            </div>

            {/*This paragraph will show the content you selected*/}
            <p>{text1}</p>

            {/*<p>{JSON.stringify(rect)}</p>*/}

        </div>);
}