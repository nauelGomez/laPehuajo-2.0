import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@NgModule({
	declarations: [],
	imports: [BrowserModule,
		AppComponent,
		FormsModule,
		BrowserAnimationsModule,
		CommonModule,
	FormsModule],
	providers: []
})
export class AppModule {
}
