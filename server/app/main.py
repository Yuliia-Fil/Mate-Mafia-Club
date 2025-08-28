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
from urllib.parse import urljoin
from typing import List, Optional

# --- Ініціалізація БД ---
models.Base.metadata.create_all(bind=engine)

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

cards_data = [
    {"id": "don", "name": "Дон мафії", "description": "Назначає відстріли мафії кожної фази ночі. Може контролювати хід гри для чорної команди.", "quantity": 1, "team": "чорна", "imgUrl": "/uploads/don.png"},
    {"id": "mafia", "name": "Мафія", "description": "Домовляється з Доном мафії про відстріли кожної фази ночі. Ключовий гравець чорної команди.", "quantity": 2, "team": "чорна", "imgUrl": "/uploads/mafia.png"},
    {"id": "courtesan", "name": "Повія", "description": "Прокидається разом з усією мафією лише в першу фазу ночі. Може впливати на нічні дії.", "quantity": 1, "team": "чорна", "imgUrl": "/uploads/prostitute.png"},
    {"id": "citizen", "name": "Мешканець", "description": "Прокидається лише у фазу дня, не має нічних дій. Сприяє розвитку комунікації та голосування.", "quantity": 5, "team": "червона", "imgUrl": "/uploads/inhabitant.png"},
    {"id": "sherif", "name": "Шериф", "description": "Прокидається вночі у свою чергу. Запитує у ведучого колір команди кожного гравця.", "quantity": 1, "team": "червона", "imgUrl": "/uploads/sheriff.png"},
    {"id": "doctor", "name": "Лікар", "description": "Прокидається вночі у свою чергу. Може відмінити постріл Мафії, рятуючи гравців.", "quantity": 1, "team": "червона", "imgUrl": "/uploads/doctor.png"},
    {"id": "maniac", "name": "Маніяк", "description": "Прокидається вночі у свою чергу. Може відстрелити будь-якого гравця і впливати на хід гри.", "quantity": 1, "team": "червона", "imgUrl": "/uploads/maniac.png"},
]

# --- Схеми Pydantic ---

class EventBase(BaseModel):
    title: str
    description: str | None = None
    date: datetime
    type: str | None = None
    imgUrl: str | None = None

class Event(EventBase):
    id: int
    class Config:
        from_attributes = True

class PlayerBase(BaseModel):
    username: str
    email: str
    password: str

class Player(PlayerBase):
    id: int
    class Config:
        from_attributes = True

class CardBase(BaseModel):
    id: str
    name: str
    description: str
    quantity: int
    team: str
    imgUrl: Optional[str] = None

class Card(CardBase):
    class Config:
        from_attributes = True

class Media(BaseModel):
    id: int
    filename: str
    file_type: str
    url: str
    description: str | None = None
    class Config:
        from_attributes = True

class Rule(BaseModel):
    id: int
    title: str
    description: str | None
    pdf_filename: str | None
    image_filename: str | None
    class Config:
        from_attributes = True


# --- Ініціалізація FastAPI ---
app = FastAPI()

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Статичні файли ---
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


# --- Переконатись, що колонка imgUrl існує ---
with engine.connect() as conn:
    conn.execute(text('ALTER TABLE events ADD COLUMN IF NOT EXISTS "imgUrl" VARCHAR(255);'))
    conn.commit()
    print("Колонка imgUrl додана або вже існує")

