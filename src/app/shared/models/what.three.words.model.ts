
export interface WhatsThreeWords {
    "country": string,
    "square": {
        "southwest": {
            "lng": number,
            "lat": number
        },
        "northeast": {
            "lng": number,
            "lat": number
        }
    },
    "nearestPlace": string,
    "coordinates": {
        "lng": number,
        "lat": number
    },
    "words": string,
    "language": string,
    "map": string
}
