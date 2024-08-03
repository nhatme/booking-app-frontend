import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { DetailComponent } from './page/detail/detail.component';
import { ContactComponent } from './page/contact/contact.component';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { CheckoutComponent } from './page/checkout/checkout.component';
import { PaymentComponent } from './page/payment/payment.component';
import { LayoutComponent } from './page/layout/layout.component';
import { CategoryComponent } from './page/category/category.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'detail/:id',
                component: DetailComponent,
            },
            {
                path: 'checkout',
                component: CheckoutComponent
            },
            {
                path: 'payment',
                component: PaymentComponent
            },
            {
                path: 'all',
                component: CategoryComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
];
