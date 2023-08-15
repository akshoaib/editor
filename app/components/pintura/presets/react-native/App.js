import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import PinturaEditor from './PinturaEditor';
import { useAssets } from 'expo-asset';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const buttonStyle = {
    backgroundColor: '#222',
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 10,
};

const buttonTextStyle = {
    fontSize: 14,
    color: '#fff',
};

export default function App() {
    const [assets, error] = useAssets([require('./assets/image.jpeg')]);

    const [editorImageSource, setEditorImageSource] = useState(undefined);

    const editorRef = useRef(null);

    // This requests permission to select camera roll images
    useEffect(() => {
        (async () => {
            // Not needed on Web
            if (Platform.OS === 'web') return;

            // All fine when access granted
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status === 'granted') return;

            // Show message if not allowed
            alert('Sorry, we need camera roll permissions to make this work!');
        })();
    }, []);

    return (
        <View style={styles.container}>
            {/* The Pintura Editor component */}
            <PinturaEditor
                ref={editorRef}
                style={{ width: '95%', height: '80%', borderWidth: 1, borderColor: '#eee' }}
                styleRules={`
                    .pintura-editor {
                        --color-background: 255, 255, 255;
                        --color-foreground: 0, 0, 0;
                    }
                `}
                imageCropAspectRatio={1}
                src={editorImageSource}
                onLoaderror={(err) => {
                    console.log('onLoaderror', err);
                }}
                onLoad={({ size }) => {
                    console.log('onLoad', size);
                }}
                onProcess={({ dest, imageState }) => {
                    // dest is output file in dataURI format
                    console.log('onProcess', imageState, dest);
                }}
            />

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                {/* Example updating editor image source */}
                <TouchableOpacity
                    style={buttonStyle}
                    onPress={() => {
                        // load local asset
                        const [image] = assets;
                        const { localUri } = image;
                        FileSystem.readAsStringAsync(localUri, {
                            encoding: FileSystem.EncodingType.Base64,
                        }).then((base64) => {
                            setEditorImageSource(`data:image/jpeg;base64,${base64}`);
                        });
                    }}
                >
                    <Text style={buttonTextStyle}>Load test image</Text>
                </TouchableOpacity>

                {/* Example running an editor function */}
                <TouchableOpacity
                    style={buttonStyle}
                    onPress={() => {
                        // Run editor function
                        editorRef.current.editor.history.undo();
                    }}
                >
                    <Text style={buttonTextStyle}>Undo</Text>
                </TouchableOpacity>

                {/* Example selecting a library image */}
                <TouchableOpacity
                    style={buttonStyle}
                    onPress={async () => {
                        // Use ImagePicker to get a base64 image string
                        let { cancelled, base64 } = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsMultipleSelection: false,
                            quality: 1,
                            base64: true,
                        });

                        if (cancelled) return;

                        setEditorImageSource(`data:image/jpeg;base64,${base64}`);
                    }}
                >
                    <Text style={buttonTextStyle}>Browse...</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
