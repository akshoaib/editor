import { Component, OnInit } from '@angular/core';
import {
    openEditor,
    PinturaEditorModal,
    PinturaEditorOptions,
    PinturaEditor,
} from '../pintura/pintura';
import { PinturaEditorAbstractComponent } from './pintura-editor-abstract.component';

@Component({
    selector: 'pintura-editor-modal',
    template: ` <ng-content></ng-content> `,
    styles: [],
})
export class PinturaEditorModalComponent<T>
    extends PinturaEditorAbstractComponent<T>
    implements OnInit {
    initEditor(element: HTMLElement, props: PinturaEditorOptions): PinturaEditor {
        return openEditor(props);
    }

    showEditor(): void {
        (this.editor as PinturaEditorModal).show();
    }

    hideEditor(): void {
        (this.editor as PinturaEditorModal).hide();
    }

    ngOnDestroy(): void {
        if (!this.editor) return;
        this.editor = undefined;
    }
}
