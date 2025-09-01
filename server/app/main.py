from fastapi import FastAPI, Depends, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from sqlalchemy import text
from . import models, crud, database
from .database import engine
from pydantic import BaseModel
from datetime import datetime
import os
import shutil
import random
import uuid
from urllib.parse import urljoin
from typing import List, Optional
from passlib.context import CryptContext

с

    # ---------- PLAYERS ----------
    db.query(models.Player).delete()
    db.commit()

    players = [

        {
            "username": "anna_k",
            "email": "anna.k@example.com",
            "password": "pass1",
            "avatarUrl": "/uploads/player1.png",
            "role": "мешканець"
        },

        {
            "username": "maria_p",
            "email": "maria.p@example.com",
            "password": "pass2",
            "avatarUrl": "/uploads/player2.png",
            "role": "мафія"
        },

        {
            "username": "sofia_d",
            "email": "sofia.d@example.com",
            "password": "pass3",
            "avatarUrl": "/uploads/player3.png",
            "role": "повія"
        },

        {
            "username": "olena_m",
            "email": "olena.m@example.com",
            "password": "pass4",
            "avatarUrl": "/uploads/player4.png",
            "role": "мешканець"
        },

        {
            "username": "iryna_s",
            "email": "iryna.s@example.com",
            "password": "pass5",
            "avatarUrl": "/uploads/player5.png",
            "role": "лікар"
        },

        {
            "username": "kateryna_b",
            "email": "kateryna.b@example.com",
            "password": "pass6",
            "avatarUrl": "/uploads/player6.png",
            "role": "мешканець"
        },

        {
            "username": "oksana_v",
            "email": "oksana.v@example.com",
            "password": "pass7",
            "avatarUrl": "/uploads/player7.png",
            "role": "шериф"
        },

        {
            "username": "nastya_l",
            "email": "nastya.l@example.com",
            "password": "pass8",
            "avatarUrl": "/uploads/player8.png",
            "role": "мешканець"
        },

        {
            "username": "victoria_r",
            "email": "victoria.r@example.com",
            "password": "pass9",
            "avatarUrl": "/uploads/player9.png",
            "role": "мешканець"
        },

        {
            "username": "daria_h",
            "email": "daria.h@example.com",
            "password": "pass10",
            "avatarUrl": "/uploads/player10.png",
            "role": "мафія"
        },

        {
            "username": "yulia_t",
            "email": "yulia.t@example.com",
            "password": "pass11",
            "avatarUrl": "/uploads/player11.png", 
            "role": "мешканець"
        },

        {
            "username": "oleh_k",
            "email": "oleh.k@example.com",
            "password": "pass12",
            "avatarUrl": "/uploads/player12.png",
            "role": "дон"
        },

        {
            "username": "andriy_f",
            "email": "andriy.f@example.com",
            "password": "pass13",
            "avatarUrl": "/uploads/player13.png",
            "role": "маніяк"
        },

        {
            "username": "taras_y",
            "email": "taras.y@example.com",
            "password": "pass14",
            "avatarUrl": "/uploads/player14.png", 
            "role": "мешканець"
        },

        {
            "username": "serhiy_n",
            "email": "serhiy.n@example.com",
            "password": "pass15",
            "avatarUrl": "/uploads/player15.png", 
            "role": "мешканець"
        },
    ]

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    for p in players:
        hashed_password = pwd_context.hash(p["password"])
        db_player = models.Player(
            username=p["username"],
            email=p["email"],
            password_hash=hashed_password,
            avatarUrl=p["avatarUrl"],
            role=p["role"]
        )
        db.add(db_player)
        db.commit()
        db.refresh(db_player)
        print(f" - Player {db_player.username} ({db_player.role})")

    print("✅ Players reseeded")

# Виклик
seed_all()


# --- Події ---
@app.get("/events/", response_model=List[Event])
def get_events(request: Request, db: Session = Depends(get_db)):
    events = crud.get_events(db)
    for e in events:
        if e.imgUrl and e.imgUrl.startswith("/uploads/"):
            e.imgUrl = f"{request.url.scheme}://{request.client.host}:8000{e.imgUrl}"

    return events

def get_rule(db: Session, rule_id: int):
    return db.query(models.Rule).filter(models.Rule.id == rule_id).first()

