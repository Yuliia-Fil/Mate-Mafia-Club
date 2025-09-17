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
    {"id": "don", "name": "Дон мафії", "description": "Назначає відстріли мафії кожної фази ночі. Може контролювати хід гри для чорної команди.", "quantity": 1, "team": "чорна", "imgUrl": "don1.png"},
    {"id": "mafia", "name": "Мафія", "description": "Домовляється з Доном мафії про відстріли кожної фази ночі. Ключовий гравець чорної команди.", "quantity": 2, "team": "чорна", "imgUrl": "mafia1.png"},
    {"id": "courtesan", "name": "Повія", "description": "Прокидається разом з усією мафією лише в першу фазу ночі. Може впливати на нічні дії.", "quantity": 1, "team": "чорна", "imgUrl": "prostitute1.png"},
    {"id": "citizen", "name": "Мешканець", "description": "Прокидається лише у фазу дня, не має нічних дій. Сприяє розвитку комунікації та голосування.", "quantity": 5, "team": "червона", "imgUrl": "inhabitant1.png"},
    {"id": "sherif", "name": "Шериф", "description": "Прокидається вночі у свою чергу. Запитує у ведучого колір команди кожного гравця.", "quantity": 1, "team": "червона", "imgUrl": "sheriff1.png"},
    {"id": "doctor", "name": "Лікар", "description": "Прокидається вночі у свою чергу. Може відмінити постріл Мафії, рятуючи гравців.", "quantity": 1, "team": "червона", "imgUrl": "doctor1.png"},
    {"id": "maniac", "name": "Маніяк", "description": "Прокидається вночі у свою чергу. Може відстрелити будь-якого гравця і впливати на хід гри.", "quantity": 1, "team": "червона", "imgUrl": "maniac1.png"},
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
    name: str
    username: str
    email: str
    avatarUrl: str | None = None

class PlayerCreate(PlayerBase):
    pass

class PlayerOut(PlayerBase):
    id: int

    class Config:
        orm_mode = True

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
app = FastAPI(
    openapi_url="/api/openapi.json",
    docs_url="/api/docs",
    openapi_version="3.0.3"
)

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Статичні файли ---
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

with engine.connect() as conn:
    conn.execute(text('ALTER TABLE events ADD COLUMN IF NOT EXISTS "imgUrl" VARCHAR(255);'))
    conn.commit()
    print("Колонка imgUrl додана або вже існує")

