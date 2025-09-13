from fastapi import APIRouter, Query

from backend.services.weather import generate_advice

router = APIRouter(
    prefix="/advisory",
    tags=["advisory"]
)

@router.get("/get-advice")
def advisory(
    lat: float = Query(..., description="Latitude of the farm"),
    lon: float = Query(..., description="Longitude of the farm"),
    crop: str = Query(..., description="Type of crop")
):
    return generate_advice(lat, lon, crop)
