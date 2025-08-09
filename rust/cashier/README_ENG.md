# Cashier

This is a practice exercise I did to learn Rust.

I didn't meet all the exercise requirements, but I feel like I've learned a lot about the basics of Rust in the process, which is exactly what I wanted!

I'll probably upload more in the future.

## Statement

Create a model for an ATM. A login must be written that supports validation for three key fields:

1. Card number: 6200112211002211.
2. ID: 22000111.
3. Password: 159753.

This data for access validation must be internal; it cannot be changed or updated; it is defined internally. Upon successful validation, the model should display five options.

1. - Check Balance.
2. - Deposit.
3. - Withdraw.
4. - Log out.
5. - Exit.

The currency used will be $.

1. In the "Inquiry" section, the account amount should be displayed. It should start with an initial amount of $100.

2. To deposit, enter the amount and add it to the account amount. The deposit must also be requested.

3. To withdraw, it must be verified that the user is attempting to debit more than the account has. Otherwise, the debit should not be allowed. A 2% fee must be charged for each transaction when debiting; the balance should never be negative.

4. When logging out, the form should not be closed; instead, the user must be redirected to the login page so that the user can log in again.

5. This option does close the form. This is the only possible way out.