# --- Функція seed_all ---
def seed_all():
    db: Session = database.SessionLocal()
    try:
        # ---------- EVENTS ----------
        db.query(models.Event).delete()
        db.commit()

        events = [
            {
                "title": "Ніч великих інтриг",
                "description": "Спеціальна тематична гра з посиленими ролями та новими сценаріями. Підходить для гравців рівня вище середнього. Призи для найкращого гравця за чорну та червону команди.",
                "date": datetime(2025, 9, 5),
                "type": "experimental",
                "imgUrl": "event1.png"
            },
            
            {
                "title": "Турнір новачків",
                "description": "Ідеальна можливість для нових гравців спробувати свої сили у турнірному форматі! Буде один стіл, де кожен учасник зіграє 7 ігор. Навчання та дружня атмосфера гарантовані.",
                "date": datetime(2025, 9, 12),
                "type": "tournament",
                "imgUrl": "event2.png"
            },

            {
                "title": "Сліпа мафія",
                "description": "Гра в атмосфері таємничості — під час фази дня гравці не знімають маски. Чудово розвиває навички позиційної гри та побудови промов. Підходить для гравців будь-якого рівня.",
                "date": datetime(2025, 9, 19),
                "type": "experimental",
                "imgUrl": "event3.png"
            },

            {
                "title": "Ніч без правил",
                "description": "Експериментальна гра з нестандартними ролями та несподіваними поворотами сюжету. Грати будуть аж 3 команди: червона, чорна та сіра. Ідеально для досвідчених гравців.",
                "date": datetime(2025, 9, 26),
                "type": "experimental",
                "imgUrl": "event4.png"
            },

            {
                "title": "Мафіозний марафон",
                "description": "Цілих 10 ігор поспіль, щоб перевірити свою витривалість та тактичне мислення. Підійде лише найвитривалішим гравцям :) Переможці отримують клубні бонуси та класні фото від професійного фотографа.",
                "date": datetime(2025, 10, 3),
                "type": "tournament",
                "imgUrl": "event5.png"
            },

            {
                "title": "День Народження Mate Mafia Club",
                "description": "Найочікуваніша святкова вечірка на честь першого Дня Народження нашого клубу! Ми приготували для Вас багато сюрпризів, тож мерщій реєструйтеся! Точно будуть призи за найкращий дресс-код, тож приходьте у своєму найкращому вбранні.",
                "date": datetime(2025, 10, 10),
                "type": "party",
                "imgUrl": "event6.png"
            },

            {
                "title": "Фінал сезону",
                "description": "Велика фінальна гра сезону з визначенням найкращого гравця літнього сезону. Після гри пригощаємо всіх тортиком та робимо тематичну фотосесію.",
                "date": datetime(2025, 10, 17),
                "type": "tournament",
                "imgUrl": "event7.png"
            }
        ]

        db.bulk_save_objects([models.Event(**e) for e in events])
        db.commit()
        print("✅ Events reseeded")


    # ---------- CARDS ----------
        db.query(models.Card).delete()
        db.commit()

        cards = cards_data  # використовуємо cards_data з початку
        for c in cards:
            crud.create_card(db, **c)

        print("✅ Cards reseeded:")
        for card in crud.get_cards(db):
            print(f" - {card.id}: {card.name} ({card.imgUrl})")


    # ---------- PLAYERS ----------
        db.query(models.Player).delete()
        db.commit()

        players = [

            {
                "name": "Анна Клин",
                "username": "anna_k",
                "email": "anna.k@example.com",
                "avatarUrl": "player1.png",
            },

            {
                "name": "Марія Петровська",
                "username": "maria_p",
                "email": "maria.p@example.com",
                "avatarUrl": "player2.png",
            },

            {
                "name": "Софія Дмитренко",
                "username": "sofia_d",
                "email": "sofia.d@example.com",
                "avatarUrl": "player3.png",
            },

            {
                "name": "Олена Мельник",
                "username": "olena_m",
                "email": "olena.m@example.com",
                "avatarUrl": "player4.png",
            },

            {
                "name": "Ірина Сидоренко",
                "username": "iryna_s",
                "email": "iryna.s@example.com",
                "avatarUrl": "player5.png",
            },

            {
                "name": "Катерина Бондаренко",
                "username": "kateryna_b",
                "email": "kateryna.b@example.com",
                "avatarUrl": "player6.png",
            },

            {
                "name": "Оксана Василенко",
                "username": "oksana_v",
                "email": "oksana.v@example.com",
                "avatarUrl": "player7.png",
            },

            {
                "name": "Настя Левченко",
                "username": "nastya_l",
                "email": "nastya.l@example.com",
                "avatarUrl": "player8.png",
            },

            {
                "name": "Вікторія Романенко",
                "username": "victoria_r",
                "email": "victoria.r@example.com",
                "avatarUrl": "player9.png",
            },

            {
                "name": "Дарія Харченко",
                "username": "daria_h",
                "email": "daria.h@example.com",
                "avatarUrl": "player10.png",
            },

            {
                "name": "Юлія Філь",
                "username": "yulia_t",
                "email": "yulia.t@example.com",
                "avatarUrl": "player11.png", 
            },

            {
                "name": "Олег Кравченко",
                "username": "oleh_k",
                "email": "oleh.k@example.com",
                "avatarUrl": "player12.png",
            },

            {
                "name": "Андрій Федоренко",
                "username": "andriy_f",
                "email": "andriy.f@example.com",
                "avatarUrl": "player13.png",
            },

            {
                "name": "Тарас Яценко",
                "username": "taras_y",
                "email": "taras.y@example.com",
                "avatarUrl": "player14.png", 
            },

            {
                "name": "Сергій Новак",
                "username": "serhiy_n",
                "email": "serhiy.n@example.com",
                "avatarUrl": "player15.png",
            },
        ]

        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

        for p in players:
            avatar_path = os.path.join(UPLOAD_DIR, os.path.basename(p["avatarUrl"]))
            if not os.path.isfile(avatar_path):
                print(f"⚠️ Аватар не знайдено: {avatar_path}")

            db_player = models.Player(
                username=p["username"],
                email=p["email"],
                name=p["name"],
                avatarUrl=p["avatarUrl"],
            )
            db.add(db_player)

        db.commit()

        print("✅ Players reseeded:")
        for player in crud.get_players(db):
            print(f" - {player.username}")

    except Exception as e:
        db.rollback()
        print(f"❌ Seed failed: {e}")
    finally:
        db.close()

# Виклик
seed_all()

BASE_URL = "http://3.120.199.183"

# --- Події ---
@app.get("/events/", response_model=List[Event])
def get_events(db: Session = Depends(get_db)):
    events = crud.get_events(db)
    for e in events:
        if e.imgUrl:
            e.imgUrl = f"{BASE_URL}/uploads/{e.imgUrl.lstrip('/')}"
    return events

