use rand::Rng;

#[allow(dead_code)]
#[derive(Clone, Debug)]
pub struct Product {
    pub id: u16,
    pub name: String,
    pub price: u16,
    pub sales: u16,
    pub class: f32,
    pub seller_rep: u8,
    pub available: bool,
    pub model: u16,
}

pub fn gen_products_vector(n: u16) -> Vec<Product> {
    let mut rng = rand::rng();
    let mut products_vector = Vec::new();

    for i in 0..=n {
        products_vector.push(
            Product {
                id: i,
                name: format!("Product {i}"),
                price: rng.random_range(100..=10000),
                sales: rng.random_range(0..=5000),
                class: rng.random_range(0..=5) as f32,
                seller_rep: rng.random_range(0..=10),
                available: rng.random(),
                model: rng.random_range(2000..=2025),
            }
        );
    }

    products_vector
}