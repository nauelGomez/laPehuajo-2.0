import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
	declarations: [],
	imports: [BrowserModule,
		AppComponent,
		FormsModule,
		BrowserAnimationsModule,
		CommonModule,
	FormsModule,
	RouterModule.forRoot([])],
	providers: []
})
export class AppModule {
}
