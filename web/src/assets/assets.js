import food_1 from './menu/chickens/1_mieng_ga_gion.jpg'
import food_2 from './menu/chickens/3_mieng_ga_gion.jpg'
import food_5 from './menu/chickens/combo_1_mieng_ga_gion.jpg'
import food_6 from './menu/chickens/combo_2_mieng_ga_gion.jpg'

import spa_1 from './menu/spaghetti/combo_mi_y_1.jpg'
import spa_2 from './menu/spaghetti/combo_mi_y_2.jpg'
import spa_3 from './menu/spaghetti/mi_y_pho_mai.jpg'
import spa_4 from './menu/spaghetti/mi_y_pho_mai_ga_vien.jpg'
import spa_5 from './menu/spaghetti/mi_y_pho_mai_ga_khong_xuong.jpg'
import spa_6 from './menu/spaghetti/mi_y_pho_mai_donut_tom.jpg'

import drk_1 from './menu/drinks/coca_cola.jpg'
import drk_2 from './menu/drinks/coca_zero.jpg'
import drk_3 from './menu/drinks/sprite.jpg'
import drk_4 from './menu/drinks/fanta.jpg'

export const food_list = [
    {
        id: "1",
        name: "Combo Gà giòn - 1 miếng",
        image: food_5,
        price: 55000,
        description: "Phần ăn gồm: 01 Gà giòn + 01 Khoai tây chiên (S) + 01 Nước ngọt",
        category: "Fried_Chicken"
    },
    {
        id: "2",
        name: "Combo Gà giòn - 2 miếng",
        image: food_6,
        price: 55000,
        description: "Phần ăn gồm: 02 Gà giòn + 01 Khoai tây chiên (S) + 01 Nước ngọt",
        category: "Fried_Chicken"
    },
    {
        id: "3",
        name: "1 miếng gà giòn",
        image: food_1,
        price: 35000,
        description: "Gà giòn - Phần gà được phục vụ ngẫu nhiên",
        category: "Fried_Chicken"
    },
    {
        id: "4",
        name: "3 miếng gà giòn",
        image: food_2,
        price: 100000,
        description: "3 miếng gà giòn",
        category: "Fried_Chicken"
    },
    {
        id: "5",
        name: "6 miếng gà giòn",
        image: food_2,
        price: 200000,
        description: "6 miếng gà giòn (Hình ảnh minh họa)",
        category: "Fried_Chicken"
    },
    {
        id: "6",
        name: "9 miếng gà giòn",
        image: food_2,
        price: 300000,
        description: "9 miếng gà giòn (Hình ảnh minh họa)",
        category: "Fried_Chicken"
    },

    // Spaghetti
    {
        id: "7",
        name: "Combo Mì Ý 1",
        image: spa_1,
        price: 79000,
        description: "Phần ăn gồm: 01 Mì Ý + 01 Gà giòn + 01 Nước ngọt",
        category: "Spaghetti"
    },
    {
        id: "8",
        name: "Combo Mì Ý 2",
        image: spa_2,
        price: 139000,
        description: "Phần ăn gồm: 02 Mì Ý + 01 Gà giòn + 1 Khoai tây chiên (S) + 2 Nước ngọt",
        category: "Spaghetti"
    },
    {
        id: "9",
        name: "Mì Ý Phô Mai",
        image: spa_3,
        price: 45000,
        description: "Phần ăn gồm: 1 Mì Ý Phô Mai",
        category: "Spaghetti"
    },
    {
        id: "11",
        name: "Mì Ý Phô Mai Gà Viên",
        image: spa_4,
        price: 55000,
        description: "Phần ăn gồm: 1 Mì Ý Phô Mai Gà Viên",
        category: "Spaghetti"
    },
    {
        id: "12",
        name: "Mì Ý Phô Mai Gà Không Xương",
        image: spa_5,
        price: 69000,
        description: "Phần ăn gồm: 1 Mì Ý Phô Mai + 2 miếng gà không xương",
        category: "Spaghetti"
    },
    {
        id: "13",
        name: "Mì Ý Phô Mai Donut Tôm",
        image: spa_6,
        price: 69000,
        description: "Phần ăn gồm: 1 Mì Ý Phô Mai + 1 Donut Tôm",
        category: "Spaghetti"
    },

    // Drinks
    {
        id: "14",
        name: "Coca Cola",
        image: drk_1,
        price: 15000,
        description: "Coca Cola",
        category: "Drink"
    },
    {
        id: "15",
        name: "Coca Cola Zero",
        image: drk_2,
        price: 15000,
        description: "Coca Cola Zero",
        category: "Drink"
    },
    {
        id: "16",
        name: "Sprite",
        image: drk_3,
        price: 15000,
        description: "Sprite",
        category: "Drink"
    },
    {
        id: "17",
        name: "Fanta",
        image: drk_4,
        price: 15000,
        description: "Fanta",
        category: "Drink"
    },
]