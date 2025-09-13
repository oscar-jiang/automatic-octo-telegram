from fastapi import APIRouter

router = APIRouter(
    prefix="/advisory",
    tags=["advisory"]
)

@router.get("/get-advisory")
def advisory():
    return
