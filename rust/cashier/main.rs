use std::fmt;
use std::io::{self, Write};
use std::process::Command;

// For headers
const DEFAULT_LINE_LENGHT: usize = 60;

#[derive(Debug)]
pub enum AccountError {
    ParseError,
    Overflow,
    InsufficientFunds
}

impl fmt::Display for AccountError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AccountError::ParseError => write!(f, "parse error"),
            AccountError::Overflow => write!(f, "numeric overflow"),
            AccountError::InsufficientFunds => write!(f, "insufficient funds")
        }
    }
}

pub struct User<'a> {
    pub card_num: &'a str,
    pub ci: &'a str,
    pub password: &'a str,
    pub amount: i64,
}

impl<'a> User<'a> {
    pub fn formatted_balance(&self) -> String {
        let sign = if self.amount < 0 { "-" } else { "" };
        let abs = self.amount.abs();
        let whole = abs / 100;
        let frac = abs % 100;
        format!("{}{}.{:02}", sign, whole, frac)
    }

    pub fn deposit_cents(&mut self, cents: i64) -> Result<(), AccountError> {
        self.amount = self
            .amount
            .checked_add(cents)
            .ok_or(AccountError::Overflow)?;
        Ok(())
    }

    pub fn withdraw_cents(&mut self, cents: i64) -> Result<(), AccountError> {
        if self.amount < cents {
            return Err(AccountError::InsufficientFunds);
        }
        self.amount = self
            .amount
            .checked_sub(cents)
            .ok_or(AccountError::Overflow)?;
        Ok(())
    }

    pub fn parse_amount_to_cents(s: &str) -> Result<i64, AccountError> {
        let s = s.trim();
        if s.is_empty() {
            return Err(AccountError::ParseError);
        }

        let negative = s.starts_with('-');
        let s = s.trim_start_matches('+').trim_start_matches('-');

        if s.chars().filter(|&c| c == '.').count() > 1 {
            return Err(AccountError::ParseError);
        }

        let mut parts = s.split('.');
        let whole_str = parts.next().unwrap_or("");
        let frac_str = parts.next().unwrap_or("");

        let mut whole: i64 = if whole_str.is_empty() {
            0
        } else {
            whole_str.parse::<i64>().map_err(|_| AccountError::ParseError)?
        };

        let frac_cents: i64 = if frac_str.is_empty() {
            0
        } else if frac_str.len() == 1 {
            let d = frac_str.parse::<i64>().map_err(|_| AccountError::ParseError)?;
            d * 10
        } else {
            // At least 2 digits
            let mut cents = frac_str[0..2].parse::<i64>().map_err(|_| AccountError::ParseError)?;
            if frac_str.len() > 2 {
                let third = frac_str.chars().nth(2).unwrap();
                if third >= '5' {
                    cents += 1;
                    if cents >= 100 {
                        cents = 0;
                        whole = whole.checked_add(1).ok_or(AccountError::Overflow)?;
                    }
                }
            }
            cents
        };

        let mut cents = whole
            .checked_mul(100)
            .ok_or(AccountError::Overflow)?
            .checked_add(frac_cents)
            .ok_or(AccountError::Overflow)?;
        if negative {
            cents = -cents;
        }
        Ok(cents)
    }

    pub fn deposit_from_str(&mut self, s: &str) -> Result<(), AccountError> {
        let cents = Self::parse_amount_to_cents(s)?;
        self.deposit_cents(cents)
    }

    pub fn withdraw_from_str(&mut self, s: &str) -> Result<(), AccountError> {
        let cents = Self::parse_amount_to_cents(s)?;
        self.withdraw_cents(cents)
    }
}

// This function clears the screen
fn clear() {
    if cfg!(target_os = "windows") {
        Command::new("cmd")
            .args(["/C", "cls"])
            .spawn()
            .expect("Failed to clear the screen on Windows")
            .wait()
            .expect("Failed to execute the clear command");
    } else {
        Command::new("clear")
            .spawn()
            .expect("Failed to clear the screen on Unix")
            .wait()
            .expect("Failed to execute the clear command");
    }
}

// This function format a string to a header
fn header(text: &str) {
    let mut return_line: String = {
        if text.is_empty() {
            String::from("")
        } else {
            format!(" {} ", text.to_uppercase())
        }
    };

    while DEFAULT_LINE_LENGHT > return_line.len() {
        return_line = format!("-{return_line}-");
    }

    while DEFAULT_LINE_LENGHT < return_line.len() {
        return_line.pop();
    }

    println!("{}\n", return_line);
}

