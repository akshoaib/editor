import { Component, Input, Output, EventEmitter, ElementRef, NgZone, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

type Unsub = () => void;

import {
    ImageSource,
    PinturaEditorOptions,
    PinturaEditor,
    dispatchEditorEvents,
} from '../pintura/pintura';

// Tried `export abstract class` but doesn't work with Angular v8
@Component({
    selector: 'pintura-editor',
    template: ` <ng-content></ng-content> `,
    styles: [],
})
export class PinturaEditorAbstractComponent<T> implements OnInit {
    protected element: ElementRef;
    protected editor: PinturaEditor;
    protected zone: NgZone;
    private unsubs: Unsub[] = [];

    @Input() src: ImageSource | SafeUrl = undefined;
    @Input() options: PinturaEditorOptions = undefined;

    @Output() loadstart: EventEmitter<T> = new EventEmitter();
    @Output() loadabort: EventEmitter<T> = new EventEmitter();
    @Output() loaderror: EventEmitter<T> = new EventEmitter();
    @Output() loadprogress: EventEmitter<T> = new EventEmitter();
    @Output() load: EventEmitter<T> = new EventEmitter();
    @Output() processstart: EventEmitter<T> = new EventEmitter();
    @Output() processabort: EventEmitter<T> = new EventEmitter();
    @Output() processerror: EventEmitter<T> = new EventEmitter();
    @Output() processprogress: EventEmitter<T> = new EventEmitter();
    @Output() process: EventEmitter<T> = new EventEmitter();
    @Output() update: EventEmitter<T> = new EventEmitter();
    @Output() undo: EventEmitter<T> = new EventEmitter();
    @Output() redo: EventEmitter<T> = new EventEmitter();
    @Output() revert: EventEmitter<T> = new EventEmitter();
    @Output() destroy: EventEmitter<T> = new EventEmitter();
    @Output() show: EventEmitter<T> = new EventEmitter();
    @Output() hide: EventEmitter<T> = new EventEmitter();
    @Output() close: EventEmitter<T> = new EventEmitter();
    @Output() ready: EventEmitter<T> = new EventEmitter();
    @Output() loadpreview: EventEmitter<T> = new EventEmitter();
    @Output() addshape: EventEmitter<T> = new EventEmitter();
    @Output() selectshape: EventEmitter<T> = new EventEmitter();
    @Output() updateshape: EventEmitter<T> = new EventEmitter();
    @Output() removeshape: EventEmitter<T> = new EventEmitter();

    constructor(element: ElementRef, zone: NgZone) {
        this.element = element;
        this.zone = zone;
    }

    private routeEvent = (e: CustomEvent) => {
        const emitter = this[e.type.split(':')[1]];
        if (!emitter) return;
        emitter.emit(e.detail);
    };

    protected initEditor(element: HTMLElement, props: any): PinturaEditor {
        // Do nothing
        return;
    }

    ngAfterViewInit(): void {
        this.element.nativeElement.classList.add('PinturaRootWrapper');
        // will block angular from listening to events inside the editor
        this.zone.runOutsideAngular(() => {
            this.editor = this.initEditor(
                this.element.nativeElement,
                Object.assign({}, this.options, { src: this.src as string })
            );
            this.unsubs = dispatchEditorEvents(this.editor, this.element.nativeElement);
        });

        // route events
        Object.keys(this)
            .filter((key) => this[key] instanceof EventEmitter)
            .forEach((key) => {
                this.element.nativeElement.addEventListener(`pintura:${key}`, this.routeEvent);
            });
    }

    ngOnChanges(): void {
        if (!this.editor) return;
        Object.assign(this.editor, this.options, { src: this.src });
    }

    ngOnDestroy(): void {
        if (!this.editor) return;

        this.editor.destroy();

        // unsubscribe
        this.unsubs.forEach((unsub) => unsub());
        this.unsubs = [];

        // unroute events
        Object.keys(this)
            .filter((key) => this[key] instanceof EventEmitter)
            .forEach((key) => {
                this.element.nativeElement.removeEventListener(`pintura:${key}`, this.routeEvent);
            });

        this.editor = undefined;
    }

    ngOnInit(): void {
        // Do nothing
    }
}