@app.get("/events/{event_id}", response_model=Event)
def get_event(event_id: int, db: Session = Depends(get_db)):
    event = crud.get_event(db, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    if event.imgUrl:
        event.imgUrl = f"{BASE_URL}/uploads/{event.imgUrl.lstrip('/')}"
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
def update_event_endpoint(event_id: int, event: EventBase, db: Session = Depends(get_db)):
    updated = crud.update_event(db, event_id, event.title, event.description, event.date, event.type, event.imgUrl)
    if not updated:
        raise HTTPException(status_code=404, detail="Event not found")
    if updated.imgUrl:
        updated.imgUrl = f"{BASE_URL}/uploads/{updated.imgUrl.lstrip('/')}"
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
    players = crud.get_players(db)
    for p in players:
        if p.avatarUrl:
            p.avatarUrl = f"{BASE_URL}/uploads/{p.avatarUrl.lstrip('/')}"
    return players

@app.get("/players/{player_id}", response_model=PlayerOut)
def get_player(player_id: int, db: Session = Depends(get_db)):
    player = crud.get_player(db, player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    if player.avatarUrl:
        player.avatarUrl = f"{BASE_URL}/uploads/{player.avatarUrl.lstrip('/')}"
    return player

@app.post("/players/{player_id}/avatar")
async def upload_avatar(player_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    filename = f"player_{player_id}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    avatar_url = f"{BASE_URL}/uploads/{filename}"
    player = crud.update_player(db, player_id, avatarUrl=avatar_url)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    return {"avatarUrl": avatar_url}

@app.put("/players/{player_id}", response_model=PlayerOut)
def update_player_endpoint(player_id: int, player: PlayerBase, db: Session = Depends(get_db)):
    updated = crud.update_player(
        db,
        player_id,
        name=player.name,
        username=player.username,
        email=player.email,
        avatarUrl=player.avatarUrl,
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
def get_media(db: Session = Depends(get_db)):
    media_list = crud.get_media(db)
    for m in media_list:
        if m.url:
            m.url = f"{BASE_URL}/uploads/{os.path.basename(m.url)}"
    return media_list

@app.get("/media/{media_id}", response_model=Media)
def get_media_item(media_id: int, db: Session = Depends(get_db)):
    media = crud.get_media_item(db, media_id)
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    if media.url:
        media.url = f"{BASE_URL}/uploads/{os.path.basename(media.url)}"
    return media

@app.post("/media/", response_model=Media)
async def upload_media(file: UploadFile = File(...), description: str = None, db: Session = Depends(get_db)):
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)

    media = crud.create_media(
        db,
        filename=file.filename,
        file_type="photo" if file.content_type.startswith("image/") else "pdf",
        url=f"{BASE_URL}/uploads/{file.filename}",
        description=description
    )
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
    rules = crud.get_rules(db)
    # Формуємо повний URL для зображень/файлів
    for r in rules:
        if r.pdf_filename:
            r.pdf_filename = f"{BASE_URL}/uploads/{r.pdf_filename.lstrip('/')}"
        if r.image_filename:
            r.image_filename = f"{BASE_URL}/uploads/{r.image_filename.lstrip('/')}"
    return rules

@app.get("/rules/{rule_id}", response_model=Rule)
def get_rule(rule_id: int, db: Session = Depends(get_db)):
    rule = crud.get_rule(db, rule_id)
    if not rule:
        raise HTTPException(status_code=404, detail="Rule not found")
    if rule.pdf_filename:
        rule.pdf_filename = f"{BASE_URL}/uploads/{rule.pdf_filename.lstrip('/')}"
    if rule.image_filename:
        rule.image_filename = f"{BASE_URL}/uploads/{rule.image_filename.lstrip('/')}"
    return rule

@app.post("/rules/", response_model=Rule)
async def upload_rule(title: str, description: str = None,
                      pdf: UploadFile = File(None), image: UploadFile = File(None),
                      db: Session = Depends(get_db)):
    pdf_filename = None
    image_filename = None

    if pdf:
        pdf_path = os.path.join(UPLOAD_DIR, pdf.filename)
        with open(pdf_path, "wb") as f:
            shutil.copyfileobj(pdf.file, f)
        pdf_filename = f"{BASE_URL}/uploads/{pdf.filename}"

    if image:
        image_path = os.path.join(UPLOAD_DIR, image.filename)
        with open(image_path, "wb") as f:
            shutil.copyfileobj(image.file, f)
        image_filename = f"{BASE_URL}/uploads/{image.filename}"

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
def get_cards(db: Session = Depends(get_db)):
    cards = crud.get_cards(db)
    for card in cards:
        if card.imgUrl:
            card.imgUrl = f"{BASE_URL}/uploads/{card.imgUrl.lstrip('/')}"
    return cards

@app.get("/cards/random/", response_model=List[Card])
def get_random_cards():
    expanded = []
    for c in cards_data:
        for _ in range(c["quantity"]):
            expanded.append({
                "id": str(uuid.uuid4()),
                "name": c["name"],
                "description": c["description"],
                "quantity": 1,
                "team": c["team"],
                "imgUrl": f"{BASE_URL}/uploads/{c['imgUrl'].lstrip('/')}"
            })
    random.shuffle(expanded)
    return expanded

@app.get("/cards/{card_id}", response_model=Card)
def get_card(card_id: str, db: Session = Depends(get_db)):
    card = crud.get_card(db, card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    if card.imgUrl:
        card.imgUrl = f"{BASE_URL}/uploads/{card.imgUrl.lstrip('/')}"
    return card

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

@app.delete("/cards/{card_id}")
def delete_card(card_id: str, db: Session = Depends(get_db)):
    deleted = crud.delete_card(db, card_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Card not found")
    return {"detail": "Card deleted"}
