import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FilePondOptions } from 'filepond';

// pintura
import {
    // editor
    locale_en_gb,
    createDefaultImageReader,
    createDefaultImageWriter,
    createDefaultShapePreprocessor,

    // plugins
    setPlugins,
    plugin_crop,
    plugin_crop_locale_en_gb,
    plugin_finetune,
    plugin_finetune_locale_en_gb,
    plugin_finetune_defaults,
    plugin_filter,
    plugin_filter_locale_en_gb,
    plugin_filter_defaults,
    plugin_annotate,
    plugin_annotate_locale_en_gb,
    markup_editor_defaults,
    markup_editor_locale_en_gb,

    // filepond
    legacyDataToImageState,
    openEditor,
    processImage,
} from 'pintura';

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [],
})
export class AppComponent {
    constructor(private sanitizer: DomSanitizer) {}

    // editor generic state
    editorOptions: any = {
        imageReader: createDefaultImageReader(),
        imageWriter: createDefaultImageWriter(),
        shapePreprocessor: createDefaultShapePreprocessor(),
        ...plugin_finetune_defaults,
        ...plugin_filter_defaults,
        ...markup_editor_defaults,
        locale: {
            ...locale_en_gb,
            ...plugin_crop_locale_en_gb,
            ...plugin_finetune_locale_en_gb,
            ...plugin_filter_locale_en_gb,
            ...plugin_annotate_locale_en_gb,
            ...markup_editor_locale_en_gb,
        },
    };

    // inline
    inlineSrc: string = 'assets/image.jpeg';
    inlineResult: string = undefined;

    handleInlineLoad($event) {
        console.log('inline load', $event);
    }

    handleInlineProcess($event) {
        console.log('inline process', $event);
        const objectURL = URL.createObjectURL($event.dest);
        this.inlineResult = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL) as string;
    }

    // modal
    modalSrc: string = 'assets/image.jpeg';
    modalResult: string = undefined;
    modalVisible: boolean = false;

    handleModalLoad($event) {
        console.log('modal load', $event);
    }

    handleModalProcess($event) {
        console.log('modal process', $event);
        const objectURL = URL.createObjectURL($event.dest);
        this.modalResult = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL) as string;
    }

    // overlay
    overlaySrc: string = 'assets/image.jpeg';
    overlayVisible: boolean = false;
    overlayResult: string = undefined;
    overlayOptions: any = {
        imageReader: createDefaultImageReader(),
        imageWriter: createDefaultImageWriter(),
        locale: {
            ...locale_en_gb,
            ...plugin_crop_locale_en_gb,
        },
    };

    handleOverlayLoad($event) {
        console.log('overlay load', $event);
    }

    handleOverlayProcess($event) {
        const objectURL = URL.createObjectURL($event.dest);
        this.overlayResult = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL) as string;
        this.overlayOptions = {
            ...this.overlayOptions,
            imageState: $event.imageState,
        };

        this.overlayVisible = false;
    }

    // filepond
    pondOptions: FilePondOptions = {
        allowMultiple: true,
        labelIdle: 'Drop files here...',
        // FilePond Image Editor plugin properties
        imageEditor: {
            // Maps legacy data objects to new imageState objects (optional)
            legacyDataToImageState: legacyDataToImageState,

            // Used to create the editor (required)
            createEditor: openEditor,

            // Used for reading the image data. See JavaScript installation for details on the `imageReader` property (required)
            imageReader: [
                createDefaultImageReader,
                {
                    // createDefaultImageReader options here
                },
            ],

            // Can leave out when not generating a preview thumbnail and/or output image (required)
            imageWriter: [
                createDefaultImageWriter,
                {
                    // We'll resize images to fit a 512 × 512 square
                    targetSize: {
                        width: 512,
                        height: 512,
                    },
                },
            ],

            // Used to generate poster images, runs an invisible "headless" editor instance. (optional)
            imageProcessor: processImage,

            // Pintura Image Editor options
            editorOptions: {
                // The markup editor default options, tools, shape style controls
                ...markup_editor_defaults,

                // The finetune util controls
                ...plugin_finetune_defaults,

                // This handles complex shapes like arrows / frames
                shapePreprocessor: createDefaultShapePreprocessor(),

                // This will set a square crop aspect ratio
                imageCropAspectRatio: 1,

                // The icons and labels to use in the user interface (required)
                locale: {
                    ...locale_en_gb,
                    ...plugin_crop_locale_en_gb,
                    ...plugin_finetune_locale_en_gb,
                    ...plugin_annotate_locale_en_gb,
                    ...markup_editor_locale_en_gb,
                },
            },
        },
    };

    pondFiles: FilePondOptions['files'] = ['assets/image.jpeg'];

    pondHandleInit() {
        console.log('FilePond has initialised');
    }

    pondHandleAddFile(event: any) {
        console.log('A file was added', event);
    }

    pondHandlePrepareFile(event: any) {
        console.log('A file was prepared', event);
        // Append output image to page for testing
        // const url = URL.createObjectURL(event.output);
        // const img = new Image();
        // img.src = url;
        // document.body.append(img);
    }

    pondHandleActivateFile(event: any) {
        console.log('A file was activated', event);
    }
}
