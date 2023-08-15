import { Component, OnInit } from '@angular/core';

import { appendEditor, PinturaEditorOptions, PinturaEditor } from '../pintura/pintura';
import { PinturaEditorAbstractComponent } from './pintura-editor-abstract.component';

@Component({
    selector: 'pintura-editor',
    template: ` <ng-content></ng-content> `,
    styles: [],
})
export class PinturaEditorComponent<T> extends PinturaEditorAbstractComponent<T> implements OnInit {
    initEditor(element: HTMLElement, props: PinturaEditorOptions): PinturaEditor {
        return appendEditor(element, props);
    }
}
