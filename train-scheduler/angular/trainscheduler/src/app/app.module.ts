import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { TrainRoutesComponent } from './pages/train-routes/train-routes.component';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule} from '@angular/material/card';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { TicketTypeSelectionComponent } from './pages/ticket-type-selection/ticket-type-selection.component';
import { PassengerInfoComponent } from './pages/passenger-info/passenger-info.component';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { TicketHistoryComponent } from './pages/ticket-history/ticket-history.component';
import { FilterPipe } from './entity/FilterPipe';
import { SelectSeatComponent } from './pages/select-seat/select-seat.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentSuccessfulComponent } from './pages/payment-successful/payment-successful.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TokenexpirationdialogComponent } from './pages/tokenexpirationdialog/tokenexpirationdialog.component';
import { MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReturnRoutesDialogComponent } from './pages/return-routes-dialog/return-routes-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NotFound404Component } from './pages/not-found404/not-found404.component';
import { AccountConfirmationComponent } from './pages/account-confirmation/account-confirmation.component';
import { NotLoggedInModalComponent } from './pages/not-logged-in-modal/not-logged-in-modal.component';
import { GobackwarningdialogComponent } from './pages/gobackwarningdialog/gobackwarningdialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    UserInfoComponent,
    TrainRoutesComponent,
    HomeComponent,
    TicketTypeSelectionComponent,
    PassengerInfoComponent,
    TicketHistoryComponent,
    FilterPipe,
    SelectSeatComponent,
    CheckoutComponent,
    PaymentSuccessfulComponent,
    TokenexpirationdialogComponent,
    ReturnRoutesDialogComponent,
    NotFound404Component,
    AccountConfirmationComponent,
    NotLoggedInModalComponent,
    GobackwarningdialogComponent

  ],
  entryComponents: [
    TokenexpirationdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  providers: [DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
