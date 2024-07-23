import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { DetailComponent } from './page/detail/detail.component';
import { ContactComponent } from './page/contact/contact.component';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { CheckoutComponent } from './page/checkout/checkout.component';
import { PaymentComponent } from './page/payment/payment.component';
import { LayoutComponent } from './page/layout/layout.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'detail',
                component: DetailComponent,
            },
            {
                path: 'contact',
                component: ContactComponent
            },
            {
                path: 'checkout',
                component: CheckoutComponent
            },
            {
                path: 'payment',
                component: PaymentComponent
            },

        ]
    },
    {
        path: 'signup',
        component: SignupComponent
    },


];
