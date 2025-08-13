cd frontend
pnpm install && pnpm run build
cp -r dist ../backend && cd ../backend
cargo build --release