def seed_all():
    db: Session = database.SessionLocal()

    # ---------- EVENTS ----------
    db.query(models.Event).delete()
    db.commit()

    events = [
        {
            "title": "Ніч великих інтриг",
            "description": "Спеціальна тематична гра з посиленими ролями та новими сценаріями. Підходить для гравців рівня вище середнього. Призи для найкращого гравця за чорну та червону команди.",
            "date": datetime(2025, 9, 5),
            "type": "experimental",
            "imgUrl": "/uploads/event1.png"
        },
        {
            "title": "Турнір новачків",
            "description": "Ідеальна можливість для нових гравців спробувати свої сили у турнірному форматі! Буде один стіл, де кожен учасник зіграє 7 ігор. Навчання та дружня атмосфера гарантовані.",
            "date": datetime(2025, 9, 12),
            "type": "tournament",
            "imgUrl": "/uploads/event2.png"
        },
        {
            "title": "Сліпа мафія",
            "description": "Гра в атмосфері таємничості — під час фази дня гравці не знімають маски. Чудово розвиває навички позиційної гри та побудови промов. Підходить для гравців будь-якого рівня.",
            "date": datetime(2025, 9, 19),
            "type": "experimental",
            "imgUrl": "/uploads/event3.png"
        },
        {
            "title": "Ніч без правил",
            "description": "Експериментальна гра з нестандартними ролями та несподіваними поворотами сюжету. Грати будуть аж 3 команди: червона, чорна та сіра. Ідеально для досвідчених гравців.",
            "date": datetime(2025, 9, 26),
            "type": "experimental",
            "imgUrl": "/uploads/event4.png"
        },
        {
            "title": "Мафіозний марафон",
            "description": "Цілих 10 ігор поспіль, щоб перевірити свою витривалість та тактичне мислення. Підійде лише найвитривалішим гравцям :) Переможці отримують клубні бонуси та класні фото від професійного фотографа.",
            "date": datetime(2025, 10, 3),
            "type": "tournament",
            "imgUrl": "/uploads/event5.png"
        },
        {
            "title": "День Народження Mate Mafia Club",
            "description": "Найочікуваніша святкова вечірка на честь першого Дня Народження нашого клубу! Ми приготували для Вас багато сюрпризів, тож мерщій реєструйтеся! Точно будуть призи за найкращий дресс-код, тож приходьте у своєму найкращому вбранні.",
            "date": datetime(2025, 10, 10),
            "type": "party",
            "imgUrl": "/uploads/event6.png"
        },
        {
            "title": "Фінал сезону",
            "description": "Велика фінальна гра сезону з визначенням найкращого гравця літнього сезону. Після гри пригощаємо всіх тортиком та робимо тематичну фотосесію.",
            "date": datetime(2025, 10, 17),
            "type": "tournament",
            "imgUrl": "/uploads/event7.png"
        }
    ]
    for e in events:
        crud.create_event(db, e["title"], e["description"], e["date"], e["type"], e["imgUrl"])

    print("✅ Events reseeded:")
    for ev in crud.get_events(db):
        print(f" - {ev.title} ({ev.imgUrl})")

    # ---------- CARDS ----------
    db.query(models.Card).delete()
    db.commit()


    cards = [
        {
            "id": "don",
            "name": "Дон мафії",
            "description": "Назначає відстріли мафії кожної фази ночі. Може контролювати хід гри для чорної команди.",
            "quantity": 1,
            "team": "чорна",
            "imgUrl": "/uploads/don1.png"
        },
        {
            "id": "mafia",
            "name": "Мафія",
            "description": "Домовляється з Доном мафії про відстріли кожної фази ночі. Ключовий гравець чорної команди.",
            "quantity": 2,
            "team": "чорна",
            "imgUrl": "/uploads/mafia1.png"
        },
        {
            "id": "courtesan",
            "name": "Повія",
            "description": "Прокидається разом з усією мафією лише в першу фазу ночі. Може впливати на нічні дії.",
            "quantity": 1,
            "team": "чорна",
            "imgUrl": "/uploads/prostitute1.png"
        },
        {
            "id": "citizen",
            "name": "Мешканець",
            "description": "Прокидається лише у фазу дня, не має нічних дій. Сприяє розвитку комунікації та голосування.",
            "quantity": 5,
            "team": "червона",
            "imgUrl": "/uploads/inhabitant1.png"
        },
        {
            "id": "sherif",
            "name": "Шериф",
            "description": "Прокидається вночі у свою чергу. Запитує у ведучого колір команди кожного гравця.",
            "quantity": 1,
            "team": "червона",
            "imgUrl": "/uploads/sheriff1.png"
        },
        {
            "id": "doctor",
            "name": "Лікар",
            "description": "Прокидається вночі у свою чергу. Може відмінити постріл Мафії, рятуючи гравців.",
            "quantity": 1,
            "team": "червона",
            "imgUrl": "/uploads/doctor1.png"
        },
        {
            "id": "maniac",
            "name": "Маніяк",
            "description": "Прокидається вночі у свою чергу. Може відстрелити будь-якого гравця і впливати на хід гри.",
            "quantity": 1,
            "team": "червона",
            "imgUrl": "/uploads/maniac1.png"
           }
    ]

    for c in cards:
        crud.create_card(db, **c)

    print("✅ Cards reseeded:")
    for card in crud.get_cards(db):
        print(f" - {card.id}: {card.name} ({card.imgUrl})")

    db.close()


# Виклик
seed_all()


# --- Події ---
@app.get("/events/", response_model=List[Event])
def get_events(request: Request, db: Session = Depends(get_db)):
    events = crud.get_events(db)
    # Додаємо повний URL для зображень
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
@app.get("/players/", response_model=List[Player])
def get_players(db: Session = Depends(get_db)):
    return crud.get_players(db)

@app.get("/players/{player_id}", response_model=Player)
def get_player(player_id: int, db: Session = Depends(get_db)):
    player = crud.get_player(db, player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    return player

@app.post("/players/", response_model=Player)
def create_player(player: PlayerBase, db: Session = Depends(get_db)):
    return crud.create_player(db, player.username, player.email, player.password)

@app.put("/players/{player_id}", response_model=Player)

def update_player(player_id: int, player: PlayerBase, db: Session = Depends(get_db)):
    updated = crud.update_player(db, player_id, player.username, player.email, player.password)
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
        if card.imgUrl:  # перевірка, що imgUrl існує
            # Правильний повний URL
            card.imgUrl = str(request.base_url) + card.imgUrl.lstrip("/")
    return cards

@app.get("/cards/random/", response_model=List[Card])
def get_random_cards():
    expanded = []
    for c in cards_data:
        expanded.extend([{
            "id": c["id"],
            "name": c["name"],
            "description": c["description"],
            "quantity": c["quantity"],
            "team": c["team"],
            "imgUrl": c["imgUrl"]
        }] * c["quantity"])
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
