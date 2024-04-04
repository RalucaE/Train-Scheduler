import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { TrainRoutesComponent } from './pages/train-routes/train-routes.component';
import { HomeComponent } from './pages/home/home.component';
import { TicketTypeSelectionComponent } from './pages/ticket-type-selection/ticket-type-selection.component';
import { PassengerInfoComponent } from './pages/passenger-info/passenger-info.component';
import { TicketHistoryComponent } from './pages/ticket-history/ticket-history.component';
import { SelectSeatComponent } from './pages/select-seat/select-seat.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentSuccessfulComponent } from './pages/payment-successful/payment-successful.component';
import { NotFound404Component } from './pages/not-found404/not-found404.component';
import { AccountConfirmationComponent } from './pages/account-confirmation/account-confirmation.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:"login", component: LoginComponent},
  { path: "signup", component: SignUpComponent },
  { path: "user-info", component: UserInfoComponent },
  { path: "train-route", component: TrainRoutesComponent},
  { path: "home", component:HomeComponent},
  { path: "ticket-type", component:TicketTypeSelectionComponent },
  { path: "passenger-info", component:PassengerInfoComponent },
  { path: "ticket-history", component:TicketHistoryComponent},
  { path: "select-seat", component: SelectSeatComponent},
  { path: "checkout", component: CheckoutComponent },
  { path: "payment-successful", component:PaymentSuccessfulComponent },
  { path:"404", component: NotFound404Component},
  { path: "account-confirmation", component:AccountConfirmationComponent },
  { path: "**", redirectTo: '/home' }  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }