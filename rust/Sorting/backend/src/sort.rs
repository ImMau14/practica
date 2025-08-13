use crate::products::Product;

pub fn quick_sort_by_sales(products: &mut [Product]) {
    if products.len() <= 1 {
        return;
    }
    
    let pivot_index = partition_by_sales(products);
    let (left, right) = products.split_at_mut(pivot_index);
    quick_sort_by_sales(left);
    quick_sort_by_sales(&mut right[1..]);
}

fn partition_by_sales(products: &mut [Product]) -> usize {
    let pivot = products[products.len() / 2].sales;
    let mut i = 0;
    let mut j = products.len() - 1;
    
    loop {
        while i < j && products[i].sales > pivot {
            i += 1;
        }
        while i < j && products[j].sales < pivot {
            j -= 1;
        }
        
        if i >= j {
            return j;
        }
        
        products.swap(i, j);
        i += 1;
        j -= 1;
    }
}

pub fn merge_sort_by_rating(products: &mut [Product]) {
    if products.len() <= 1 {
        return;
    }
    
    let mid = products.len() / 2;
    let mut left = products[..mid].to_vec();
    let mut right = products[mid..].to_vec();
    
    merge_sort_by_rating(&mut left);
    merge_sort_by_rating(&mut right);
    
    merge_by_rating(products, &left, &right);
}

fn merge_by_rating(products: &mut [Product], left: &[Product], right: &[Product]) {
    let mut i = 0;
    let mut j = 0;
    let mut k = 0;
    
    while i < left.len() && j < right.len() {
        if left[i].class >= right[j].class {
            products[k] = left[i].clone();
            i += 1;
        } else {
            products[k] = right[j].clone();
            j += 1;
        }
        k += 1;
    }
    
    while i < left.len() {
        products[k] = left[i].clone();
        i += 1;
        k += 1;
    }
    
    while j < right.len() {
        products[k] = right[j].clone();
        j += 1;
        k += 1;
    }
}

// Bubble sort
pub fn bubble_sort_by_price(products: &mut [Product]) {
    let n = products.len();
    for i in 0..n {
        for j in 0..n - i - 1 {
            if products[j].price > products[j + 1].price {
                products.swap(j, j + 1);
            }
        }
    }
}

pub fn quick_sort_by_price(products: &mut [Product]) {
    if products.len() <= 1 {
        return;
    }
    
    let pivot_index = partition_by_price(products);
    let (left, right) = products.split_at_mut(pivot_index);
    quick_sort_by_price(left);
    quick_sort_by_price(&mut right[1..]);
}

fn partition_by_price(products: &mut [Product]) -> usize {
    let pivot = products[products.len() / 2].price;
    let mut i = 0;
    let mut j = products.len() - 1;
    
    loop {
        while i < j && products[i].price < pivot {
            i += 1;
        }
        while i < j && products[j].price > pivot {
            j -= 1;
        }
        
        if i >= j {
            return j;
        }
        
        products.swap(i, j);
        i += 1;
        j -= 1;
    }
}