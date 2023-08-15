import { OnInit } from '@angular/core';
import { PinturaEditorModal, PinturaEditorOptions } from 'pintura';
import { PinturaEditorAbstractComponent } from './pintura-editor-abstract.component';
export declare class PinturaEditorModalComponent<T> extends PinturaEditorAbstractComponent<T> implements OnInit {
    initEditor(element: HTMLElement, props: PinturaEditorOptions): PinturaEditorModal;
    showEditor(): void;
    hideEditor(): void;
    ngOnDestroy(): void;
}