// This is a utility function to simplify user input.
fn input(prompt: &str) -> String {
    let mut user_input: String = String::new();

    print!("{prompt}");
    io::stdout().flush().expect("Failed to flush stdout");
    io::stdin()
        .read_line(&mut user_input)
        .expect("Failed to read the user input");

    user_input.trim().to_string()
}

// This function simulate the login
fn login(user: &User) -> bool {
    header("login");
    println!("Insert the correct credentials to login.\n");

    let card_num: String = input("Insert the correct num card: ");
    let ci: String = input("Insert the correct CI: ");
    let password: String = input("Insert the correct password: ");

    user.card_num == card_num && user.ci == ci && user.password == password
}

// To get a valid menu option value from int
fn get_menu_variant_from_number(number: u8) -> Option<Menu> {
    match number {
        1 => Some(Menu::CheckBalance),
        2 => Some(Menu::Deposit),
        3 => Some(Menu::Withdraw),
        4 => Some(Menu::LogOut),
        5 => Some(Menu::Exit),
        _ => None,
    }
}

enum Menu {
    CheckBalance,
    Deposit,
    Withdraw,
    LogOut,
    Exit,
}

fn get_option() -> u8 {
    let option = loop {
        match input("Option: ").trim().parse() {
            Ok(num) => {
                if !(1..=5).contains(&num) {
                    println!("Index out of range.\n");
                    continue;
                }

                println!();
                break num;
            }
            Err(_) => {
                println!("Error reading the option.\n");
                continue;
            }
        }
    };
    option
}

// Interactive read loop for money amounts, returns cents (i64)
fn get_amount_from_user(prompt: &str, on_error_prompt: &str) -> i64 {
    loop {
        let s = input(prompt);
        match User::parse_amount_to_cents(&s) {
            Ok(c) => {
                println!();
                return c;
            }
            Err(_) => {
                println!("{}", on_error_prompt);
                continue;
            }
        }
    }
}

fn main() {
    let mut user: User = User {
        card_num: "1",
        ci: "2",
        password: "3",
        amount: 10000, // 100.00 $ initial
    };

    let press_enter_to_continue = || {
        input("Press enter to continue...");
    };

    let clear_enter_n_continue = || {
        press_enter_to_continue();
        clear();
    };

    let clear_n_header = |header_text: &str| {
        clear();
        header(header_text);
    };

    loop {
        if !login(&user) {
            println!("\nLogin failed!\n");
            clear_enter_n_continue();
            continue;
        }

        println!("\nLogin success!");
        clear_enter_n_continue();

        loop {
            header("dashboard");
            println!("1. Check Balance");
            println!("2. Deposit");
            println!("3. Withdraw");
            println!("4. LogOut");
            println!("5. Exit\n");

            let option: Option<Menu> = get_menu_variant_from_number(get_option());

            match option {
                Some(menu_option) => match menu_option {
                    Menu::CheckBalance => {
                        clear_n_header("balance");
                        println!("Your balance is: {} $\n", user.formatted_balance());
                        clear_enter_n_continue();
                        continue;
                    }

                    Menu::Deposit => {
                        clear_n_header("deposit");
                        println!("Current balance: {} $\n", user.formatted_balance());

                        let deposit_cents: i64 = get_amount_from_user(
                            "Insert the deposit amount: ",
                            "Error reading the deposit.\n",
                        );

                        match user.deposit_cents(deposit_cents) {
                            Ok(()) => {
                                println!(
                                    "Deposit successfully! New balance is {} $\n",
                                    user.formatted_balance()
                                );
                            }
                            Err(e) => {
                                println!("Deposit failed: {}.\n", e);
                            }
                        }

                        clear_enter_n_continue();
                        continue;
                    }

                    Menu::Withdraw => {
                        clear_n_header("withdraw");
                        println!("Current balance: {} $\n", user.formatted_balance());

                        let withdraw_cents: i64 = get_amount_from_user(
                            "Insert the withdraw amount: ",
                            "Error reading the withdraw.\n",
                        );

                        match user.withdraw_cents(withdraw_cents) {
                            Ok(()) => {
                                println!(
                                    "Withdraw successfully! New balance is {} $\n",
                                    user.formatted_balance()
                                );
                            }
                            Err(AccountError::InsufficientFunds) => {
                                println!("Insufficient funds! The balance has not changed\n");
                            }
                            Err(e) => {
                                println!("Withdraw failed: {}.\n", e);
                            }
                        }

                        clear_enter_n_continue();
                        continue;
                    }

                    Menu::LogOut => {
                        clear_n_header("loggout");
                        println!("You has loggout!\n");
                        clear_enter_n_continue();
                        break;
                    }

                    Menu::Exit => return,
                },
                None => {
                    println!("Internal pointer variable. Onli programin focuson the carrer");
                }
            }
        }
    }
}
