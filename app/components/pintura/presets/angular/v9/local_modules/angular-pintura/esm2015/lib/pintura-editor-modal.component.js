import { Component } from '@angular/core';
import { openEditor } from 'pintura';
import { PinturaEditorAbstractComponent } from './pintura-editor-abstract.component';
export class PinturaEditorModalComponent extends PinturaEditorAbstractComponent {
    initEditor(element, props) {
        return openEditor(props);
    }
    showEditor() {
        this.editor.show();
    }
    hideEditor() {
        this.editor.hide();
    }
    ngOnDestroy() {
        if (!this.editor)
            return;
        this.editor = undefined;
    }
}
PinturaEditorModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'pintura-editor-modal',
                template: ` <ng-content></ng-content> `
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGludHVyYS1lZGl0b3ItbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3NyYy9hbmd1bGFyLXBpbnR1cmEvdjkvcHJvamVjdHMvYW5ndWxhci1waW50dXJhL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9waW50dXJhLWVkaXRvci1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUE0QyxNQUFNLFNBQVMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQU9yRixNQUFNLE9BQU8sMkJBQ1QsU0FBUSw4QkFBaUM7SUFFekMsVUFBVSxDQUFDLE9BQW9CLEVBQUUsS0FBMkI7UUFDeEQsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFVBQVU7UUFDTCxJQUFJLENBQUMsTUFBNkIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsVUFBVTtRQUNMLElBQUksQ0FBQyxNQUE2QixDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztJQUM1QixDQUFDOzs7WUF2QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRSw2QkFBNkI7YUFFMUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgb3BlbkVkaXRvciwgUGludHVyYUVkaXRvck1vZGFsLCBQaW50dXJhRWRpdG9yT3B0aW9ucyB9IGZyb20gJ3BpbnR1cmEnO1xuaW1wb3J0IHsgUGludHVyYUVkaXRvckFic3RyYWN0Q29tcG9uZW50IH0gZnJvbSAnLi9waW50dXJhLWVkaXRvci1hYnN0cmFjdC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3BpbnR1cmEtZWRpdG9yLW1vZGFsJyxcbiAgICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG4gICAgc3R5bGVzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgUGludHVyYUVkaXRvck1vZGFsQ29tcG9uZW50PFQ+XG4gICAgZXh0ZW5kcyBQaW50dXJhRWRpdG9yQWJzdHJhY3RDb21wb25lbnQ8VD5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgaW5pdEVkaXRvcihlbGVtZW50OiBIVE1MRWxlbWVudCwgcHJvcHM6IFBpbnR1cmFFZGl0b3JPcHRpb25zKTogUGludHVyYUVkaXRvck1vZGFsIHtcbiAgICAgICAgcmV0dXJuIG9wZW5FZGl0b3IocHJvcHMpO1xuICAgIH1cblxuICAgIHNob3dFZGl0b3IoKTogdm9pZCB7XG4gICAgICAgICh0aGlzLmVkaXRvciBhcyBQaW50dXJhRWRpdG9yTW9kYWwpLnNob3coKTtcbiAgICB9XG5cbiAgICBoaWRlRWRpdG9yKCk6IHZvaWQge1xuICAgICAgICAodGhpcy5lZGl0b3IgYXMgUGludHVyYUVkaXRvck1vZGFsKS5oaWRlKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5lZGl0b3IpIHJldHVybjtcbiAgICAgICAgdGhpcy5lZGl0b3IgPSB1bmRlZmluZWQ7XG4gICAgfVxufVxuIl19