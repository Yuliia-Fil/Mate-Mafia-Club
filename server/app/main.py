from fastapi import FastAPI, Depends, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
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

# --- CORS для фронтенда ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- Pydantic-схеми ---
class EventBase(BaseModel):
    title: str
    description: str | None = None
    date: datetime
    type: str | None = None

class Event(EventBase):
    id: int
    class Config:
        orm_mode = True

class PlayerBase(BaseModel):
    username: str
    email: str
    password: str

class Player(PlayerBase):
    id: int
    class Config:
        orm_mode = True

class CardBase(BaseModel):
    id: str
    name: str
    description: str
    quantity: int
    team: str
    img: str | None = None

class Card(CardBase):
    class Config:
        orm_mode = True

class Media(BaseModel):
    id: int
    filename: str
    file_type: str
    url: str
    description: str | None = None
    class Config:
        orm_mode = True

class Rule(BaseModel):
    id: int
    title: str
    description: str | None
    pdf_filename: str | None
    image_filename: str | None
    class Config:
        orm_mode = True


# --- Ендпоінти подій ---
@app.post("/events/", response_model=Event)
def create_event(event: EventBase, db: Session = Depends(get_db)):
    return crud.create_event(db, event.title, event.description, event.date, event.type)

@app.get("/events/", response_model=list[Event])
def list_events(db: Session = Depends(get_db)):
    return crud.get_events(db)

@app.put("/events/{event_id}", response_model=Event)
def update_event_endpoint(event_id: int, event: EventBase, db: Session = Depends(get_db)):
    updated = crud.update_event(db, event_id, event.title, event.description, event.date, event.type)
    if not updated:
        raise HTTPException(status_code=404, detail="Event not found")
    return updated

@app.delete("/events/{event_id}")
def delete_event_endpoint(event_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_event(db, event_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"detail": "Event deleted"}


# --- Ендпоінти гравців ---
@app.post("/players/", response_model=Player)
def create_player(player: PlayerBase, db: Session = Depends(get_db)):
    return crud.create_player(db, player.username, player.email, player.password)

@app.get("/players/", response_model=list[Player])
def list_players(db: Session = Depends(get_db)):
    return crud.get_players(db)

@app.put("/players/{player_id}", response_model=Player)
def update_player_endpoint(player_id: int, player: PlayerBase, db: Session = Depends(get_db)):
    updated = crud.update_player(db, player_id, player.username, player.email, player.password)
    if not updated:
        raise HTTPException(status_code=404, detail="Player not found")
    return updated

@app.delete("/players/{player_id}")
def delete_player_endpoint(player_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_player(db, player_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Player not found")
    return {"detail": "Player deleted"}


# --- Ендпоінти медіа ---
@app.post("/media/", response_model=Media)
def upload_media(description: str = None, file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_type = "photo" if file.content_type.startswith("image/") else "pdf"
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)
    return crud.create_media(db, filename=file.filename, file_type=file_type, url=file_location, description=description)

@app.get("/media/", response_model=list[Media])
def list_media(db: Session = Depends(get_db)):
    return crud.get_media(db)

@app.put("/media/{media_id}", response_model=Media)
def update_media_endpoint(media_id: int, description: str = None, db: Session = Depends(get_db)):
    updated = crud.update_media(db, media_id, description=description)
    if not updated:
        raise HTTPException(status_code=404, detail="Media not found")
    return updated

@app.delete("/media/{media_id}")
def delete_media_endpoint(media_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_media(db, media_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Media not found")
    return {"detail": "Media deleted"}


# --- Ендпоінти правил ---
@app.post("/rules/", response_model=Rule)
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

@app.get("/rules/", response_model=list[Rule])
def list_rules(db: Session = Depends(get_db)):
    return crud.get_rules(db)

@app.put("/rules/{rule_id}", response_model=Rule)
def update_rule_endpoint(rule_id: int, title: str = None, description: str = None, db: Session = Depends(get_db)):
    updated = crud.update_rule(db, rule_id, title=title, description=description)
    if not updated:
        raise HTTPException(status_code=404, detail="Rule not found")
    return updated

@app.delete("/rules/{rule_id}")
def delete_rule_endpoint(rule_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_rule(db, rule_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Rule not found")
    return {"detail": "Rule deleted"}


# --- Ендпоінти карток ---
@app.post("/cards/", response_model=Card)
def create_card(card: CardBase, db: Session = Depends(get_db)):
    return crud.create_card(db, card.id, card.name, card.description, card.quantity, card.team, card.img)

@app.get("/cards/", response_model=list[Card])
def list_cards(db: Session = Depends(get_db)):
    return crud.get_cards(db)

@app.put("/cards/{card_id}", response_model=Card)
def update_card_endpoint(card_id: str, card: CardBase, db: Session = Depends(get_db)):
    updated = crud.update_card(db, card_id, card.name, card.description, card.quantity, card.team, card.img)
    if not updated:
        raise HTTPException(status_code=404, detail="Card not found")
    return updated

@app.delete("/cards/{card_id}")
def delete_card_endpoint(card_id: str, db: Session = Depends(get_db)):
    deleted = crud.delete_card(db, card_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Card not found")
    return {"detail": "Card deleted"}


# --- Старт гри ---
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