@app.get("/events/{event_id}", response_model=Event)
def get_event(event_id: int, request: Request, db: Session = Depends(get_db)):
    event = crud.get_event(db, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    if event.imgUrl:
        event.imgUrl = f"{request.url.scheme}://{request.client.host}:8000{event.imgUrl}"
    return event

@app.post("/events/", response_model=Event)
def create_event_endpoint(event: EventBase, db: Session = Depends(get_db)):
    db_event = crud.create_event(
        db,
        title=event.title,
        description=event.description,
        date=event.date,
        type=event.type,
        imgUrl=event.imgUrl
    )
    if not db_event:
        raise HTTPException(status_code=400, detail="Event could not be created")
    return db_event

@app.put("/events/{event_id}", response_model=Event)

def update_event_endpoint(request: Request, event_id: int, event: EventBase, db: Session = Depends(get_db)):
    updated = crud.update_event(db, event_id, event.title, event.description, event.date, event.type, event.imgUrl)
    if not updated:
        raise HTTPException(status_code=404, detail="Event not found")
    if updated.imgUrl:
        updated.imgUrl = f"{request.url.scheme}://{request.client.host}:8000{updated.imgUrl}"
    return updated

@app.delete("/events/{event_id}")

def delete_event(event_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_event(db, event_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"detail": "Event deleted"}

# --- Гравці ---
@app.get("/players/", response_model=List[PlayerOut])
def get_players(db: Session = Depends(get_db)):
    return crud.get_players(db)

@app.get("/players/{player_id}", response_model=Player)
def get_player(player_id: int, db: Session = Depends(get_db)):
    player = crud.get_player(db, player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    return player

@app.post("/players/{player_id}/avatar")
async def upload_avatar(player_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):

    file_path = os.path.join(UPLOAD_DIR, f"player_{player_id}_{file.filename}")

    
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    
    player = crud.update_player(db, player_id, username=None, email=None, password=None)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    
    player.avatarUrl = file_path
    db.commit()
    db.refresh(player)

    return {"avatarUrl": file_path}


@app.put("/players/{player_id}", response_model=Player)
def update_player(player_id: int, player: PlayerBase, db: Session = Depends(get_db)):
    updated = crud.update_player(
        db, player_id,
        username=player.username,
        email=player.email,
        password=player.password,
        avatarUrl=player.avatarUrl,
        role=player.role
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Player not found")
    return updated


@app.put("/players/{player_id}", response_model=Player)
def update_player(player_id: int, player: PlayerBase, db: Session = Depends(get_db)):
    updated = crud.update_player(
        db, player_id,
        username=player.username,
        email=player.email,
        password=player.password,
        avatarUrl=player.avatarUrl,
        role=player.role
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Player not found")
    return updated

@app.delete("/players/{player_id}")

def delete_player(player_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_player(db, player_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Player not found")
    return {"detail": "Player deleted"}

# --- Медіа ---
@app.get("/media/", response_model=List[Media])
def get_media(request: Request, db: Session = Depends(get_db)):
    media_list = crud.get_media(db)
    for m in media_list:
        if m.url:
            m.url = f"{request.url.scheme}://{request.client.host}:8000/uploads/{os.path.basename(m.url)}"
    return media_list

@app.get("/media/{media_id}", response_model=Media)
def get_media_item(media_id: int, request: Request, db: Session = Depends(get_db)):
    media = crud.get_media_item(db, media_id)
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    if media.url:
        media.url = f"{request.url.scheme}://{request.client.host}:8000/uploads/{os.path.basename(media.url)}"
    return media

@app.post("/media/", response_model=Media)

def upload_media(request: Request, description: str = None, file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_type = "photo" if file.content_type.startswith("image/") else "pdf"
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)
    
    media = crud.create_media(db, filename=file.filename, file_type=file_type, url=file_location, description=description)
    media.url = f"{request.url.scheme}://{request.client.host}:8000/uploads/{file.filename}"
    return media

@app.put("/media/{media_id}", response_model=Media)

def update_media(media_id: int, description: str | None = None, db: Session = Depends(get_db)):
    updated = crud.update_media(db, media_id, description)
    if not updated:
        raise HTTPException(status_code=404, detail="Media not found")
    return updated

@app.delete("/media/{media_id}")

def delete_media(media_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_media(db, media_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Media not found")
    return {"detail": "Media deleted"}

# --- Правила ---
@app.get("/rules/", response_model=List[Rule])
def get_rules(db: Session = Depends(get_db)):
    return crud.get_rules(db)

@app.get("/rules/{rule_id}", response_model=Rule)
def get_rule(rule_id: int, db: Session = Depends(get_db)):
    rule = crud.get_rule(db, rule_id)
    if not rule:
        raise HTTPException(status_code=404, detail="Rule not found")
    return rule

@app.post("/rules/", response_model=Rule)

def upload_rule(request: Request, title: str, description: str = None,
                pdf: UploadFile = File(None), image: UploadFile = File(None), db: Session = Depends(get_db)):

    pdf_filename = None
    image_filename = None

    if pdf:
        pdf_filename = os.path.join(UPLOAD_DIR, pdf.filename)
        with open(pdf_filename, "wb") as f:
            shutil.copyfileobj(pdf.file, f)
        pdf_filename = f"{request.url.scheme}://{request.client.host}:8000/uploads/{pdf.filename}"

    if image:
        image_filename = os.path.join(UPLOAD_DIR, image.filename)
        with open(image_filename, "wb") as f:
            shutil.copyfileobj(image.file, f)
        image_filename = f"{request.url.scheme}://{request.client.host}:8000/uploads/{image.filename}"

    return crud.create_rule(db, title=title, description=description, pdf_filename=pdf_filename, image_filename=image_filename)

@app.put("/rules/{rule_id}", response_model=Rule)

def update_rule(rule_id: int, title: str | None = None, description: str | None = None, db: Session = Depends(get_db)):
    updated = crud.update_rule(db, rule_id, title, description)
    if not updated:
        raise HTTPException(status_code=404, detail="Rule not found")
    return updated

@app.delete("/rules/{rule_id}")

def delete_rule(rule_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_rule(db, rule_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Rule not found")
    return {"detail": "Rule deleted"}

# --- Картки ---
@app.get("/cards/", response_model=List[Card])
def get_cards(request: Request, db: Session = Depends(get_db)):
    cards = crud.get_cards(db)
    for card in cards:
        if card.imgUrl:
            card.imgUrl = str(request.base_url) + card.imgUrl.lstrip("/")
    return cards

# GET випадкові картки з урахуванням кількості
@app.get("/cards/random/", response_model=List[Card])
def get_random_cards(request: Request):
    expanded = []
    for c in cards_data:
        for _ in range(c["quantity"]):
            expanded.append({
                "id": str(uuid.uuid4()),
                "name": c["name"],
                "description": c["description"],
                "quantity": 1,
                "team": c["team"],
                "imgUrl": str(request.base_url) + c["imgUrl"].lstrip("/")
            })
    random.shuffle(expanded)
    return expanded


# GET конкретна картка
@app.get("/cards/{card_id}", response_model=Card)
def get_card(card_id: str, request: Request, db: Session = Depends(get_db)):
    card = crud.get_card(db, card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    if card.imgUrl:
        card.imgUrl = str(request.base_url) + card.imgUrl.lstrip("/")
    return card


# POST картка 
@app.post("/cards/", response_model=Card)
def create_card_endpoint(card: CardBase, db: Session = Depends(get_db)):
    return crud.create_card(
        db,
        id=card.id,
        name=card.name,
        description=card.description,
        quantity=card.quantity,
        team=card.team,
        imgUrl=card.imgUrl
    )

# PUT картка
@app.put("/cards/{card_id}", response_model=Card)
def update_card_endpoint(card_id: str, card: CardBase, db: Session = Depends(get_db)):
    updated = crud.update_card(
        db,
        card_id,
        name=card.name,
        description=card.description,
        quantity=card.quantity,
        team=card.team,
        imgUrl=card.imgUrl
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Card not found")
    return updated

# DELETE картка
@app.delete("/cards/{card_id}")
def delete_card(card_id: str, db: Session = Depends(get_db)):
    deleted = crud.delete_card(db, card_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Card not found")
    return {"detail": "Card deleted"}
