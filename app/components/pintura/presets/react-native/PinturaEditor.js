import { WebView } from 'react-native-webview';
import { View, Platform } from 'react-native';
import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { Asset } from 'expo-asset';

const upperCaseFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/* eslint-disable @typescript-eslint/no-var-requires */
const Editor = forwardRef((props, ref) => {
    const { style, styleRules, ...options } = props;
    const [source, setSource] = useState(undefined);
    const webViewRef = useRef(null);

    // this sets up proxy so we can call functions on the editor instance
    useEffect(() => {
        const handler = {
            get: (target, prop) => {
                if (prop === 'history') return new Proxy({ group: 'history' }, handler); // eslint-disable-line no-undef
                return (...args) => {
                    const name = [target.group, prop].filter(Boolean).join('.');
                    webViewRef.current.postMessage(
                        JSON.stringify({
                            editorFunction: [name, ...args],
                        })
                    );
                };
            },
        };

        ref.current.editor = new Proxy({}, handler); // eslint-disable-line no-undef
    }, []);

    // this passes options to the editor
    useEffect(() => {
        webViewRef.current.postMessage(JSON.stringify({ editorOptions: options }));
    });

    // this passes style rules to the editor
    useEffect(() => {
        webViewRef.current.postMessage(JSON.stringify({ editorStyleRules: styleRules }));
    });

    // load editor template
    useEffect(() => {
        const template = require('./assets/pintura.html'); // eslint-disable-line no-undef
        Platform.OS === 'android'
            ? Asset.loadAsync(template).then(([{ localUri }]) => {
                  setSource({
                      uri: localUri,
                  });
              })
            : setSource(template);
    }, []);

    return (
        <View ref={ref} style={style}>
            <WebView
                ref={webViewRef}
                style={{ width: '100%', height: '100%' }}
                javaScriptEnabled={true}
                scrollEnabled={false}
                domStorageEnabled={true}
                allowFileAccess={true}
                allowFileAccessFromFileURLs={true}
                allowUniversalAccessFromFileURLs={true}
                allowsLinkPreview={false}
                automaticallyAdjustContentInsets={false}
                originWhitelist={['*']}
                textZoom={100}
                source={source}
                onMessage={async (event) => {
                    // message from WebView
                    const { type, detail } = JSON.parse(event.nativeEvent.data);

                    // webview ready, lets send over first batch of options
                    if (type === 'webviewloaded')
                        return webViewRef.current.postMessage(
                            JSON.stringify({
                                editorStyleRules: styleRules,
                                editorOptions: options,
                            })
                        );

                    // if is log
                    if (type === 'log') return console.log(detail.join(', ')); // eslint-disable-line no-undef

                    // get handler
                    const handler = options[`on${upperCaseFirstLetter(type)}`];

                    // call handler
                    handler && handler(detail);
                }}
            />
        </View>
    );
});

export default Editor;
