export interface IMaterial{
    name: string;
    price: number;
}

export const materialsConfig: IMaterial[] = [
     {
        name: "Серебро",
        price: 65
     },
     {
        name: "Золото",
        price: 2400.00
     },
     {
        name: "Медь",
        price: 665.00
     },
     {
        name: "Алюминий",
        price: 163.00
     },
     {
        name: "Платина",
        price: 65.02
     }
]