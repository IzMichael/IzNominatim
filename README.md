# IzNominatim
A simple API to proxy requests to a self-hosted [Nominatim](https://nominatim.org/) instance.

## Address to JSON
Send a `POST` request to `/latlng`, with the addresses to lookup in the JSON body.
```http
POST /latlng
```
Body:
```json
{
    "addresses": [
        "10 Downing Street, London, UK",
        "1600 Pennsylvania Avenue NW, Washington DC, USA",
        "1 Molesworth Street, Wellington, NZ"
    ]
}
```
