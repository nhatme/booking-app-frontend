export interface DataAPI {
    id: number,
    name: string,
    presale: number,
    price: number,
    hot: number,
    duration: string,
    address: string,
    image: string,
    description: string,
    category: string
}

export interface UserValid {
    id: string,
    username: string,
    password: string,
    phonenumber: string
}

export interface Booking {
    id: string,
    name: string,
    price: number,
    img: string,
    address: string,
    category: string,
    passengerCount: number,
    tourStartDate: string
    count: number,
    selected: boolean
}