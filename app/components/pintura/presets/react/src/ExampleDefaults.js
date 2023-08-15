import { useState } from 'react';

// react-pintura
import { PinturaEditor } from 'react-pintura';

// pintura
import 'pintura/pintura.css';
import { getEditorDefaults } from 'pintura';

export default function Example() {
    // inline result
    const [result, setResult] = useState('');

    // get default properties
    const editorDefaults = getEditorDefaults();

    return (
        <div>
            <h2>Defaults</h2>

            <div style={{ height: '70vh' }}>
                <PinturaEditor
                    {...editorDefaults}
                    src={'./image.jpeg'}
                    imageCropAspectRatio={1}
                    onLoad={(res) => console.log('load image', res)}
                    onProcess={({ dest }) => setResult(URL.createObjectURL(dest))}
                />
            </div>

            {!!result.length && (
                <p>
                    <img src={result} alt="" />
                </p>
            )}
        </div>
    );
}
