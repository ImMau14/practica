use actix_cors::Cors;
use actix_files::Files;
use actix_web::{
    get, web, App, HttpResponse, HttpServer, Responder, middleware::Logger
};
use serde::Serialize;
use std::{panic, time::Instant};

mod products;
mod sort;

use products::gen_products_vector;

#[derive(Serialize)]
struct SuccessResponse {
    success: bool,
    bubble_time: f32,
    merge_time: f32,
    quick_by_sales_time: f32,
    quick_by_prices_time: f32,
}

#[derive(Serialize)]
struct ErrorResponse {
    success: bool,
    error: String,
}

#[get("/sort_data")]
async fn short_data() -> impl Responder {
    let result = panic::catch_unwind(|| {
        let products = gen_products_vector(1000);

        // Bubble sort by price
        let mut v1 = products.clone();
        let t = Instant::now();
        sort::bubble_sort_by_price(&mut v1);
        let bubble_time = t.elapsed().as_secs_f32();

        // Merge sort by rating/class
        let mut v2 = products.clone();
        let t = Instant::now();
        sort::merge_sort_by_rating(&mut v2);
        let merge_time = t.elapsed().as_secs_f32();

        // Quick sort by sales
        let mut v3 = products.clone();
        let t = Instant::now();
        sort::quick_sort_by_sales(&mut v3);
        let quick_by_sales_time = t.elapsed().as_secs_f32();

        // Quick sort by price
        let mut v4 = products.clone();
        let t = Instant::now();
        sort::quick_sort_by_price(&mut v4);
        let quick_by_prices_time = t.elapsed().as_secs_f32();

        SuccessResponse {
            success: true,
            bubble_time,
            merge_time,
            quick_by_sales_time,
            quick_by_prices_time,
        }
    });

    match result {
        Ok(success) => HttpResponse::Ok().json(success),
        Err(payload) => {
            let msg = if let Some(s) = payload.downcast_ref::<&str>() {
                s.to_string()
            } else if let Some(s) = payload.downcast_ref::<String>() {
                s.clone()
            } else {
                "unknown panic".to_string()
            };
            HttpResponse::InternalServerError().json(ErrorResponse { success: false, error: msg })
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();
    let port = std::env::var("PORT").unwrap_or_else(|_| "8080".to_string());
    let bind_addr = format!("0.0.0.0:{}", port);
    println!("Listening on http://{}", bind_addr);

    let dev_mode = std::env::var("DEV").is_ok();

    HttpServer::new(move || {
        let cors = if dev_mode {
            Cors::permissive()
        } else {
            Cors::default()
                .allowed_methods(vec!["GET", "POST", "OPTIONS"])
                .allowed_header(actix_web::http::header::CONTENT_TYPE)
                .max_age(3600)
        };

        App::new()
            .wrap(Logger::default())
            .wrap(cors)
            .service(
                web::scope("/api")
                    .service(short_data)
            )
            .service(Files::new("/", "./dist").index_file("index.html").prefer_utf8(true))
    })
    .bind(bind_addr)?
    .run()
    .await
}
