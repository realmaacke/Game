use macroquad::prelude::*;

#[macroquad::main("RPG")]
async fn main() {
    loop {
        clear_background(BLACK);
        draw_text("Application using macroquad", 20.0, 40.0, 30.0, WHITE);
        next_frame().await;
    }
}
