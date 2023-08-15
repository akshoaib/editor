import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularPinturaModule } from 'angular-pintura';

import { FilePondModule, registerPlugin } from 'ngx-filepond';

import * as FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import * as FilePondPluginImageEditor from 'filepond-plugin-image-editor';

// @ts-ignore
registerPlugin(FilePondPluginFilePoster, FilePondPluginImageEditor.default);

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AngularPinturaModule, FilePondModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
