from fastapi import FastAPI, Depends, UploadFile, File
from sqlalchemy.orm import Session
from . import models, crud, database
from .database import engine
from pydantic import BaseModel
from datetime import datetime
import os
import shutil
import random

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Pydantic-схеми ---
class EventCreate(BaseModel):
    title: str
    description: str = None
    date: datetime
    type: str = None   # NEW

class PlayerCreate(BaseModel):
    username: str
    email: str
    password: str

class CardCreate(BaseModel):
    id: str
    name: str
    description: str
    quantity: int
    team: str
    img: str = None

# --- Ендпоїнти подій ---
@app.post("/events/")
def create_event(event: EventCreate, db: Session = Depends(get_db)):
    return crud.create_event(db, event.title, event.description, event.date, event.type)

@app.get("/events/")
def list_events(db: Session = Depends(get_db)):
    return crud.get_events(db)

# --- Ендпоїнти гравців ---
@app.post("/players/")
def create_player(player: PlayerCreate, db: Session = Depends(get_db)):
    return crud.create_player(db, player.username, player.email, player.password)

@app.get("/players/")
def list_players(db: Session = Depends(get_db)):
    return crud.get_players(db)

# --- Ендпоїнти медіа ---
@app.post("/media/")
def upload_media(description: str = None, file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_type = "photo" if file.content_type.startswith("image/") else "pdf"
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)
    return crud.create_media(db, filename=file.filename, file_type=file_type, url=file_location, description=description)

@app.get("/media/")
def list_media(db: Session = Depends(get_db)):
    return crud.get_media(db)

# --- Ендпоїнти правил ---
@app.post("/rules/")
def upload_rule(title: str, description: str = None,
                pdf: UploadFile = File(None), image: UploadFile = File(None),
                db: Session = Depends(get_db)):

    pdf_filename = None
    image_filename = None

    if pdf:
        pdf_filename = os.path.join(UPLOAD_DIR, pdf.filename)
        with open(pdf_filename, "wb") as f:
            shutil.copyfileobj(pdf.file, f)

    if image:
        image_filename = os.path.join(UPLOAD_DIR, image.filename)
        with open(image_filename, "wb") as f:
            shutil.copyfileobj(image.file, f)

    return crud.create_rule(db, title=title, description=description, pdf_filename=pdf_filename, image_filename=image_filename)

@app.get("/rules/")
def list_rules(db: Session = Depends(get_db)):
    return crud.get_rules(db)

# --- Ендпоїнти карток ---
@app.post("/cards/")
def create_card(card: CardCreate, db: Session = Depends(get_db)):
    return crud.create_card(db, card.id, card.name, card.description, card.quantity, card.team, card.img)

@app.get("/cards/")
def list_cards(db: Session = Depends(get_db)):
    return crud.get_cards(db)

@app.post("/game/start")
def start_game(player_ids: list[int], db: Session = Depends(get_db)):
    cards = crud.get_cards(db)
    roles_pool = []
    for card in cards:
        roles_pool.extend([card.id] * card.quantity)

    if len(player_ids) > len(roles_pool):
        return {"error": "Недостатньо ролей"}

    random.shuffle(roles_pool)
    assignments = {player_ids[i]: roles_pool[i] for i in range(len(player_ids))}

    return {"assignments": assignments}