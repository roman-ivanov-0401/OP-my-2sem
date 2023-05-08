import { NavBarPointProps } from "../NavBarPoint"

export const unauthorizedPoints: NavBarPointProps[] = [
    {
        name: "Авторизация",
        path: "login"
    },
    {
        name: "Регистрация",
        path: "/register"
    }
]

export const userPoints: NavBarPointProps[] = [
    {
        name: "Каталог",
        path: "/catalog"
    },
    {
        name: "Залог",
        path: "/pledge"
    },
    {
        name: "Калькулятор",
        path: "/calculator"
    },
    {
        name: "Корзина",
        path: "/cart"
    }
]

export const adminPoints: NavBarPointProps[] = [
    {
        name: "Пользователи",
        path: "/users"
    },
    {
        name: "Товары",
        path: "/products"
    }
]